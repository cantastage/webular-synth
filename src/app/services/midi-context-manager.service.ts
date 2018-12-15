import { Injectable } from '@angular/core';

import * as NavigatorBridge from '../audio-processors/navigator-bridge.js';
import { A4, SD } from '../model/modules/sequencer/IReferralNote.js';
import { IObservable } from '../system2/patterns/observer/IObservable.js';
import { IObserver } from '../system2/patterns/observer/IObserver.js';

@Injectable({
  providedIn: 'root'
})
export class MidiContextManagerService implements IObservable {
  private static readonly MIDI_MSG_TYPE_MASK = 0xF0;
  private static readonly MIDI_MSG_TYPE_ON = 0x90;
  private static readonly MIDI_MSG_TYPE_OFF = 0x80;

  private static readonly MIDI_CH_NUMBER_MASK = 0x0F;

  private static readonly MIDI_A4 = 69;

  private _navigatorExt: any;
  private _midiAccess: any;
  private _midiInputDevices: any;
  // private _midiOutputDevices: any;
  private _observers: IObserver[];

  public get midiAccess(): any {
    return this._midiAccess;
  }

  constructor() {
    this._navigatorExt = new NavigatorBridge();
    this._observers = new Array<IObserver>();
    if (this._navigatorExt.requestMIDIAccess) {
      this._navigatorExt.requestMIDIAccess({
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

  private static convertFromMIDI(midiMessage: any): any[] {
    // tslint:disable-next-line:no-bitwise
    const ch = Number(midiMessage.data[0]) &
    // tslint:disable-next-line:no-bitwise
      Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK);
    // tslint:disable-next-line:no-bitwise
    const type = Number(midiMessage.data[0]) &
    // tslint:disable-next-line:no-bitwise
      Number(MidiContextManagerService.MIDI_MSG_TYPE_MASK);
    // tslint:disable-next-line:no-bitwise
    const isON = (type & MidiContextManagerService.MIDI_MSG_TYPE_ON) &&
    // tslint:disable-next-line:no-bitwise
      !(type & MidiContextManagerService.MIDI_MSG_TYPE_OFF);
    // tslint:disable-next-line:no-bitwise
    const f = MidiContextManagerService.frequencyToMIDINote(Number(midiMessage.data[0]) &
      Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK));
    // tslint:disable-next-line:no-bitwise
    const v = Number(midiMessage.data[0]) & Number(MidiContextManagerService.MIDI_CH_NUMBER_MASK);

    return [ch, isON, f, v];
  }
  // RX
  private onMIDIMessage(ctx: any, midiMessageEventArg: any): void {
    ctx.notify(MidiContextManagerService.convertFromMIDI(midiMessageEventArg));
  }
  // TX
  private sendRawNoteON(channel: number, frequency: number, velocity: number) {
    this.notify([channel, true, frequency, velocity]);
  }
  private sendRawNoteOFF(ctx: any, channel: number, frequency: number, velocity: number) {
    ctx.notify([channel, false, frequency, velocity]);
  }
  public sendRawNote(channel: number, frequency: number, duration: number, velocity: number) {
    // CHECK ON PARAMETERS
    this.sendRawNoteON(channel, frequency, velocity);
    setTimeout(this.sendRawNoteOFF.bind(null, this, channel, frequency, velocity), duration);
  }

  attach(observer: IObserver): void {
    if (observer == null) {
      throw new Error('the observer cannot be null');
    }
    this._observers.push(observer);
  }
  detach(observer: IObserver): void {
    let i;
    if (observer == null || (i = this._observers.indexOf(observer)) < 0) {
      throw new Error('observer null or not found');
    } else {
      this._observers.splice(i, 1);
    }
  }
  notify(arg: any): void {
    console.log(arg); // MOCK OBSERVER
    this._observers.forEach(element => {
      element.update(arg);
    });
  }
}
