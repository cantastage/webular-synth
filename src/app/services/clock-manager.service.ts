import { Injectable } from '@angular/core';
import { Observable } from '../system2/patterns/observer/Observable';
import { IClock } from '../model/modules/clock/IClock';
import { ClockProvider } from '../model/modules/clock/ClockProvider';
import { IStartable } from './IStartable';

@Injectable({
  providedIn: 'root'
})
export class ClockManagerService extends Observable<number> implements IStartable, IClock {
  private _clock: IClock;
  private _beatCount: number;

  private _isRunning: boolean;
  private _th: any;

  public BEATS_MIN() {
    return this._clock.BEATS_MIN();
  }
  public BEATS_DEFAULT(): number {
    return this._clock.BEATS_DEFAULT();
  }
  public BEATS_MAX() {
    return this._clock.BEATS_MAX();
  }

  public get bpm() {
    return this._clock.bpm;
  }
  public set bpm(bpm: number) {
    if (!Number.isInteger(Number(bpm)) || bpm < this.BEATS_MIN() || bpm > this.BEATS_MAX()) {
      throw new Error('error while assigning the bpm value');
    }
    this._clock.bpm = bpm;
    if (this._isRunning) {
      // partial stop with no isRunning modification
      clearInterval(this._th);
      // partial restart with no isRunning modification
      this._th = setInterval(this.callback.bind(null, this), 60.0 / this.bpm * 1000);
    }
  }
  public get beatCount(): number {
    return this._beatCount;
  }

  private resetBeatCount(): void {
    this._beatCount = 0;
  }
  constructor() {
    super();
    this._clock = ClockProvider.retrieveInstance();
    this.resetBeatCount();
    this._isRunning = false;
    this._th = null;
  }

  public start(): void {
    this.resetBeatCount();
    if (!this._isRunning) {
      this._th = setInterval(this.callback.bind(null, this), 60.0 / this.bpm * 1000);
      this._isRunning = true;
    }
  }
  public stop(): void {
    if (this._isRunning) {
      clearInterval(this._th);
      this._isRunning = false;
    }
    this.resetBeatCount();
  }

  private callback(ctx: ClockManagerService) {
    ctx.notify(ctx.beatCount);
    ctx._beatCount = (ctx._beatCount + 1) % ctx.bpm;
  }
}
