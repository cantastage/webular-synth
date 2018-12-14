import { IObserver } from './IObserver';

// SHALL I BE AN ABSTRACT CLASS?
export interface IObservable {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(arg: any): void;
}
