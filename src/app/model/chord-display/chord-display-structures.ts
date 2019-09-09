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

export class AccidentalInfo {
    private _noteIndex: number;
    private _label: string;

    public constructor(noteIndex: number, label: string) {
        this._noteIndex = noteIndex;
        this._label = label;
    }

    public get index() {
        return this._noteIndex;
    }

    public get label() {
        return this._label;
    }
}