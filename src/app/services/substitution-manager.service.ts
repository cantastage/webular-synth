import { Injectable } from '@angular/core';
import { Observable} from '../system2/patterns/observer/Observable.js';
import { MessageService} from 'src/app/services/message.service';
import { NoteNames, EnharmonicNames } from 'src/app/model/modules/sequencer/IPitchClass';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { IChordQuality } from 'src/app/model/modules/chord-substitution/IChordQuality';
import { Chord } from '../model/modules/sequencer/prog/Chord.js';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { sub_tables, substitutionRulesets } from 'src/app/model/modules/chord-substitution/SubstitutionRules';
/*
This Service provides support for the chord substitution module
 */

@Injectable({
  providedIn: 'root'
})

export class SubstitutionManagerService extends Observable<Array<Array<Chord>>> {

  private message: any;
  private _chordQualities: IChordQuality[];
  private substitutionTable: any;
  private difficultyLevel: number;
  private substitutedProgression: any;

  constructor(private messageService: MessageService) {
    super();
    this.messageService.getMessage().subscribe(message => { this.message = message;
    this.onMessageReceive(this.message.message);
     });
  }

  private onMessageReceive(message: any) {
    // Message comes in an array of 4 chords and 1 number indicating difficulty, elaborate actions for every chord
    this.substitutedProgression = [];
    this.difficultyLevel = message[message.length - 1];
    // console.log('starting Chords', message);

    for (let i = 0; i < message.length - 1; i++) {
      // const a = this.convertEnharmonic(message[i]);
      this.substitutedProgression[i] = this.findSubstitutionRules(message[i]); // (message[i]);
    }
    // console.log('substitutions', this.substitutedProgression);
    this.notify(this.substitutedProgression);
  }
  private findSubstitutionRules(chord: Chord): Array<Chord> {
    // console.log(chord);
    const substitution_rules = Array<any>();
    const possible_substitutions = Array<any>();
    const qualities = ChordQualitiesProvider.retrieveInstances();
    for (let i = 0; i < qualities.length; i++) {
      substitution_rules[i] = {
        name: qualities[i].chordQualityName,
        sub_table: sub_tables[i]
      };
      if (chord.quality.chordQualityName ===  substitution_rules[i].name) {
        this.substitutionTable = substitutionRulesets[i];
      }
    }
    const transpositionValue = (chord.root).pitchClassValue;
    // console.log('trans', transpositionValue);
    const intermediate = this.transposeChord(this.findChordSubstitution(), transpositionValue);
    return intermediate;
  }

  private findChordSubstitution(): any {
    const tableConstraint = [];
    // console.log(this.substitutionTable);
    for (let i = 0; i < this.substitutionTable.length; i++) {
      if ( this.substitutionTable[i].difficulty <= this.difficultyLevel) {
        tableConstraint.push(this.substitutionTable[i]);
      }
    }
    const choice = Math.floor(Math.random() * tableConstraint.length);
    // console.log(tableConstraint[choice].chord1);
    return [tableConstraint[choice].chord1, tableConstraint[choice].chord2];
  }


  private transposeChord (arg: Array<Chord>, value: number): Array<Chord> {
    const pitchValue = [];
    const transposedPitch = [];
    const transposedChords = [];
    for (let i = 0; i < arg.length; i++) {
      if (NoteNames[arg[i].root.pitchClassName] === undefined) {
        // console.log('is enharmonic');
        pitchValue[i] = EnharmonicNames[arg[i].root.pitchClassValue];
        if (pitchValue[i] + value >= 12) {
          transposedPitch[i] = EnharmonicNames[pitchValue[i] + value - 12];
        } else {
          transposedPitch[i] = EnharmonicNames[pitchValue[i] + value];
        }
      } else {
        // console.log('is not enharmonic');
        pitchValue[i] = arg[i].root.pitchClassValue;
        // console.log(arg[i]);
        // console.log('pitchvalue', pitchValue[i]);
        if (pitchValue[i] + value >= 12) {
          transposedPitch[i] = NoteNames[pitchValue[i] + value - 12];
          } else {
            transposedPitch[i] = NoteNames[pitchValue[i] + value];
        }

      }
      // console.log('trans pitch', transposedPitch[i]);
      transposedChords[i] = new Chord(PitchClassesProvider.retrieveInstance(transposedPitch[i]), arg[i].quality);
    }
    // console.log('transp chords: ', transposedChords);
    return transposedChords;
  }
/*
  private convertEnharmonic(chord: Chord): Chord {
    if (NoteNames[chord.root.pitchClassName] === undefined) {
      // console.log('is enharmonic');
      const convertedChord = chord;
      convertedChord.root = PitchClassesProvider.retrieveInstance(NoteNames[EnharmonicNames[chord.root.pitchClassName]]);
      // console.log('converted', convertedChord);
      return convertedChord;
    } else {
      // console.log('not converted', chord);
      return chord;
    }

  }
*/
}
