import { Component, OnInit } from '@angular/core';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';
import { MessageService } from 'src/app/services/message.service';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { Chord } from './Chord';

@Component({
  selector: 'app-chord-substitution',
  templateUrl: './chord-substitution.component.html',
  styleUrls: ['./chord-substitution.component.scss']
})
export class ChordSubstitutionComponent implements OnInit, IObserver<number> {

  private prova: number;
  private a: number;
  private chord: Chord;

  constructor(
    private substitutionManager: SubstitutionManagerService,
    private messageService: MessageService
    ) { }

  update(arg: number): void {
    console.log(arg);
  }

  ngOnInit() {
    this.prova = 1;
    this.chord = new Chord('F', 'maj7');
    this.substitutionManager.attach(this);
    console.log(this.chord.findPitchClass());
  }

  sendMessage() {
    this.messageService.sendMessage(this.prova);
  }

  testMessage() {
    this.messageService.sendMessage(Math.random());
  }
}
