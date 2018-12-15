import { Injectable } from '@angular/core';
import { IObservable } from '../system2/patterns/observer/IObservable';
import { IObserver } from '../system2/patterns/observer/IObserver';
import { IClock } from '../model/modules/clock/IClock';
import { ClockProvider } from '../model/modules/clock/ClockProvider';
import { IStartable } from './IStartable';

@Injectable({
  providedIn: 'root'
})
export class ClockManagerService implements IStartable, IClock, IObservable {
  private _clock: IClock;

  private _observers: IObserver[];
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

  constructor() {
    this._clock = ClockProvider.retrieveInstance();
    this._observers = new Array<IObserver>();
    this._isRunning = false;
    this._th = null;
  }

  public start(): void {
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
    } else {
      this._observers.splice(i, 1);
    }
  }
  public notify(arg: any): void {
    this._observers.forEach(element => {
      element.update(arg);
    });
  }
  private callback(ctx) {
    ctx.notify();
  }
}
