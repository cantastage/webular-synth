import { Observable, Observer, Subscription } from 'rxjs';

export interface ISuperObservable<T> {
    attach(observer: Observer<T>): void;
    detach(observer: Observer<T>): void;
    notify(arg: T): void;
}

export abstract class SuperObservable<T> implements ISuperObservable<T> {
    private _observable: Observable<T>;

    private _observers: Observer<T>[];
    private _subscriptions: Subscription[];

    public constructor() {
        this._observable = new Observable<T>();
        this._observers = new Array<Observer<T>>();
        this._subscriptions = new Array<Subscription>();
    }

    public attach(observer: Observer<T>): void {
        let i;
        if (observer === undefined) {
          throw new Error('undefined observer cannot be accepted');
        } else if ((i = this._observers.indexOf(observer)) > 0) {
            throw new Error('observer already present');
        } else {
            this._observers.push(observer);
            this._subscriptions.push(this._observable.subscribe(observer));
        }
    }
    public detach(observer: Observer<T>): void {
        let i;
        if (observer === undefined) {
          throw new Error('undefined observer cannot be accepted');
        } else if ((i = this._observers.indexOf(observer)) < 0) {
            throw new Error('observer not found');
        } else {
            this._subscriptions[i].unsubscribe();
            this._subscriptions.splice(i, 1);
            this._observers.splice(i, 1);
        }
    }
    public notify(arg: T): void {
        this._observers.forEach(element => {
          element.next(arg);
        });
    }
}
