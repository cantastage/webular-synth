import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IChordQuality, ChordQualities } from './IChordQuality';
import { EnumHelper } from 'src/app/system2/utilities/EnumHelper';

@sealed
class ChordQuality implements IChordQuality {
    private _value: ChordQualities;

    private get chordQualityKey(): string {
        return EnumHelper.getKeyOfValue(ChordQualities, this._value);
    }
    public get name(): string {
        return this.chordQualityKey;
    }
    public get value(): number {
        return this._value;
    }

    constructor(chordQuality: ChordQualities) {
        this._value = chordQuality;
     }
}

export class ChordQualitiesProvider {
    private static _chordQualities: IChordQuality[];
    private static initialize() {
        if (!this._chordQualities) {
            this._chordQualities = new Array<IChordQuality>();
            EnumHelper.getValues(ChordQualities).forEach(
                el => this._chordQualities.push(new ChordQuality(el))
            );
        }
    }
    public static retrieveInstances(): IChordQuality[] {
        this.initialize();
        return this._chordQualities;
    }
    public static retrieveInstanceByValue(value: number): IChordQuality {
        this.initialize();
        let ret: IChordQuality;
        for (let i = 0; i < this._chordQualities.length; i++) {
            if (this._chordQualities[i].value === value) {
                ret = this._chordQualities[i];
                break;
            }
        }
        return ret;
    }
    public static retrieveInstanceByName(name: string): IChordQuality {
        return this.retrieveInstanceByValue(EnumHelper.getValueOfKey(ChordQualities, name));
    }
}
