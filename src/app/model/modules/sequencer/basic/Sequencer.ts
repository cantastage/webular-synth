import { ISequencer } from './ISequencer';
import { Scale } from '../Scale';
import { Measure } from './Measure';
import { IHarmonization } from '../IHarmonization';
import { IPitchClass } from '../IPitchClass';
import { Subdivision } from './Subdivision';

export class Sequencer implements ISequencer {
    private _scale: Scale;
    private _measure: Measure;

    public get scale(): Scale {
        return this._scale;
    }
    public get measure(): Measure {
        return this._measure;
    }

    // FOLLOWING COMP&DEL
    public get key(): IPitchClass {
        return this.scale.key;
    }
    public set key(key: IPitchClass) {
        this.scale.key = key;
    }
    public get harmonization(): IHarmonization {
        return this.scale.harmonization;
    }
    public set harmonization(harmonization: IHarmonization) {
        if (harmonization === undefined) {
            throw new Error('cannot assing the harmonization value');
        }
        if (this.scale.harmonization !== harmonization) {
            this.scale.harmonization = harmonization;
            const l = this.measure.subdivisions.length;
            this.measure.subdivisions.splice(0, l);
            for (const sub of Measure.generateSubdivisionVector(l,
              this.scale.harmonization.pattern.length + 1)) {
              this.measure.subdivisions.push(sub);
            }
        }
    }
    public get metric(): number {
        return this.measure.subdivisions.length;
    }
    public set metric(m: number) {
        if (m === undefined || m < Measure.METRIC_MIN || m > Measure.METRIC_MAX) {
            throw new Error('cannot assign the metric value');
        }
        while (this.measure.subdivisions.length !== m) {
            if (this.measure.subdivisions.length > m) {
                this.measure.subdivisions.pop();
            } else {
                this.measure.subdivisions.push(
                    new Subdivision(
                        Subdivision.generateOctaveVector(this.scale.harmonization.pattern.length + 1),
                        Subdivision.DURATION_MIN,
                        Subdivision.VELOCITY_MAX
                    )
                );
            }
        }
    }

    public constructor(key: IPitchClass, harmonization: IHarmonization, metric: number) {
        // default initialization
        this._scale = new Scale(key, harmonization);
        this._measure = new Measure(
            Measure.generateSubdivisionVector(metric, this.scale.harmonization.pattern.length + 1)
        );
        // dynamic adaptation
        this.key = this.scale.key;
        this.harmonization = this.scale.harmonization;
        this.metric = metric;
    }
}
