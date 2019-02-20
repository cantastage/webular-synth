import { Chord } from './Chord';

export class Progression {
  private _chords: Chord[];
  public get chords(): Chord[] {
    return this._chords;
  }
  public set chords(chords: Chord[]) {
    if (chords === undefined || chords.length !== 4) {
      throw new Error('error while assigning the chords values');
    }
    this._chords = chords;
  }

  public constructor(chords: Chord[]) {
    this.chords = chords;
  }

  // REMOVE IF USELESS
  // public static generateChordVector(): Chord[] {
  //   const ret = new Array<Chord>();
  //   return ret;
  // }
}
