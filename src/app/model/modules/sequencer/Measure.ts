import { Subdivision } from './Subdivision';

export class Measure {
    public static readonly METRIC_MIN = 4;
    public static readonly METRIC_MAX = 16;

    private _subdivisions: Subdivision[];

    public get subdivisions(): Subdivision[] {
        return this._subdivisions;
    }
    public set subdivisions(subdivisions: Subdivision[]) {
        if (subdivisions === undefined || subdivisions.length < Measure.METRIC_MIN || subdivisions.length > Measure.METRIC_MAX) {
            throw new Error('error while assigning the subdivision values');
        }
        this._subdivisions = subdivisions;
    }

    public constructor(subdivisions: Subdivision[]) {
        this.subdivisions = subdivisions;
    }

    public static generateSubdivisionVector(subdivisionCount: number, octaveCount: number): Subdivision[] {
      const ret = new Array<Subdivision>();
      for (let i = 0; i < subdivisionCount; i++) {
        ret.push(
          new Subdivision(
            Subdivision.generateOctaveVector(octaveCount),
            Subdivision.DURATION_MIN,
            Subdivision.VELOCITY_MAX)
        );
      }
      return ret;
    }
}
