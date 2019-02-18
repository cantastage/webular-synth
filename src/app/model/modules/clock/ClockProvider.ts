import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IClock } from './IClock';

@sealed
class Clock implements IClock {
  public static readonly BEATS_MIN: number = 55;
  public static readonly BEATS_DEFAULT: number = 120;
  public static readonly BEATS_MAX: number = 255;

  private _bpm: number;

  public get minValue(): number {
    return Clock.BEATS_MIN;
  }
  public get defaultValue(): number {
    return Clock.BEATS_DEFAULT;
  }
  public get maxValue(): number {
    return Clock.BEATS_MAX;
  }

  public get bpm(): number {
    return this._bpm;
  }
  public set bpm(bpm: number) {
    if (!Number.isInteger(Number(bpm)) || bpm < Clock.BEATS_MIN || bpm > Clock.BEATS_MAX) {
      throw new Error('error while assigning the bpm value');
    }
    this._bpm = bpm;
  }

  public constructor(bpm: number) {
    this.bpm = bpm;
  }
}

export class ClockProvider { // singleton pattern
  public static readonly BEATS_MIN: number = Clock.BEATS_MIN;
  public static readonly BEATS_DEFAULT: number = Clock.BEATS_DEFAULT;
  public static readonly BEATS_MAX: number = Clock.BEATS_MAX;

  private static _hiddenClock: IClock;
  private static initialize(): void {
    if (this._hiddenClock === undefined) {
      this._hiddenClock = new Clock(Clock.BEATS_DEFAULT);
    }
  }
  public static retrieveInstance(): IClock {
    this.initialize();
    return this._hiddenClock;
  }
}
