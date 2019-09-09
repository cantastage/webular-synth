import { Progression } from '../Progression';

export interface IProgSequencer {
    difficulty: number;
    readonly progression: Progression;
    channel: number;
}
