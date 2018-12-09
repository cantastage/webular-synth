import { IClock } from './IClock';

@sealed
class Clock implements IClock {
  private static readonly BEATS_MIN: number = 55;
  private static readonly BEATS_MAX: number = 255;

  private _bpm: number;
  private _observers: IObserver[];
  private _isRunning: boolean;
  private _th: any;

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
    if (!isInteger(bpm) || bpm < Clock.BEATS_MIN || bpm > Clock.BEATS_MAX) {
      throw new Error('error while assigning the bpm value');
    }
    this._bpm = bpm;
    if (this._isRunning) {
      // partial stop with no isRunning modification
      clearInterval(this._th);
      // partial restart with no isRunning modification
      this._th = setInterval(this.callback, 60.0 / this.bpm * 1000);
    }
  }

  public constructor(bpm: number) {
    this.bpm = bpm;
    this._observers = new Array();
    this._isRunning = false;
    this._th = null;
  }

  public attach(observer: IObserver): void {
    if (observer == null) {
      throw new Error('the observer cannot be null');
    }
    this._observers.push(observer);
  }
  public detach(observer: IObserver): void {
    let i;
    if (observer == null || (i = this._observers.indexOf(observer)) < 0) {
      throw new Error('observer null or not found');
    }
  }
  public notify(): void {
    this._observers.forEach(element => {
      element.update();
    });
  }
  private callback() {
    this.notify();
  }

  public start(): void {
    if (!this._isRunning) {
      this._th = setInterval(this.callback, 60.0 / this.bpm * 1000);
      this._isRunning = true;
    }
  }
  public stop(): void {
    if (this._isRunning) {
      clearInterval(this._th);
      this._isRunning = false;
    }
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
