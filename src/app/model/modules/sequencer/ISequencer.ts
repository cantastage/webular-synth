import { Scale } from './Scale';
import { Measure } from './Measure';
import { IPitchClass } from './IPitchClass';
import { IHarmonization } from './IHarmonization';

export interface ISequencer {
    readonly scale: Scale;
    readonly measure: Measure;
    // midiChannel: number;
    key: IPitchClass;
    harmonization: IHarmonization;
    metric: number;
}
