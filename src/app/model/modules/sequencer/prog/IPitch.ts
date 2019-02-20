import { IPitchClass } from '../IPitchClass';

export interface IPitch {
    readonly pitchClass: IPitchClass;
    readonly octave: number;
    readonly frequency: number;
}
