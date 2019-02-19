import { Scale } from '../Scale';
import { ProgMeasure } from './ProgMeasure';
import { IHarmonization } from '../IHarmonization';

export interface IProgSequencer {
    // retrieval of the chromatic scale
    readonly scale: Scale;
    // measure as extension of the previous concept
    // made up of 4 fixed subdivisions,
    //      each of which contains a chord
    readonly measure: ProgMeasure;

    readonly harmonization: IHarmonization;
}
