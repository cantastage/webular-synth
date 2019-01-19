import { Injectable } from '@angular/core';

// import * as NavigatorBridge from '../audio-processors/navigator-bridge.js';
import { A4, SD } from '../model/modules/sequencer/IReferralNote.js';
import { Observable } from '../system2/patterns/observer/Observable.js';

@Injectable({
  providedIn: 'root'
})
// Observable<any>?
export class MidiContextManagerService extends Observable<[number, boolean, number, number]> {
  private static readonly MIDI_MSG_TYPE_MASK = 0xF0;
  private static readonly MIDI_MSG_TYPE_ON = 0x90;
  private static readonly MIDI_MSG_TYPE_OFF = 0x80;

  private static readonly MIDI_CH_NUMBER_MASK = 0x0F;

  private static readonly MIDI_A4 = 69;

  // private _navigatorExt: any;
  private _midiAccess: any;
  private _midiInputDevices: any;

  public get midiAccess(): any {
    return this._midiAccess;
  }

  constructor() {
    super();
    // this._navigatorExt = new NavigatorBridge();
    // if (navigator["requestMIDIAccess"]) {
    //   navigator["requestMIDIAccess"]({
    //       sysex: false
    //   }).then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    // } else {
    //   alert("No MIDI support in your browser.");
    // }
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
        throw new Error('unable to acquire MIDI resource: ' + message);
      });
    } else {
      throw new Error('MIDI is not supported');
    }
  }

  public static midiNoteToFrequency(midiNote: number): number {
    return A4 * (SD ** (midiNote - MidiContextManagerService.MIDI_A4));
  }
  public static frequencyToMIDINote(frequency: number): number {
    return Math.floor( Math.log10(frequency / A4) / Math.log10(SD) ) + MidiContextManagerService.MIDI_A4;
  }

  private static extractMIDIFields(midiMessage: any): [number, boolean, number, number] {
    // tslint:disable-next-line:no-bitwise
    const ch = Number(midiMessage.data[0]) &
    // tslint:disable-next-line:no-bitwise
      Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK);
    // tslint:disable-next-line:no-bitwise
    const type = Number(midiMessage.data[0]) &
    // tslint:disable-next-line:no-bitwise
      Number(MidiContextManagerService.MIDI_MSG_TYPE_MASK);
    // tslint:disable-next-line:no-bitwise
    const isON = ((type & MidiContextManagerService.MIDI_MSG_TYPE_ON) === MidiContextManagerService.MIDI_MSG_TYPE_ON); // &&
    // tslint:disable-next-line:no-bitwise
      // !((type & MidiContextManagerService.MIDI_MSG_TYPE_OFF) === MidiContextManagerService.MIDI_MSG_TYPE_OFF);
    // tslint:disable-next-line:no-bitwise
    const note = Number(midiMessage.data[1]); // &
      // Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK));
    // tslint:disable-next-line:no-bitwise
    const v = Number(midiMessage.data[2]); // & Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK);

    return [ch, isON, note, v];
  }
  // RX
  private onMIDIMessage(ctx: MidiContextManagerService, midiMessageEventArg: any): void {
    ctx.notify(MidiContextManagerService.extractMIDIFields(midiMessageEventArg));
  }
  // TX
  private sendRawNoteON(channel: number, frequency: number, velocity: number) {
    this.notify([channel, true, frequency, velocity]);
  }
  private sendRawNoteOFF(ctx: MidiContextManagerService, channel: number, frequency: number, velocity: number) {
    ctx.notify([channel, false, frequency, velocity]);
  }
  public sendRawNote(channel: number, frequency: number, duration: number, velocity: number) {
    // CHECK ON PARAMETERS
    this.sendRawNoteON(channel, frequency, velocity);
    setTimeout(this.sendRawNoteOFF.bind(null, this, channel, frequency, velocity), duration);
  }
}
