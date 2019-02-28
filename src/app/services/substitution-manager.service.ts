import { Injectable } from '@angular/core';
import { NoteNames, EnharmonicNames } from 'src/app/model/modules/sequencer/IPitchClass';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { Chord } from '../model/modules/sequencer/prog/Chord.js';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { sub_tables, substitutionRulesets } from 'src/app/model/modules/chord-substitution/SubstitutionRules';
import { Progression } from '../model/modules/sequencer/prog/Progression.js';
/*
This Service provides support for the chord substitution module
 */

@Injectable({
  providedIn: 'root'
})

export class SubstitutionManagerService {

  private substitutionTable: any;

  constructor() { }

  public static funny(message: Progression, difficultyLevel: number): Array<Array<Chord>> {
    const substitutedProgression = new Array<Array<Chord>>();
    for (let i = 0; i < message.chords.length; i++) {
      // const a = this.convertEnharmonic(message[i]);
      substitutedProgression[i] = SubstitutionManagerService.findSubstitutionRules(message.chords[i], difficultyLevel);
    }
    return substitutedProgression;
  }

  private static findSubstitutionRules(chord: Chord, difficultyLevel: number): Array<Chord> {
    // console.log(chord);
    const substitution_rules = Array<any>();
    const possible_substitutions = Array<any>();
    let substitutionTable: any[] = new Array<any>();
    const qualities = ChordQualitiesProvider.retrieveInstances();
    for (let i = 0; i < qualities.length; i++) {
      substitution_rules[i] = {
        name: qualities[i].chordQualityName,
        sub_table: sub_tables[i]
      };
      if (chord.quality.chordQualityName ===  substitution_rules[i].name) {
        substitutionTable = substitutionRulesets[i];
      }
    }
    const transpositionValue = (chord.root).pitchClassValue;
    // console.log('trans', transpositionValue);
    const intermediate = SubstitutionManagerService.transposeChord(
      SubstitutionManagerService.findChordSubstitution(substitutionTable, difficultyLevel),
      transpositionValue
    );
    return intermediate;
  }

  private static findChordSubstitution(substitutionTable: any[], difficultyLevel: number): Array<Chord> {
    const tableConstraint = [];
    // console.log(this.substitutionTable);
    for (let i = 0; i < substitutionTable.length; i++) {
      if ( substitutionTable[i].difficulty <= difficultyLevel) {
        tableConstraint.push(substitutionTable[i]);
      }
    }
    const choice = Math.floor(Math.random() * tableConstraint.length);
    // console.log(tableConstraint[choice].chord1);
    return [tableConstraint[choice].chord1, tableConstraint[choice].chord2];
  }

  private static transposeChord (arg: Array<Chord>, value: number): Array<Chord> {
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

  public static buildSubstitutionSequence(arg: Array<Array<Chord>>): Array<Chord> {
    const chordSeq = [];
    // TODO
    for (let i = 0; i < arg.length; i++) {
      for (let j = 0; j < arg[i].length; j++) {
        chordSeq.push(arg[i][j]);
      }
    }
    // console.log(chordSeq);
    return chordSeq;
  }
  public static retrieveSubstitutionSequence(message: Progression, difficultyLevel: number): Array<Chord> {
    return SubstitutionManagerService.buildSubstitutionSequence(
      SubstitutionManagerService.funny(message, difficultyLevel)
    );
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
