import { Subdivision } from './Subdivision';
import { isInteger } from '../../../system2/utilities/NumericalExtensions';

export class Measure {
    public static readonly METRIC_MIN = 4;
    public static readonly METRIC_MAX = 16;

    // private _metric: number;
    private _subdivisions: Subdivision[];

    // public get metric(): number {
    //     return this._metric;
    // }
    // public set metric(metric: number) {
    //     if (!isInteger(metric) || metric < Measure.METRIC_MIN || metric > Measure.METRIC_MAX) {
    //         throw new Error('error while assigning the metric value');
    //     }
    //     this._metric = metric;
    // }
    public get subdivisions(): Subdivision[] {
        return this._subdivisions;
    }
    public set subdivisions(subdivisions: Subdivision[]) {
        if (subdivisions == null || subdivisions.length < Measure.METRIC_MIN || subdivisions.length > Measure.METRIC_MAX) {
            // subdivisions.length !== this.metric) {
            throw new Error('error while assigning the subdivision values');
        }
        this._subdivisions = subdivisions;
    }

    // CORRECTION? METRIC USELESS, CHECK OF MIN MAX ON subdivisions.length?!
    public constructor(/*metric: number, */subdivisions: Subdivision[]) {
        // this.metric = metric;
        this.subdivisions = subdivisions;
    }
}
