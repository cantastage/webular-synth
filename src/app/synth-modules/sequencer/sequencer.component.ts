import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ISequencer } from '../../model/modules/sequencer/basic/ISequencer';
import { Measure } from '../../model/modules/sequencer/basic/Measure';
import { PitchClassesProvider } from '../../model/modules/sequencer/PitchClassesProvider';
import { IPitchClass } from '../../model/modules/sequencer/IPitchClass';
import { IHarmonization } from '../../model/modules/sequencer/IHarmonization';
import { HarmonizationsProvider } from 'src/app/model/modules/sequencer/HarmonizationsProvider';
import { Subdivision } from '../../model/modules/sequencer/basic/Subdivision';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';
import { SynthModule } from 'src/app/interfaces/module.component';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, OnDestroy, SynthModule {
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;

  // UI selections
  private _pitchClasses: IPitchClass[];
  private _harmonizations: IHarmonization[];
  private _metrics: number[];
  private _channels: number[];
  private _possibleOctaves: number[];
  private _subdivisionCounter: number;
  private _clockObserver: Observer<number>;

  private _sequencer: ISequencer;
  public get pitchClasses(): IPitchClass[] {
    return this._pitchClasses;
  }
  public get harmonizations(): IHarmonization[] {
    return this._harmonizations;
  }
  public get metrics(): number[] {
    return this._metrics;
  }
  public get channels(): number[] {
    return this._channels;
  }
  public get possibleOctaves(): number[] {
    return this._possibleOctaves;
  }
  public get subdivisionCounter(): number {
    return this._subdivisionCounter;
  }
  public get sequencer(): ISequencer {
    return this._sequencer;
  }

  public constructor(private clockManager: ClockManagerService, private midiManager: MidiContextManagerService,
    private contextManager: AudioContextManagerService) {
    this._clockObserver = {
      next: (value) => { this.onTick(value); },
      error: (error) => { return; },
      complete: () => { return; }
    };
  }

  public loadPatch(): void {
    this._sequencer = this.data.state;
  }

  public ngOnInit() {
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._harmonizations = HarmonizationsProvider.retrieveInstances();
    this._metrics = function (): number[] {
      const ret: number[] = new Array<number>();
      for (let i = Measure.METRIC_MIN; i <= Measure.METRIC_MAX; i++) {
        ret.push(i);
      }
      return ret;
    }();

    this._channels = MidiContextManagerService.generateMIDIChannelVector();
    this._possibleOctaves = new Array<number>();
    this._possibleOctaves.push(Subdivision.OCTAVE_DEFAULT);
    for (let i = Subdivision.OCTAVE_MIN; i <= Subdivision.OCTAVE_MAX; i++) {
      this._possibleOctaves.push(i);
    }
    this._subdivisionCounter = 0;

    this.loadPatch();
    if (this.isInSoundChain) {
      this.clockManager.attach(this._clockObserver);
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

  public ngOnDestroy() {
    if (this.isInSoundChain) {
      this.clockManager.detach(this._clockObserver);
    }
  }

  public savePatch(): any {
    this.data.state = this._sequencer;
    return this.data;
  }

  private onTick(beatNumber: number): void {
    beatNumber--;
    this._subdivisionCounter = beatNumber % this.sequencer.measure.subdivisions.length;
    const currentSubdivision = this.sequencer.measure.subdivisions[this._subdivisionCounter];
    if (currentSubdivision.duration !== 0 && currentSubdivision.velocity !== 0) {
      let currentReferralFreq, currentOctave, currentResultingFreq;
      // ASSUMPTION: HARMONIZATION COVERING A WHOLE OCTAVE
      const voiceRepetition =
        currentSubdivision.octaves[0] === currentSubdivision.octaves[currentSubdivision.octaves.length - 1];
      const upperBound = this.sequencer.scale.diatonicNotes.length - (voiceRepetition ? 1 : 0);
      // SEND AUDIO/MIDI MESSAGE
      for (let i = 0; i < upperBound; i++) {
        currentReferralFreq = this.sequencer.scale.diatonicNotes[i].referralFrequency;
        currentOctave = currentSubdivision.octaves[i];
        if (currentOctave !== 0) {
          currentResultingFreq = currentReferralFreq * (2 ** (currentOctave - 4));
          this.midiManager.sendRawNote(this.sequencer.channel,
            currentResultingFreq,
            this.clockManager.bms * currentSubdivision.duration,
            currentSubdivision.velocity);
        }
      }
    }
  }

  morethanMetricChange(eventArg: any): void {
    this.clockManager.restart();
  }

  getInput(): AudioNode {
    return null;
  }
  getOutput(): AudioNode {
    return null;
  }

  connectSynthModule(inputModule: SynthModule): void {
    return;
  }

  disconnectSynthModule(): void {
    return;
  }
}
