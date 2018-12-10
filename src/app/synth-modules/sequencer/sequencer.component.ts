import { Component, OnInit, OnChanges } from '@angular/core';
import { IClock } from '../../model/modules/clocks/IClock';
import { ClockProvider } from '../../model/modules/clocks/ClockProvider';

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

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, IObserver, OnChanges {
  // DECIDE WHETHER IS THE COMPONENT OR THE OBJECT IN THE MODEL TO BE THE OBSERVER
  // AND IF IT'S THE CASE TO ADAPT THE CLOCK COHERENTLY
  public static readonly tonalities: Tonality[] = [
    new Tonality('Major', [2, 2, 1, 2, 2, 2, 1]),
    new Tonality('Minor', [2, 1, 2, 2, 1, 2, 2])
  ];

  private _clock: IClock;
  private _sequencer: ISequencer;

  constructor() { }

  ngOnInit() {
    this._clock = ClockProvider.retrieveInstance(); // already started by the clock component
    const referralNote: IReferralNote = ReferralNotesProvider.retrieveInstance(NoteNames.C);
    const scale: Scale = new Scale(referralNote, SequencerComponent.tonalities[0]);

    const notes: OctaveNote[] = new Array<OctaveNote>();
    scale.diatonicNotes.forEach(element => {
      notes.push(new OctaveNote(element, OctaveNote.OCTAVE_DEFAULT));
    });
    const subdivisions: Subdivision[] = new Array<Subdivision>();
    for (let i = 0; i < Measure.METRIC_MIN; i++) {
      subdivisions.push(new Subdivision(notes, 0, 0));
    }
    this._sequencer = new Sequencer(scale, new Measure(subdivisions));
    // this._clock.attach(this);
  }

  update(): void {
    // UPDATE THE VIEW AND THE MODEL IF NECESSARY
    console.log('halo');
  }

  ngOnChanges(changes: import('../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks').SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
}
