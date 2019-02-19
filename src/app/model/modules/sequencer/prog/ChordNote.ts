import { IPitchClass, NoteNames, EnharmonicNames, A4, SD } from '../IPitchClass';
import { IChordNote } from './IChordNote';

export class ChordNote implements IChordNote {
    private _pitchClass: IPitchClass;
    private _octave: number;

    public get pitchClass(): IPitchClass {
        return this._pitchClass;
    }
    public get octave(): number {
        return this._octave;
    }
    public get frequency(): number {
        // FREQUENCY EVALUATION DEPENDING ON THE FIELDS
        throw new Error('NOT IMPLEMENTED YET');
    }

    public constructor(pitchClass: IPitchClass, octave: number) {
        this._pitchClass = pitchClass;
        this._octave = octave;
    }
}
