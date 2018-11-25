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
    if(beatsPerMinute != parseInt(beatsPerMinute) ||
    beatsPerMinute < BEATS_MIN || beatsPerMinute > BEATS_MAX) {
      console.log("error while assigning the clock bpm value");
    }
    else {
      _bpm = beatsPerMinute;
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

  private function inc() {
    _riseCount++;  _riseCount = _riseCount % bpm;
  }

  public function start() {
    _th = setInterval(inc, 60.0/bpm);
  }
  public function stop() {
    clearInterval(_th);
  }

}
