import { IPitchClass, NOTE_COUNT } from './IPitchClass';

export const A4 = 440;
export const OCTAVE_DEFAULT = 4;
export const SD = (2 ** (1 / NOTE_COUNT));

export interface IPitch extends IPitchClass {
    readonly octave: number; // OTTAVA
    readonly octaValue: number;
    readonly frequency: number;
}
