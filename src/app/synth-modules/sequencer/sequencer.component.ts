import { Component, OnInit, ViewChildren } from '@angular/core';

import { ISequencer } from '../../model/modules/sequencer/ISequencer';
import { Sequencer } from '../../model/modules/sequencer/Sequencer';
import { Measure } from '../../model/modules/sequencer/Measure';
import { Scale } from '../../model/modules/sequencer/Scale';
import { PitchClassesProvider } from '../../model/modules/sequencer/PitchClassesProvider';
import { IPitchClass } from '../../model/modules/sequencer/IPitchClass';
import { Harmonization } from '../../model/modules/sequencer/Harmonization';
import { Subdivision } from '../../model/modules/sequencer/Subdivision';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, IObserver<number> {
  private _pitchClasses: IPitchClass[];
  private _harmonizations: Harmonization[];
  private _possibleOctaves: number[];
  private _metrics: number[];
  private _duplicableOctavesInit: number[];

  private _sequencer: ISequencer;
  // private _subdivisionCounter: number; // MOVE THE COUNTER INTO THE CLOCK SERVICE?!?! HERE ONLY THE MODULE OPERATION...
  @ViewChildren('subdivisionColumns') subdivisionColumns;

  constructor(private clockManager: ClockManagerService, private midiManager: MidiContextManagerService) { }

  private startScan() {
    this.clockManager.start();
  }
  private restartScan() {
    this.clockManager.stop(); this.clockManager.start();
  }
  ngOnInit() {
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._harmonizations = [
      new Harmonization('M', [2, 2, 1, 2, 2, 2, 1]),
      new Harmonization('mN', [2, 1, 2, 2, 1, 2, 2]),
      new Harmonization('mH', [2, 1, 2, 2, 1, 3, 1]),
      new Harmonization('mM', [2, 1, 2, 2, 2, 2, 1]),
      new Harmonization('pentatonic', [3, 2, 2, 3, 2]),
      new Harmonization('esatonic', [2, 2, 2, 2, 2, 2])
    ];
    this._metrics = function(): number[] {
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
    this._duplicableOctavesInit = new Array<number>();
    for (let i = 0; i < Subdivision.NOTE_COUNT; i++) {
      this._duplicableOctavesInit.push(Subdivision.OCTAVE_DEFAULT);
    }

    const pitchClass: IPitchClass = this._pitchClasses[0];
    const scale: Scale = new Scale(pitchClass, this._harmonizations[0]);

    const subdivisions: Subdivision[] = new Array<Subdivision>();
    for (let i = 0; i < Measure.METRIC_MIN; i++) {
      subdivisions.push(new Subdivision(
        new Array<number>().concat(this._duplicableOctavesInit), Subdivision.DURATION_MIN, Subdivision.VELOCITY_MAX)
      );
    }
    this._sequencer = new Sequencer(scale, new Measure(subdivisions));

    this.clockManager.attach(this);
    this.startScan();
  }
  private highLightSubdivision(n: number) {
    // this.subdivisionColumns contains each of 8xMetric td cells
    const vectorialized = this.subdivisionColumns.toArray();
    for (let i = 0; i < vectorialized.length; i++) {
      if ((i % this._sequencer.measure.subdivisions.length) !== n) { // remove light
        vectorialized[i].nativeElement.classList.remove('greencolumn');
      } else {
        vectorialized[i].nativeElement.classList.add('greencolumn'); // add light
      }
    }
  }
  // IObserver member
  update(beatNumber: number): void {
    const _subdivisionCounter = beatNumber % this._sequencer.measure.subdivisions.length;
    this.highLightSubdivision(_subdivisionCounter);
    const currentSubdivision = this._sequencer.measure.subdivisions[_subdivisionCounter];
    if (currentSubdivision.duration !== 0 && currentSubdivision.velocity !== 0) {
      let currentReferralFreq, currentOctave, currentResultingFreq;
      // ASSUMPTION: HARMONIZATION COVERING A WHOLE OCTAVE
      const voiceRepetition = currentSubdivision.octaves[0] === currentSubdivision.octaves[Subdivision.NOTE_COUNT - 1];
      const upperBound = voiceRepetition ?
        this._sequencer.scale.diatonicNotes.length - 1 : this._sequencer.scale.diatonicNotes.length;
      // SEND AUDIO/MIDI MESSAGE
      for (let i = 0; i < upperBound; i++) {
        currentReferralFreq = this._sequencer.scale.diatonicNotes[i].referralFrequency();
        currentOctave = currentSubdivision.octaves[i];
        if (currentOctave !== 0) {
          currentResultingFreq = currentReferralFreq * (2 ** (currentOctave - 4));
          this.midiManager.sendRawNote(1, currentResultingFreq,
            60 / this.clockManager.bpm * currentSubdivision.duration * 1000,
            currentSubdivision.velocity);
        }
      }
    }
  }
  // UI configuration alteration
  keyChange(eventArg: any): void {
    this._sequencer.scale.key = PitchClassesProvider.retrieveInstance(eventArg.target.value);
  }
  harmonizationChange(eventArg: any): void {
    let selected: Harmonization;
    for (let i = 0; i < this._harmonizations.length; i++) {
      if (this._harmonizations[i].name === eventArg.target.value) {
        selected = this._harmonizations[i];
        break;
      }
    }
    this._sequencer.scale.harmonization = selected;
  }
  metricChange(eventArg: any): void {
    const m = Number(eventArg.target.value);
    while (this._sequencer.measure.subdivisions.length !== m) {
      if (this._sequencer.measure.subdivisions.length > m) {
        this._sequencer.measure.subdivisions.pop();
      } else {
        this._sequencer.measure.subdivisions.push(new Subdivision(new Array<number>().concat(this._duplicableOctavesInit), 0, 0));
      }
    }
    this.restartScan();
  }
  // UI octave alteration
  gridChange(eventArg: any) {
    const tmp = eventArg.target.id.split('_');
    const subdivisioni = Number(tmp[1]);
    const notei = Number(tmp[3]);
    this._sequencer.measure.subdivisions[subdivisioni].octaves[notei] = Number(eventArg.target.value);
  }
  // UI duration alteration
  durationChange(eventArg: any) {
    const tmp = eventArg.target.id.split('_');
    const subdivisioni = Number(tmp[1]);
    this._sequencer.measure.subdivisions[subdivisioni].duration = Number(eventArg.target.value);
  }
  // UI velocity alteration
  // velocityChange(eventArg: any) {
  //   const tmp = eventArg.target.id.split('_');
  //   const subdivisioni = Number(tmp[1]);
  //   this._sequencer.measure.subdivisions[subdivisioni].velocity = Number(eventArg.target.value);
  // }
}
