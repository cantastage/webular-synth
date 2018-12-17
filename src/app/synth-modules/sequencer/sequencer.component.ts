import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { ISequencer } from '../../model/modules/sequencer/ISequencer';
import { Sequencer } from '../../model/modules/sequencer/Sequencer';
import { Measure } from '../../model/modules/sequencer/Measure';
import { Scale } from '../../model/modules/sequencer/Scale';
import { ReferralNotesProvider } from '../../model/modules/sequencer/ReferralNotesProvider';
import { IReferralNote } from '../../model/modules/sequencer/IReferralNote';
import { Tonality } from '../../model/modules/sequencer/Tonality';
import { Subdivision } from '../../model/modules/sequencer/Subdivision';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, IObserver {
  private _referralNotes: IReferralNote[];
  private _tonalities: Tonality[];
  private _metrics: number[];
  private _duplicableOctaves: number[];

  private _sequencer: ISequencer;
  private _subdivisionCounter: number; // MOVE THE COUNTER INTO THE CLOCK SERVICE?!?!
  @ViewChildren('subdivisionColumns') subdivisionColumns;

  constructor(private clockManager: ClockManagerService, private midiManager: MidiContextManagerService) { }

  private startCount() {
    this._subdivisionCounter = 0;
    this.clockManager.attach(this);
  }
  private restartCount() {
    this.clockManager.detach(this);
    this._subdivisionCounter = 0;
    this.clockManager.attach(this);
  }
  ngOnInit() {
    this._referralNotes = ReferralNotesProvider.retrieveInstances();
    this._tonalities = [
      new Tonality('Major', [2, 2, 1, 2, 2, 2, 1]),
      new Tonality('Minor', [2, 1, 2, 2, 1, 2, 2])
    ];
    this._metrics = function(): number[] {
      const ret: number[] = new Array<number>();
      for (let i = Measure.METRIC_MIN; i <= Measure.METRIC_MAX; i++) {
        ret.push(i);
      }
      return ret;
    }();
    this._duplicableOctaves = new Array<number>();
    for (let i = 0; i < Subdivision.NOTE_COUNT; i++) {
      this._duplicableOctaves.push(Subdivision.OCTAVE_DEFAULT);
    }

    const referralNote: IReferralNote = this._referralNotes[0];
    const scale: Scale = new Scale(referralNote, this._tonalities[0]);

    const subdivisions: Subdivision[] = new Array<Subdivision>();
    for (let i = 0; i < Measure.METRIC_MIN; i++) {
      subdivisions.push(new Subdivision(new Array<number>().concat(this._duplicableOctaves), 0, 0));
    }
    this._sequencer = new Sequencer(scale, new Measure(subdivisions));

    this.startCount();
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
  update(): void {
    this.highLightSubdivision(this._subdivisionCounter);
    const currentSubdivision = this._sequencer.measure.subdivisions[this._subdivisionCounter];
    if (currentSubdivision.duration !== 0 && currentSubdivision.velocity !== 0) {
      let currentReferralFreq, currentOctave, currentResultingFreq;
      // SEND AUDIO/MIDI MESSAGE
      for (let i = 0; i < this._sequencer.scale.diatonicNotes.length; i++) {
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
    this._subdivisionCounter = (this._subdivisionCounter + 1) % this._sequencer.measure.subdivisions.length;
  }
  // UI configuration alteration
  keyChange(eventArg: any): void {
    this._sequencer.scale.key = ReferralNotesProvider.retrieveInstance(eventArg.target.value);
  }
  tonalityChange(eventArg: any): void {
    let selected: Tonality;
    for (let i = 0; i < this._tonalities.length; i++) {
      if (this._tonalities[i].name === eventArg.target.value) {
        selected = this._tonalities[i];
        break;
      }
    }
    this._sequencer.scale.tonality = selected;
  }
  metricChange(eventArg: any): void {
    const m = Number(eventArg.target.value);
    while (this._sequencer.measure.subdivisions.length !== m) {
      if (this._sequencer.measure.subdivisions.length > m) {
        this._sequencer.measure.subdivisions.pop();
      } else {
        this._sequencer.measure.subdivisions.push(new Subdivision(new Array<number>().concat(this._duplicableOctaves), 0, 0));
      }
    }
    this.restartCount();
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
  velocityChange(eventArg: any) {
    const tmp = eventArg.target.id.split('_');
    const subdivisioni = Number(tmp[1]);
    this._sequencer.measure.subdivisions[subdivisioni].velocity = Number(eventArg.target.value);
  }
}
