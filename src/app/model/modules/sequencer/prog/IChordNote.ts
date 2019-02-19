import { IPitchClass } from '../IPitchClass';

export interface IChordNote {
    readonly pitchClass: IPitchClass;
    readonly octave: number; // 0? - 4, 5, 6
    readonly frequency: number;
}
