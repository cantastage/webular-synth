interface IClock extends IModule, IObservable {
    bpm: number;
    BEATS_MIN(): number;
    BEATS_MAX(): number;
}
