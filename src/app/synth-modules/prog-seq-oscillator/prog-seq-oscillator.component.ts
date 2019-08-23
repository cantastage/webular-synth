import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observer } from 'rxjs';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { MessageService } from 'src/app/services/message.service';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';
import { Voice } from '../oscillator/voice';
import { SynthModule } from 'src/app/interfaces/module.component';

@Component({
  selector: 'app-prog-seq-oscillator',
  templateUrl: './prog-seq-oscillator.component.html',
  styleUrls: ['./prog-seq-oscillator.component.scss']
})
export class ProgSeqOscillatorComponent implements OnInit, OnDestroy, SynthModule {

  @Input() midiChannel: number; // binds the midi channel to the prog sequencer one
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;
  // private c: AudioContext;
  private oscGain: GainNode;  // Output gain

  private active_voices: any;
  private frequency: any;
  private waveForm: any;
  private _maxVelocity: number;
  private _addSemitone: number;
  private _finePitch: number;
  private _active: number;
  private _selectedChannel: number; // selected midi channel
  private _channels: number[];

  private debugOsc: OscillatorNode;

  private message: any;
  // private subscription: Subscription;

  private _midiObserver: Observer<[number, boolean, number, number]>;

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
    this._midiObserver = {
      next: (value) => { this.onMessage(value); },
      error: (error) => { return; },
      complete: () => { return; }
    };
  }

  private onMessage(arg: [number, boolean, number, number]): void {
    if (arg[1] === true) {
      this.noteOn(arg[0], arg[2], arg[3]);
    } else {
      this.noteOff(arg[0], arg[2]);
    }
  }

  // la onInit leggerà tutti i valori da synthModuleData.data
  public ngOnInit() {
    // this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
    if (this.message === undefined) {
      this.message = { message: [0, 0, 1, 0] };
    }
    this.loadPatch();
    this._selectedChannel = 16; // NBNBNBNBNBNBNB deve essere lo stesso canale del sequencer
    this._channels = []; // TODO poco importante: reperire la lista dei canali midi
    for (let i = 1; i <= 16; i++) {
      this._channels.push(i);
    }
    this.active_voices = [];
    // Oscillatore di prova per sentire se funziona qualcosa
    this.debugOsc = this.contextManager.audioContext.createOscillator();
    this.debugOsc.type = 'sine';
    this.debugOsc.frequency.setValueAtTime(440, this.contextManager.audioContext.currentTime); // value in hertz
    this.oscGain = this.contextManager.audioContext.createGain();
    this.oscGain.gain.setValueAtTime(1, this.contextManager.audioContext.currentTime);
    this.debugOsc.connect(this.oscGain);


    // NB al momento una volta collegato al midiObserver inizia a suonare
    this.midiManager.attach(this._midiObserver);

    // createAudioNode in audio context manager service in the prog sequencer chain
    // if (this.isInSoundChain) {
    //   this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    // }

    // connect to the audio output UNCOMMENT TO HAVE SOUND OUTPUT FROM THE SPEAKERS
    // this.contextManager.connectProgSequencer(this);
  }

  public ngOnDestroy() {
    // this.subscription.unsubscribe();
    if (this.isInSoundChain) {
      this.midiManager.detach(this._midiObserver);
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
    this.oscGain.gain.value = this.maxVelocity / 127;
    this.frequency = MidiContextManagerService.midiNoteToFrequency(midiNote + this.addSemitone) + this.finePitch;
    const note = new Voice(this.contextManager.audioContext, this.oscGain, (velocity), this.waveForm, this.message.message);
    if (channel === this.midiChannel) {
      this.active_voices[midiNote] = note;
      note.playNote(this.frequency);
    }

    // if (channel === 15) {
    //   this.active_voices[100 + midiNote] = note;
    // } else {
    //   this.active_voices[midiNote] = note;
    // }
    // note.playNote(this.frequency);
  }

  public noteOff(channel, midiNote) {
    if (channel === this._selectedChannel) {
      if (this.active_voices[midiNote] !== undefined) {
        this.active_voices[midiNote].stopNote();
        delete this.active_voices[midiNote];
      }
    }


    // if (channel === 15) {
    //   if (this.active_voices[100 + midiNote]) {
    //     this.active_voices[100 + midiNote].stopNote();
    //     delete this.active_voices[100 + midiNote];
    //   }
    // } else {
    //   if (this.active_voices[midiNote]) {
    //     this.active_voices[midiNote].stopNote();
    //     delete this.active_voices[midiNote];
    //   }
    // }
  }

  // public checkActive() {
  //   this.midiManager.detach(this._midiObserver);
  //   console.log(this.active_voices);
  //   for (let i = 0; i < this.active_voices.length; i++) {
  //     if (this.active_voices[i] !== undefined) {
  //       this.active_voices[i].stopNote();
  //       delete this.active_voices[i];
  //     }
  //   }
  //   this.midiManager.attach(this._midiObserver);
  //   console.log(this.active_voices);
  // }

  public onVolumeChange(value) {
    this.oscGain.gain.value = this.maxVelocity / 127;
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
    return this.oscGain;
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

  // TODO rivedere in modo che non utilizzi state ma metta impostazioni predefinite
  public loadPatch(): void {
    this._active = this.data.state.active;
    this.waveForm = this.data.state.waveForm;
    this._maxVelocity = this.data.state.maxVelocity;
    this._addSemitone = this.data.state.addSemitone;
    this._finePitch = this.data.state.finePitch;
  }

  // NB for debug purposes only
  toggleDebugOsc(): void {
    this.debugOsc.start();
  }

}
