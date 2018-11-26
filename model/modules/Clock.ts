//SINGLETON
class Clock implements IModule {
  public static readonly BEATS_MIN: number = 55;
  public static readonly BEATS_MAX: number = 255;

  private _bpm: number; //integer between MIN MAX
  private _th: any;
  private _riseCount: number; //clock rising edge count

  public get bpm() {
    return this._bpm;
  }
  public set bpm(beatsPerMinute: number) {
    if(beatsPerMinute != Math.floor(beatsPerMinute) ||
    beatsPerMinute < Clock.BEATS_MIN || beatsPerMinute > Clock.BEATS_MAX) {
      console.log("error while assigning the clock bpm value");
    }
    else {
      this._bpm = beatsPerMinute;
    }
  }

  public get riseCount() {
    return this._riseCount+1;
  }

  constructor(beatsPerMinute: number) {
    this.bpm = beatsPerMinute;
    this._th = null;
    this._riseCount = 0;
  }

  private inc(): void {
    this._riseCount++;  this._riseCount = this._riseCount % this.bpm;
  }

  public start(): void {
    this._th = setInterval(this.inc, 60.0/this.bpm);
  }
  public stop(): void {
    clearInterval(this._th);
  }

}
