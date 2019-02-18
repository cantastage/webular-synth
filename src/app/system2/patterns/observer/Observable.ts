import { IObserver } from './IObserver';

export interface IObservable<notifyType> {
    attach(observer: IObserver<notifyType>): void;
    detach(observer: IObserver<notifyType>): void;
    notify(arg: notifyType): void;
}

export abstract class Observable<notifyType> implements IObservable<notifyType> {
    private _observers: IObserver<notifyType>[];
    public constructor() {
        this._observers = new Array<IObserver<notifyType>>();
    }

    public attach(observer: IObserver<notifyType>): void {
        let i;
        if (observer === undefined) {
          throw new Error('undefined observer cannot be accepted');
        } else if ((i = this._observers.indexOf(observer)) > 0) {
            throw new Error('observer already present');
        } else {
            this._observers.push(observer);
        }
    }
    public detach(observer: IObserver<notifyType>): void {
        let i;
        if (observer === undefined) {
          throw new Error('undefined observer cannot be accepted');
        } else if ((i = this._observers.indexOf(observer)) < 0) {
            throw new Error('observer not found');
        } else {
          this._observers.splice(i, 1);
        }
    }
    public notify(arg: notifyType): void {
        this._observers.forEach(element => {
          element.update(arg);
        });
    }
}
