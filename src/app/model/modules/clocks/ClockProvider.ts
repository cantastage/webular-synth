import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IClock } from './IClock';

@sealed
class Clock implements IClock {
  private static readonly BEATS_MIN: number = 55;
  private static readonly BEATS_MAX: number = 255;

  private _bpm: number;

  public BEATS_MIN() {
    return Clock.BEATS_MIN;
  }
  public BEATS_MAX() {
    return Clock.BEATS_MAX;
  }

  public get bpm() {
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
  private static _hiddenClock: IClock;
  private static initialize(): void {
    if (!this._hiddenClock) {
      this._hiddenClock = new Clock(120);
    }
  }
  public static retrieveInstance(): IClock {
    this.initialize();
    return this._hiddenClock;
  }
}
