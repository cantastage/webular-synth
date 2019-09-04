import { Injectable } from '@angular/core';
import { Chord } from '../model/modules/sequencer/prog/Chord';
import { relative } from 'path';
import { DiatonicNoteInfo } from '../model/chord-display/chord-display-structures';
import { runInThisContext } from 'vm';
import { copyArrayItem } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
/**
 * This service creates the actual voicings of the chords displayed on the screen,
 *
 */
export class ChordDisplayService {

  private VF; //Vexflow variable
  private htIntervals: Array<number>; // represents the intervals in half tones
  private diatonicScale = [
    new DiatonicNoteInfo('C', 0, 0, 1),
    new DiatonicNoteInfo('D', 2, 1, 2),
    new DiatonicNoteInfo('E', 4, 2, 2),
    new DiatonicNoteInfo('F', 5, 3, 1),
    new DiatonicNoteInfo('G', 7, 4, 2),
    new DiatonicNoteInfo('A', 9, 5, 2),
    new DiatonicNoteInfo('B', 11, 6, 2)
  ];

  constructor() {
    this.VF = Vex.Flow;
    this.htIntervals = [1, 2, 2, 3, 3, 4, -1, 5, 6, 6, 7, 7, 8];
  }

  /**
   * This method builds the set of formatted chord voicings to be displayed on screen with VexFlow.
   * @param raw_chords The chords from prog sequencer
   */
  public buildChordsForDisplay(raw_chords: Array<Chord>): Array<any> {
    console.log('Accordi nel metodo: ', raw_chords);
    const displayVoicings = new Array<Object>();
    // per ogni accordo devo creare il voicing da mostrare a schermo 
    for (let i = 0; i < raw_chords.length; i++) {
      if (i > 0 && raw_chords[i].root.pitchClassValue === raw_chords[i - 1].root.pitchClassValue) {
        displayVoicings[i] = displayVoicings[i - 1]; //TODO controllare se referenzia lo stesso oggetto o se è una copia
      } else {
        displayVoicings.push(this.createDisplayChord(raw_chords[i]));
      }
    }
    return displayVoicings;
  }

  // private analyzeRootOfChord(chord: Chord): void { }

  /**
   * Given a row chord, this method creates its display version
   * @param raw_chord chord from which info are extracted
   */
  private createDisplayChord(raw_chord: Chord): Object {
    // analisi della root dell'accordo
    const root = raw_chord.root; // è un IPitchClass
    const size = root.pitchClassName.length; // length of the string
    const rootChromaticIndex = root.pitchClassValue;
    let diatonicRoot: DiatonicNoteInfo;
    const keys = [];
    // let diatonic_name = root.pitchClassName[0];
    switch (root.pitchClassName[0]) {
      case 'C':
        diatonicRoot = this.diatonicScale[0];
        break;
      case 'D':
        diatonicRoot = this.diatonicScale[1];
        break;
      case 'E':
        diatonicRoot = this.diatonicScale[2];
        break;
      case 'F':
        diatonicRoot = this.diatonicScale[3];
        break;
      case 'G':
        diatonicRoot = this.diatonicScale[4];
        break;
      case 'A':
        diatonicRoot = this.diatonicScale[5];
        break;
      case 'B':
        diatonicRoot = this.diatonicScale[6];
        break;
    }
    let offset = 0;
    if (size > 1) {
      if (root.pitchClassName[1] === 'b') {
        // caso in cui sia bemolle => allarga l'intervallo
        offset = offset + 1;
      } else {
        // caso in cui sia # => restringe l'intervallo, dato che contiamo sempre in avanti
        offset = offset - 1;
      }
    }
    // now calculate intervals between notes of the chord
    const rawChordNotes = raw_chord.chordNotes;
    // let realative_distances = [];
    for (let j = 0; j < rawChordNotes.length; j++) {
      // realative_distances[j] = Math.abs(raw_chord_notes[j].pitchClass.pitchClassValue - root_chromatic_index);
      let htDistance = 0;
      // console.log('porca paletta: ', rawChordNotes[0].pitchClass.pitchClassValue);
      if (rootChromaticIndex > rawChordNotes[j].pitchClass.pitchClassValue) {
        htDistance = 12 - Math.abs(rawChordNotes[j].pitchClass.pitchClassValue - rootChromaticIndex);
      } else {
        htDistance = rawChordNotes[j].pitchClass.pitchClassValue - rootChromaticIndex;
      }
      // calcolo dell'intervallo per identificare etichetta che andrà nella nota
      const diatonicInterval = this.htIntervals[htDistance];
      let index = 0;
      if (diatonicInterval > 1) {
        index = (diatonicRoot.diatonicIndex + 1) % 12; // al primo giro è già settato per beccare la nota diatonica successiva
      } else {
        index = diatonicRoot.diatonicIndex;
      }
      // let diatonicSteps = diatonicInterval - 1; // passi da fare nella scala diatonica
      let calculatedDistance = 0;
      let k = 0;
      while (k < (diatonicInterval - 2)) {
        calculatedDistance = calculatedDistance + this.diatonicScale[index].distanceFromPrevDiatonicNote;
        index = (index + 1) % this.diatonicScale.length;
        k++;
      }
      keys.push(this.diatonicScale[index].label + '/' + rawChordNotes[j].octave); // TODO check if using index is correct
      // if(htDistance > calculatedDistance ) {
      //   if (offset = )
      // }
      // TODO add b and #
    }
    return { clef: 'treble', keys: keys, duration: 'h' };
  }

}
