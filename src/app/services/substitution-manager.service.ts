import { Injectable } from '@angular/core';
import { PrimaryNames, SecondaryNames } from 'src/app/model/modules/sequencer/IPitchClass';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { Chord } from '../model/modules/sequencer/Chord.js';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { sub_tables, substitutionRulesets } from 'src/app/model/modules/chord-substitution/SubstitutionRules';
import { Progression } from '../model/modules/sequencer/Progression.js';
/*
* This Service provides support for the chord substitution module.
* The method substituteChord take a Chord and a level as input, and builds a table of possible
* substitutions that can be made on the input chord. It passes the table to the findChordSubstitution method,
* which selects the 2 substituted chords (for every input chords a 1:2 substitution is operated) based on the
* chosen difficulty level. The transposeChord method is used to traspose the substituted chords (which are based
* on chord transitions in the C key) in the key of the input chord, and returns the chords to be substituted to the
* progression sequencer.
*/

@Injectable({
  providedIn: 'root'
})

export class SubstitutionManagerService {
  constructor() { }

  // this will be deleted or private?!
  public static funny(message: Progression, difficultyLevel: number): Array<Array<Chord>> {
    const substitutedProgression = new Array<Array<Chord>>();
    for (let i = 0; i < message.chords.length; i++) {
      // const a = this.convertEnharmonic(message[i]);
      substitutedProgression[i] =
      SubstitutionManagerService.substituteChord(message.chords[i], difficultyLevel);
    }
    return substitutedProgression;
  }

  public static substituteChord(chord: Chord, difficultyLevel: number): Array<Chord> {
    // console.log(chord);
    const substitution_rules = Array<any>();
    const possible_substitutions = Array<any>();
    let substitutionTable: any[] = new Array<any>();
    const qualities = ChordQualitiesProvider.retrieveInstances();
    for (let i = 0; i < qualities.length; i++) {
      substitution_rules[i] = {
        name: qualities[i].name,
        sub_table: sub_tables[i]
      };
      if (chord.quality.name ===  substitution_rules[i].name) {
        substitutionTable = substitutionRulesets[i];
      }
    }
    const transpositionValue = (chord.root).value;
    // console.log('trans', transpositionValue);
    const intermediate = SubstitutionManagerService.transposeChord(
      SubstitutionManagerService.findChordSubstitution(substitutionTable, difficultyLevel),
      transpositionValue
    );
    return intermediate;
  }

  private static findChordSubstitution(substitutionTable: any[], difficultyLevel: number): Array<Chord> {
    const tableConstraint = [];
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
      if (PrimaryNames[arg[i].root.primaryName] === undefined) {
        // console.log('is enharmonic');
        pitchValue[i] = SecondaryNames[arg[i].root.value];
        if (pitchValue[i] + value >= 12) {
          transposedPitch[i] = SecondaryNames[pitchValue[i] + value - 12];
        } else {
          transposedPitch[i] = SecondaryNames[pitchValue[i] + value];
        }
      } else {
        // console.log('is not enharmonic');
        pitchValue[i] = arg[i].root.value;
        // console.log(arg[i]);
        // console.log('pitchvalue', pitchValue[i]);
        if (pitchValue[i] + value >= 12) {
          transposedPitch[i] = PrimaryNames[pitchValue[i] + value - 12];
          } else {
            transposedPitch[i] = PrimaryNames[pitchValue[i] + value];
        }
      }
      // console.log('trans pitch', transposedPitch[i]);
      transposedChords[i] = new Chord(PitchClassesProvider.retrieveInstanceByName(transposedPitch[i]), arg[i].quality);
    }
    // console.log('transp chords: ', transposedChords);
    return transposedChords;
  }

  // Is this still used?
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

  // Is this still used?
  public static retrieveSubstitutionSequence(message: Progression, difficultyLevel: number): Array<Chord> {
    return SubstitutionManagerService.buildSubstitutionSequence(
      SubstitutionManagerService.funny(message, difficultyLevel)
    );
  }
/*
  private convertEnharmonic(chord: Chord): Chord {
    if (PrimaryNames[chord.root.primaryName] === undefined) {
      // console.log('is enharmonic');
      const convertedChord = chord;
      convertedChord.root = PitchClassesProvider.retrieveInstanceByName(PrimaryNames[SecondaryNames[chord.root.primaryName]]);
      // console.log('converted', convertedChord);
      return convertedChord;
    } else {
      // console.log('not converted', chord);
      return chord;
    }

  }
*/
}
