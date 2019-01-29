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
  private c: AudioContext;
  private g: GainNode;  // Output gain

  private active_voices: any;
  private frequency: any;
  private waveForm: any;
  private maxVelocity: number;
  private addSemitone: number;
  private finePitch: number;
  private active: number;

  private message: any;
  private subscription: Subscription;

  // private activeIndex: number;
  // private waveforms: Array<string> = ['SIN', 'SQR', 'SAW', 'TRI'];

  constructor(
    private contextManager: AudioContextManagerService,
    private messageService: MessageService,
    private midiManager: MidiContextManagerService) {
    midiManager.attach(this);
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message; });
  }

  update(arg: [number, boolean, number, number]): void {
    // throw new Error('Method not implemented.');
    // console.log(arg);
    if (arg[1] === true) {
      this.noteOn(arg[2], arg[3]);
    } else {
      this.noteOff(arg[2]);
    }
  }

  // la onInit leggerà tutti i valori da synthModuleData.data
  ngOnInit() {
    if (this.message === undefined) {
      this.message = { message: [0.2, 0, 1, 0.2]};
    }
    this.active = 0;
    this.active_voices = [];
    this.c = this.contextManager.audioContext;
    this.g = this.c.createGain();
    this.g.gain.setValueAtTime(1, this.c.currentTime);
    // this.g.connect(this.c.destination);

    if (this.data.waveForm !== undefined) {
      this.waveForm = this.data.waveForm;
    }
    this.maxVelocity = 100;
    this.addSemitone = 0;
    this.finePitch = 0;

    // createAudioNode in audio context manager service
    this.contextManager.addSynthModule(this); // Adds the module to the audio context manager service
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.g.disconnect();
  }

  public midiFunction() {
    // prova;
  }

  public selectWaveform(data) {
    switch (data) {
      case (0): this.waveForm = 'sine'; this.active = 0; break;
      case (1): this.waveForm = 'square'; this.active = 1; break;
      case (2): this.waveForm = 'sawtooth'; this.active = 2; break;
      case (3): this.waveForm = 'triangle'; this.active = 3; break;
    }
  }



  public noteOn(midiNote, velocity) {
    this.g.gain.value = this.maxVelocity / 127;
    this.frequency = MidiContextManagerService.midiNoteToFrequency(midiNote + this.addSemitone) + this.finePitch;
    const note = new Voice(this.c, this.g, (velocity), this.waveForm, this.message.message);
    this.active_voices[midiNote] = note;
    note.playNote(this.frequency);
  }

  public noteOff(midiNote) {
    this.active_voices[midiNote].stopNote();
    delete this.active_voices[midiNote];
  }

  public onVolumeChange(value) {
    this.maxVelocity = value;
    this.g.gain.value = this.maxVelocity / 127;
  }

  public fineTuneChange(value) {
    this.finePitch = value;
  }

  public coarseTuneChange(value) {
    this.addSemitone = value;
  }


  public savePatch(): any {
    const patch = {
      name: this.data.name,
      waveForm: this.waveForm,
      maxVelocity: this.maxVelocity,
      addSemitone: this.addSemitone,
      finePitch: this.finePitch
    };
    return patch;
  }

  public getOutput(): AudioNode {
    return this.g;
  }

  // Interface methods

  public connectToSynthNode(node: AudioNode) {
    node.connect(this.g);
  }

  public disconnectSynthModule() {
    this.g.disconnect();
  }

}
