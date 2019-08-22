import { IPitchClass } from '../IPitchClass';

export interface IPitch {
    readonly pitchClass: IPitchClass; //NOTA 
    readonly octave: number; // OTTAVA
    readonly frequency: number;
}
