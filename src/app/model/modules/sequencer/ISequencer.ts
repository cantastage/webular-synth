import { Scale } from './Scale';
import { Measure } from './Measure';

// import { IModule } from '../../../services/IModule';

export interface ISequencer /*extends IModule*/ {
    scale: Scale;
    measure: Measure;
    // should add midiChannel: number;
}
