import { Injectable } from '@angular/core';
import { IClock } from '../model/modules/clock/IClock';
import { ClockProvider } from '../model/modules/clock/ClockProvider';
import { SuperObservable } from '../system2/patterns/observer/SuperObservable';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClockManagerService extends SuperObservable<number> implements IClock {
  private _clock: IClock;
  private _beatCount: number;

  private _isRunning: boolean;
  private _th: any;

  public get minValue(): number {
    return this._clock.minValue;
  }
  public get defaultValue(): number {
    return this._clock.defaultValue;
  }
  public get maxValue(): number {
    return this._clock.maxValue;
  }

  public get bpm(): number {
    return this._clock.bpm;
  }
  public set bpm(bpm: number) {
    if (!Number.isInteger(Number(bpm)) || bpm < ClockProvider.BEATS_MIN || bpm > ClockProvider.BEATS_MAX) {
      throw new Error('error while assigning the bpm value');
    }
    this._clock.bpm = bpm;
    if (this._isRunning) {
      // partial stop with no isRunning modification
      clearInterval(this._th);
      // partial restart with no isRunning modification
      this._th = setInterval(this.callback, this.bms, this);
    }
  }
  public get bms(): number {
    return this._clock.bms;
  }
  public get beatCount(): number {
    return this._beatCount;
  }

  private resetBeatCount(): void {
    this._beatCount = 0;
  }
  public constructor() {
    super();

    this._clock = ClockProvider.retrieveInstance();
    this.resetBeatCount();
    this._isRunning = false;
    this._th = null;
    this.start();
  }

  private start(): void {
    this.resetBeatCount();
    if (!this._isRunning) {
      this._th = setInterval(this.callback, 60.0 / this.bpm * 1000, this);
      this._isRunning = true;
    }
  }
  private stop(): void {
    if (this._isRunning) {
      clearInterval(this._th);
      this._isRunning = false;
    }
    this.resetBeatCount();
  }
  public restart(): void {
    this.stop(); this.start();
  }


  private callback(ctx: ClockManagerService) {
    ctx.notify(ctx.beatCount + 1);
    ctx._beatCount = (ctx._beatCount + 1) % ctx.bpm;
  }

  public attach(observer: Observer<number>): void {
    super.attach(observer);
    this.restart();
  }
}
