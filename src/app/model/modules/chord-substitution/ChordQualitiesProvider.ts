import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IChordQualities, ChordQualities } from './IChordQualities';

@sealed
class ChordQuality implements IChordQualities {
    private _chordQualities: ChordQualities;
    // private _quality: string;

    public get chordQualitySymbol(): string {
        return ChordQualities[this._chordQualities];
    }
    public get chordQualityName(): string {
        return this.chordQualitySymbol;
    }
    public get chordQualityValue(): number {
        return this._chordQualities;
    }
    public set chordQuality(chordQuality: ChordQualities) {
        this._chordQualities = chordQuality;
    }

    constructor(chordQuality: ChordQualities) {
        this.chordQuality = chordQuality;
     }
}

export class ChordQualitiesProvider {
    private static _chordQualities: IChordQualities[];
    private static initialize() {
        if (!this._chordQualities) {
            this._chordQualities = new Array<IChordQualities>();
            Object.keys(ChordQualities).forEach(element => {
                if (isNaN(parseInt(element, 10))) { // only enum string identifiers
                    this._chordQualities.push(new ChordQuality(ChordQualities[element]));
                }
            });
        }
    }
    public static retrieveInstance(id: string) {
        this.initialize();
        let ret: IChordQualities;
        for (let i = 0; i < this._chordQualities.length; i++) {
            if (this._chordQualities[i].chordQualityName === id) {
                ret = this._chordQualities[i];
                break;
            }
        }
        return ret;
    }
}
