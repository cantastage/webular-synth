import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Voice } from 'src/app/synth-modules/oscillator/voice';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { SynthModule } from 'src/app/interfaces/module.component';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { KnobComponent } from '../sub-components/knob/knob.component';

@Component({
  selector: 'app-oscillator',
  templateUrl: './oscillator.component.html',
  styleUrls: ['./oscillator.component.scss']
})

export class OscillatorComponent implements OnInit, OnDestroy, IObserver<[number, boolean, number, number]>, SynthModule {
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;
  private c: AudioContext;
  private g: GainNode;  // Output gain

  private active_voices: any;
  private frequency: any;
  private waveForm: any;
  private _maxVelocity: number;
  private _addSemitone: number;
  private _finePitch: number;
  private _active: number;

  private message: any;
  private subscription: Subscription;

  public get active(): number {
    return this._active;
  }
  public get maxVelocity(): number {
    return this._maxVelocity;
  }
  public set maxVelocity(value: number) {
    this._maxVelocity = value;
  }
  public get addSemitone(): number {
    return this._addSemitone;
  }
  public set addSemitone(value: number) {
    this._addSemitone = value;
  }
  public get finePitch(): number {
    return this._finePitch;
  }
  public set finePitch(value: number) {
    this._finePitch = value;
  }
  constructor(
    private contextManager: AudioContextManagerService,
    private messageService: MessageService,
    private midiManager: MidiContextManagerService) {
  }

  update(arg: [number, boolean, number, number]): void {
    if (arg[1] === true) {
      this.noteOn(arg[0], arg[2], arg[3]);
    } else {
      this.noteOff(arg[0], arg[2]);
    }
  }

  // la onInit leggerà tutti i valori da synthModuleData.data
  ngOnInit() {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
    if (this.message === undefined) {
      this.message = { message: [0, 0, 1, 0] };
    }
    this.loadPatch();
    this.active_voices = [];
    this.c = this.contextManager.audioContext;
    this.g = this.c.createGain();
    this.g.gain.setValueAtTime(1, this.c.currentTime);

    if (this.isInSoundChain) {
      this.midiManager.attach(this);
    }
    // createAudioNode in audio context manager service
    if (this.isInSoundChain) {
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.isInSoundChain) {
      this.midiManager.detach(this);
    }
  }

  public selectWaveform(data) {
    switch (data) {
      case (0): this.waveForm = 'sine'; this._active = 0; break;
      case (1): this.waveForm = 'square'; this._active = 1; break;
      case (2): this.waveForm = 'sawtooth'; this._active = 2; break;
      case (3): this.waveForm = 'triangle'; this._active = 3; break;
    }
  }



  public noteOn(channel, midiNote, velocity) {
    this.g.gain.value = this.maxVelocity / 127;
    this.frequency = MidiContextManagerService.midiNoteToFrequency(midiNote + this.addSemitone) + this.finePitch;
    const note = new Voice(this.c, this.g, (velocity), this.waveForm, this.message.message);
    if (channel === 15) {
      this.active_voices[100 + midiNote] = note;
    } else {
      this.active_voices[midiNote] = note;
    }
    note.playNote(this.frequency);
  }

  public noteOff(channel, midiNote) {
    if (channel === 15) {
      this.active_voices[100 + midiNote].stopNote();
      delete this.active_voices[100 + midiNote];
    } else {
      this.active_voices[midiNote].stopNote();
      delete this.active_voices[midiNote];
    }
  }

  public onVolumeChange(value) {
    this.g.gain.value = this.maxVelocity / 127;
  }

  public savePatch(): any {
    this.data.state.waveForm = this.waveForm;
    this.data.state.maxVelocity = this.maxVelocity;
    this.data.state.addSemitone = this.addSemitone;
    this.data.state.finePitch = this.finePitch;
    this.data.state.active = this.active;
    return this.data;
  }

  public getOutput(): AudioNode {
    return this.g;
  }

  // Interface methods
  public getInput(): AudioNode {
    return null;
  }

  public fineTuneChange(value) {
    this.finePitch = value;
    // console.log(this.finePitch);
  }

  public connectSynthModule(inputModule: SynthModule) {

  }

  public disconnectSynthModule() {
    this.getOutput().disconnect();
  }

  public loadPatch(): void {
    this._active = this.data.state.active;
    this.waveForm = this.data.state.waveForm;
    this._maxVelocity = this.data.state.maxVelocity;
    this._addSemitone = this.data.state.addSemitone;
    this._finePitch = this.data.state.finePitch;
  }
}
