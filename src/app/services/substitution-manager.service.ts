import { Injectable } from '@angular/core';
import { Observable} from '../system2/patterns/observer/Observable.js';
import { MessageService} from 'src/app/services/message.service';
import { IPitchClass, NoteNames } from 'src/app/model/modules/sequencer/IPitchClass';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { IChordQualities } from 'src/app/model/modules/chord-substitution/IChordQualities';
import { Chord } from '../synth-modules/chord-substitution/Chord.js';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { sub_tables, substitutionRulesets } from 'src/app/model/modules/chord-substitution/SubstitutionRules';
/*
This Service provides support for the chord substitution module
 */

@Injectable({
  providedIn: 'root'
})

export class SubstitutionManagerService extends Observable<Chord> {

  private message: any;
  private _chordQualities: IChordQualities[];
  private substitutionTable: any;
  private difficultyLevel: number;
  private substitutedProgression: any;

  constructor(private messageService: MessageService) {
    super();
    this.substitutedProgression = [];
    this.messageService.getMessage().subscribe(message => { this.message = message;
    this.onMessageReceive(this.message.message);
     });
  }

  private onMessageReceive(message: any) {
    // Message comes in an array of 4 chords and 1 number indicating difficulty, elaborate actions for every chord
    this.difficultyLevel = message[message.length - 1];
    for (let i = 0; i < message.length - 1; i++) {
      this.substitutedProgression[i] = this.findSubstitutionRules(message[i]);
    }
    this.notify(this.substitutedProgression);
  }
  private findSubstitutionRules(chord: Chord): Array<Chord> {
    // this.notify(new Chord('C', 'maj'));
    const substitution_rules = Array<any>();
    const possible_substitutions = Array<any>();
    const qualities = ChordQualitiesProvider.retrieveInstances();
    for (let i = 0; i < qualities.length; i++) {
      substitution_rules[i] = {
        name: qualities[i].chordQualityName,
        sub_table: sub_tables[i]
      };
      if (chord.quality ===  substitution_rules[i].name) {
        this.substitutionTable = substitutionRulesets[i];
      }
    }
    const transpositionValue = (PitchClassesProvider.retrieveInstance(chord.root).pitchClassValue);
    const intermediate = this.transposeChord(this.findChordSubstitution(), transpositionValue);
    return intermediate;
  }

  private findChordSubstitution(): any {
    const tableConstraint = [];
    for (let i = 0; i < this.substitutionTable.length; i++) {
      if ( this.substitutionTable[i].difficulty <= this.difficultyLevel) {
        tableConstraint.push(this.substitutionTable[i]);
      }
    }
    const choice = Math.floor((Math.random() * tableConstraint.length) + 1);
    return [tableConstraint[choice].chord1, tableConstraint[choice].chord2];
  }


  private transposeChord (arg: Array<Chord>, value: number): Array<Chord> {
    // console.log('transp value: ', value);
    // console.log('chords: ', arg);
    const pitchValue = [];
    const transposedPitch = [];
    const transposedChords = [];
    for (let i = 0; i < arg.length; i++) {
      pitchValue[i] = NoteNames[arg[i].root];
      if (pitchValue[i] + value >= 12) {
        transposedPitch[i] = NoteNames[pitchValue[i] + value - 12];
        } else {
          transposedPitch[i] = NoteNames[pitchValue[i] + value];
      }
      // console.log('trans pitch', transposedPitch[i]);
      // transposedChords[i] = NoteNames[transposedPitch[i]];
      transposedChords[i] = new Chord(transposedPitch[i], arg[i].quality);
    }
    // console.log('transp chords: ', transposedChords);

    // Transpose root note of chords before giving the output
    return transposedChords;
  }

}
