import { IPitchClass, NoteNames, EnharmonicNames, A4, SD } from '../IPitchClass';
import { IPitch } from './IPitch';

export class Pitch implements IPitch {
    public static readonly OCTAVE_MIN = 4;
    public static readonly OCTAVE_MAX = 6;

    private _pitchClass: IPitchClass;
    private _octave: number;

    // cache field depending on private ones
    private _frequency: number;

    public get pitchClass(): IPitchClass {
        return this._pitchClass;
    }
    public set pitchClass(pitchClass: IPitchClass) {
        if (pitchClass === undefined) {
            throw new Error('error while assigning the pitchClass value');
        }
        this._pitchClass = pitchClass;
        if (this.octave) {
            this.updateCache();
        }
    }
    public get octave(): number {
        return this._octave;
    }
    public set octave(octave: number) {
        if (octave === undefined || octave < Pitch.OCTAVE_MIN || octave > Pitch.OCTAVE_MAX) {
            throw new Error('error while assigning the octave value');
        }
        this._octave = octave;
        if (this.pitchClass) {
            this.updateCache();
        }
    }
    public get frequency(): number {
        return this._frequency;
    }

    public constructor(pitchClass: IPitchClass, octave: number) {
        this.pitchClass = pitchClass;
        this.octave = octave;
    }

    private updateCache(): void {
        // CALCULATION IN A SEPARATE CLASS?!
        // IF YES, UPDATE ALSO THE SequencerComponent
        this._frequency = this.pitchClass.referralFrequency * (2 ** (this.octave - 4));
    }
}
