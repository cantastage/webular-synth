import { Progression } from '../Progression';

export interface IProgSequencer {
    readonly difficulty: number;
    readonly progression: Progression;
    channel: number;
}
