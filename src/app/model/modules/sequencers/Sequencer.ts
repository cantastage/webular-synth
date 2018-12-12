import { ISequencer } from './ISequencer';
import { Scale } from './Scale';
import { Measure } from './Measure';

export class Sequencer implements ISequencer {
    private _scale: Scale;
    private _measure: Measure;

    public get scale(): Scale {
        return this._scale;
    }
    public set scale(scale: Scale) {
        if (scale == null) {
            throw new Error('error while assigning the scale value');
        }
        this._scale = scale;
    }
    public get measure(): Measure {
        return this._measure;
    }
    public set measure(measure: Measure) {
        if (measure == null) {
            throw new Error('error while assigning the measure value');
        }
        this._measure = measure;
    }

    public constructor(scale: Scale, measure: Measure) {
        this.scale = scale;
        this.measure = measure;
    }
}
