export class DiatonicNoteInfo {
    private _label: string;
    private _chromatic_index: number;
    private _diatonic_index: number;
    private _distance_from_prev_diatonic_note: number;


    /**
     * Creates a diatonic note
     * @param label 
     * @param chromatic_index 
     * @param diatonic_index 
     * @param distance_from_prev_diatonic_note 
     */
    constructor(label: string, chromatic_index: number, diatonic_index: number, distance_from_prev_diatonic_note: number) {
        this._label = label;
        this._chromatic_index = chromatic_index;
        this._diatonic_index = diatonic_index;
        this._distance_from_prev_diatonic_note = distance_from_prev_diatonic_note;
    }

    // TODO aggiungere getters
    /**
     * Returns note label (ex: C, D, E, F ecc...)
     */
    get label() {
        return this._label;
    }

    get chromaticIndex() {
        return this._chromatic_index;
    }

    get diatonicIndex() {
        return this._diatonic_index;
    }

    get distanceFromPrevDiatonicNote() {
        return this._distance_from_prev_diatonic_note;
    }
 }

 /**
  * Diatonic notes
  */
// export const diatonicNotes = [
//     new DiatonicNoteInfo('C', 0, 0, 1),
//     new DiatonicNoteInfo('D', 2, 1, 2),
//     new DiatonicNoteInfo('E', 4, 2, 2),
//     new DiatonicNoteInfo('F', 5, 3, 1),
//     new DiatonicNoteInfo('G', 7, 4, 2),
//     new DiatonicNoteInfo('A', 9, 5, 2),
//     new DiatonicNoteInfo('B', 11, 6, 2)
// ];

// type DiatonicNote = 'C' | 'D' | 'E' | 'F'| 'G' | 'A'| 'B';

// export const diatonicNotesMap = new Array<Record<DiatonicNote, DiatonicNoteInfo>>(
//     new Record<string, DiatonicNoteInfo>('C', diatonicNotes[0]),
// );

// const x: Record


// export class DisplayChord {
//     private 
// }