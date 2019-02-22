import { Component, OnInit } from '@angular/core';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';
import { MessageService } from 'src/app/services/message.service';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { Chord } from '../../model/modules/sequencer/prog/Chord';
import {  } from 'src/app/model/modules/chord-substitution/SubstitutionRules';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';

@Component({
  selector: 'app-chord-substitution',
  templateUrl: './chord-substitution.component.html',
  styleUrls: ['./chord-substitution.component.scss']
})
export class ChordSubstitutionComponent implements OnInit, IObserver<Array<Array<Chord>>> {

  private chord1: Chord;
  private chord2: Chord;
  private chord3: Chord;
  private chord4: Chord;

  constructor(
    private substitutionManager: SubstitutionManagerService,
    private messageService: MessageService
    ) { }

  update(arg: Array<Array<Chord>>): void {
    console.log('received', arg);
    this.buildSubstitutionSequence(arg);

  }

  ngOnInit() {
    this.chord1 = new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('maj7'));
    this.chord2 = new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'));
    this.chord3 = new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7'));
    this.chord4 = new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7'));

    this.substitutionManager.attach(this);
    // console.log(this.chord1);
  }

  sendMessage() {
    this.messageService.sendMessage([this.chord1, this.chord2, this.chord3, this.chord4, 3]);
  }

  buildSubstitutionSequence(arg: any) {
    const chordSeq = [];
    // TODO
    for (let i = 0; i < arg.length; i++) {
      for (let j = 0; j < arg[i].length; j++) {
        chordSeq.push(arg[i][j]);
      }
    }
    console.log(chordSeq);
  }
}
