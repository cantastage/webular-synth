import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ISequencer } from '../../model/modules/sequencer/ISequencer';
import { Measure } from '../../model/modules/sequencer/Measure';
import { PitchClassesProvider } from '../../model/modules/sequencer/PitchClassesProvider';
import { IPitchClass } from '../../model/modules/sequencer/IPitchClass';
import { IHarmonization } from '../../model/modules/sequencer/IHarmonization';
import { HarmonizationsProvider } from 'src/app/model/modules/sequencer/HarmonizationsProvider';
import { Subdivision } from '../../model/modules/sequencer/Subdivision';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';
import { SynthModule } from 'src/app/interfaces/module.component';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, OnDestroy, IObserver<number>, SynthModule {
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;

  // UI selections
  private _pitchClasses: IPitchClass[];
  private _harmonizations: IHarmonization[];
  private _metrics: number[];
  private _possibleOctaves: number[];
  private _subdivisionCounter: number;

  private _sequencer: ISequencer;

  constructor(private clockManager: ClockManagerService, private midiManager: MidiContextManagerService,
    private contextManager: AudioContextManagerService) { }

  public loadPatch(): void {
    this._sequencer = this.data.state;
  }

  ngOnInit() {
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._harmonizations = HarmonizationsProvider.retrieveInstances();
    this._metrics = function (): number[] {
      const ret: number[] = new Array<number>();
      for (let i = Measure.METRIC_MIN; i <= Measure.METRIC_MAX; i++) {
        ret.push(i);
      }
      return ret;
    }();

    this._possibleOctaves = new Array<number>();
    this._possibleOctaves.push(Subdivision.OCTAVE_DEFAULT);
    for (let i = Subdivision.OCTAVE_MIN; i <= Subdivision.OCTAVE_MAX; i++) {
      this._possibleOctaves.push(i);
    }
    this._subdivisionCounter = 0;

    this.loadPatch();
    if (this.isInSoundChain) {
      this.clockManager.attach(this);
    }
    if (this.isInSoundChain) {
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

  ngOnDestroy() {
    if (this.isInSoundChain) {
      this.clockManager.detach(this);
    }
  }

  public savePatch(): any {
    this.data.state = this._sequencer;
    return this.data;
  }

  // IObserver member
  update(beatNumber: number): void {
    this._subdivisionCounter = beatNumber % this._sequencer.measure.subdivisions.length;
    const currentSubdivision = this._sequencer.measure.subdivisions[this._subdivisionCounter];
    if (currentSubdivision.duration !== 0 && currentSubdivision.velocity !== 0) {
      let currentReferralFreq, currentOctave, currentResultingFreq;
      // ASSUMPTION: HARMONIZATION COVERING A WHOLE OCTAVE
      const voiceRepetition =
        currentSubdivision.octaves[0] === currentSubdivision.octaves[currentSubdivision.octaves.length - 1];
      const upperBound = this._sequencer.scale.diatonicNotes.length - (voiceRepetition ? 1 : 0);
      // SEND AUDIO/MIDI MESSAGE
      for (let i = 0; i < upperBound; i++) {
        currentReferralFreq = this._sequencer.scale.diatonicNotes[i].referralFrequency;
        currentOctave = currentSubdivision.octaves[i];
        if (currentOctave !== 0) {
          currentResultingFreq = currentReferralFreq * (2 ** (currentOctave - 4));
          this.midiManager.sendRawNote(15, currentResultingFreq,
            60 / this.clockManager.bpm * currentSubdivision.duration * 1000,
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

  connectSynthModule(inputModule: SynthModule) {

  }

  disconnectSynthModule(): void {

  }

}
