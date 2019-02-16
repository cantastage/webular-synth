export interface IObserver<notifyType> {
    update(arg: notifyType): void;
}
