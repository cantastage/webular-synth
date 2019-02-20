import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IChordQuality, ChordQualities } from './IChordQuality';

@sealed
class ChordQuality implements IChordQuality {
    private _chordQuality: ChordQualities;
    // private _quality: string;

    public get chordQualitySymbol(): string {
        return ChordQualities[this._chordQuality];
    }
    public get chordQualityName(): string {
        return this.chordQualitySymbol;
    }
    public get chordQualityValue(): number {
        return this._chordQuality;
    }
    public set chordQuality(chordQuality: ChordQualities) {
        this._chordQuality = chordQuality;
    }

    constructor(chordQuality: ChordQualities) {
        this.chordQuality = chordQuality;
     }
}

export class ChordQualitiesProvider {
    private static _chordQualities: IChordQuality[];
    private static initialize() {
        if (!this._chordQualities) {
            this._chordQualities = new Array<IChordQuality>();
            Object.keys(ChordQualities).forEach(element => {
                if (isNaN(parseInt(element, 10))) { // only enum string identifiers
                    this._chordQualities.push(new ChordQuality(ChordQualities[element]));
                }
            });
        }
    }
    public static retrieveInstances(): IChordQuality[] {
        this.initialize();
        return this._chordQualities;
    }
    public static retrieveInstance(id: string) {
        this.initialize();
        let ret: IChordQuality;
        for (let i = 0; i < this._chordQualities.length; i++) {
            if (this._chordQualities[i].chordQualityName === id) {
                ret = this._chordQualities[i];
                break;
            }
        }
        return ret;
    }
}
