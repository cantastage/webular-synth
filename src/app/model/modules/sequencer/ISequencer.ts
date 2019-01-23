import { Scale } from './Scale';
import { Measure } from './Measure';

export interface ISequencer {
    scale: Scale;
    measure: Measure;
    // midiChannel: number;
}
