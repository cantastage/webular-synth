import { Component, OnInit, OnChanges } from '@angular/core';

import { ISequencer } from '../../model/modules/sequencers/ISequencer';
import { Sequencer } from '../../model/modules/sequencers/Sequencer';
import { Measure } from '../../model/modules/sequencers/Measure';
import { Scale } from '../../model/modules/sequencers/Scale';
import { ReferralNotesProvider } from '../../model/modules/sequencers/ReferralNotesProvider';
import { NoteNames, IReferralNote } from '../../model/modules/sequencers/IReferralNote';
import { Tonality } from '../../model/modules/sequencers/Tonality';
import { Subdivision } from '../../model/modules/sequencers/Subdivision';
import { OctaveNote } from '../../model/modules/sequencers/OctaveNote';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { ClockManagerService } from 'src/app/services/clock-manager.service';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, IObserver, OnChanges {
  private _sequencer: ISequencer;
  private _referralNotes: IReferralNote[];
  private _tonalities: Tonality[];
  private _metrics: number[];

  constructor(private clockManager: ClockManagerService) { }

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

    const referralNote: IReferralNote = this._referralNotes[0];
    const scale: Scale = new Scale(referralNote, this._tonalities[0]);

    const notes: OctaveNote[] = new Array<OctaveNote>();
    scale.diatonicNotes.forEach(element => {
      notes.push(new OctaveNote(element, OctaveNote.OCTAVE_DEFAULT));
    });
    const subdivisions: Subdivision[] = new Array<Subdivision>();
    for (let i = 0; i < Measure.METRIC_MIN; i++) {
      subdivisions.push(new Subdivision(notes, 0, 0));
    }
    this._sequencer = new Sequencer(scale, new Measure(subdivisions));
    // this.clockManager.attach(this);
  }

  update(): void {
    // UPDATE THE VIEW AND THE MODEL IF NECESSARY
    console.log('halo');
  }

  ngOnChanges(changes: import('../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks').SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
}
