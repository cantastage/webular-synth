import { IPitchClass } from './IPitchClass';

export interface IPitch extends IPitchClass {
    readonly octave: number; // OTTAVA
    readonly octaValue: number;
}
