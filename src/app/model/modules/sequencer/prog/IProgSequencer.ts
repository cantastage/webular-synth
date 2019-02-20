// import { Scale } from '../Scale';
import { Progression } from './Progression';
// import { IHarmonization } from '../IHarmonization';

export interface IProgSequencer {
    readonly difficulty: number;
    readonly progression: Progression;
}
