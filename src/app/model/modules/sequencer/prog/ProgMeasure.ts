import { ProgSubdivision } from './ProgSubdivision';

export class ProgMeasure {
    public static readonly METRIC_MIN = 4;
    public static readonly METRIC_MAX = 16;

    private _subdivisions: ProgSubdivision[];

    public get subdivisions(): ProgSubdivision[] {
        return this._subdivisions;
    }
    public set subdivisions(subdivisions: ProgSubdivision[]) {
        if (subdivisions === undefined || subdivisions.length < ProgMeasure.METRIC_MIN || subdivisions.length > ProgMeasure.METRIC_MAX) {
            throw new Error('error while assigning the subdivision values');
        }
        this._subdivisions = subdivisions;
    }

    public constructor(subdivisions: ProgSubdivision[]) {
        this.subdivisions = subdivisions;
    }

    public static generateSubdivisionVector(subdivisionCount: number, octaveCount: number): ProgSubdivision[] {
      const ret = new Array<ProgSubdivision>();
      for (let i = 0; i < subdivisionCount; i++) {
        ret.push(
          new ProgSubdivision(
            ProgSubdivision.generateOctaveVector(octaveCount),
            ProgSubdivision.DURATION_MIN,
            ProgSubdivision.VELOCITY_MAX)
        );
      }
      return ret;
    }
}
