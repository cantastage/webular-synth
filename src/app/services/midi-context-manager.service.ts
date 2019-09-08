import { Injectable } from '@angular/core';

import { IPitch, A4, SD } from '../model/modules/sequencer/IPitch';
import { Chord } from '../model/modules/sequencer/Chord';
import { SuperObservable } from '../system2/patterns/observer/SuperObservable';

@Injectable({
  providedIn: 'root'
})
// SuperObservable<[ch, isON, midiNote, velocity]>
export class MidiContextManagerService
  extends SuperObservable<[number, boolean, number, number]> {
  private static readonly MIDI_MSG_TYPE_MASK = 0xF0;
  private static readonly MIDI_MSG_TYPE_ON = 0x90;
  private static readonly MIDI_MSG_TYPE_OFF = 0x80;

  private static readonly MIDI_CH_NUMBER_MASK = 0x0F;

  private static readonly MIDI_A4 = 69;

  public static readonly MIDI_CH_MIN = 1;
  public static readonly MIDI_CH_MAX = 16;

  private _midiAccess: any;
  private _midiInputDevices: any;

  public get midiAccess(): any {
    return this._midiAccess;
  }

  public constructor() {
    super();
    if (navigator['requestMIDIAccess']) {
      navigator['requestMIDIAccess']({
        sysex: false
      }).then((midiAccess: any): void => {
        this._midiAccess = midiAccess;
        this._midiInputDevices = this.midiAccess.inputs.values();
        for (let input = this._midiInputDevices.next();
          input && !input.done;
          input = this._midiInputDevices.next()) {
          input.value.onmidimessage = this.onMIDIMessage.bind(null, this);
        }
      }, (message: any): void => {
        // throw new Error('unable to acquire MIDI resource: ' + message);
        // we don't throw the exception because we need the service up and running
        console.log('unable to acquire MIDI resource: ' + message);
      });
    } else {
      // throw new Error('MIDI is not supported');
      console.log('MIDI is not supported');
    }
  }

  public static midiNoteToFrequency(midiNote: number): number {
    return A4 * (SD ** (midiNote - MidiContextManagerService.MIDI_A4));
  }
  public static frequencyToMIDINote(frequency: number): number {
    return Math.round(Math.log10(frequency / A4) / Math.log10(SD)) + MidiContextManagerService.MIDI_A4;
  }

  private static extractMIDIFields(midiMessage: any): [number, boolean, number, number] {
    // tslint:disable-next-line:no-bitwise
    const ch = (Number(midiMessage.data[0]) &
      Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK)) + 1;
    // tslint:disable-next-line:no-bitwise
    const type = Number(midiMessage.data[0]) &
      Number(MidiContextManagerService.MIDI_MSG_TYPE_MASK);
    // tslint:disable-next-line:no-bitwise
    const isON = ((type & MidiContextManagerService.MIDI_MSG_TYPE_ON) === MidiContextManagerService.MIDI_MSG_TYPE_ON);

    const note = Number(midiMessage.data[1]);

    const v = Number(midiMessage.data[2]);

    return [ch, isON, note, v];
  }
  public static generateMIDIChannelVector(): number[] {
    const ret = new Array<number>();
    for (let i = MidiContextManagerService.MIDI_CH_MIN;
      i <= MidiContextManagerService.MIDI_CH_MAX; i++) {
        ret.push(i);
    }
    return ret;
  }

  // RX
  private onMIDIMessage(ctx: MidiContextManagerService, midiMessageEventArg: any): void {
    const midiArgs = MidiContextManagerService.extractMIDIFields(midiMessageEventArg);
    if (!isNaN(midiArgs[2]) && !isNaN(midiArgs[3])) {
      ctx.notify(midiArgs);
    }
  }
  // TX
  private sendRawNoteON(channel: number, midiNote: number, velocity: number): void {
    this.notify([channel, true, midiNote, velocity]);
  }
  private sendRawNoteOFF(ctx: MidiContextManagerService, channel: number, midiNote: number, velocity: number): void {
    ctx.notify([channel, false, midiNote, velocity]);
  }
  // responsabilities not properly divided, nevermind...
  public sendRawNote(channel: number, frequency: number, duration: number, velocity: number): void {
    // we could check the parameters...
    const midiNote = MidiContextManagerService.frequencyToMIDINote(frequency);
    this.sendRawNoteON(channel, midiNote, velocity);
    setTimeout(this.sendRawNoteOFF, duration - 35, this, channel, midiNote, velocity);
  }

  public sendPitch(channel: number, pitch: IPitch, duration: number, velocity: number): void {
    this.sendRawNote(channel, pitch.frequency, duration, velocity);
  }
  public sendChord(channel: number, chord: Chord, duration: number, velocity: number): void {
    chord.chordNotes.forEach(element => {
      this.sendPitch(channel, element, duration, velocity);
    });
  }
}
