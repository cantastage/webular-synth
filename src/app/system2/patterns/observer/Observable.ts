import { IObserver } from './IObserver';

export interface IObservable<notifyType> {
    attach(observer: IObserver<notifyType>): void;
    detach(observer: IObserver<notifyType>): void;
    notify(arg: notifyType): void;
}

export abstract class Observable<notifyType> implements IObservable<notifyType> {
    private _observers: IObserver<notifyType>[];
    constructor() {
    this._observers = new Array<IObserver<notifyType>>();
    }

    attach(observer: IObserver<notifyType>): void {
        if (observer == null) {
          throw new Error('the observer cannot be null');
        }
        this._observers.push(observer);
    }
    detach(observer: IObserver<notifyType>): void {
        let i;
        if (observer == null || (i = this._observers.indexOf(observer)) < 0) {
          throw new Error('observer null or not found');
        } else {
          this._observers.splice(i, 1);
        }
    }
    notify(arg: notifyType): void {
        this._observers.forEach(element => {
          element.update(arg);
        });
    }
}
