import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IPitchClass, PrimaryNames, NOTE_COUNT, OCTAVE_DEFAULT, SecondaryNames } from './IPitchClass';
import { IPitch } from './IPitch';
import { EnumHelper } from 'src/app/system2/utilities/EnumHelper';
import { PitchClassesProvider } from './PitchClassesProvider';

@sealed
class Pitch implements IPitch {
    private _pitchClass: IPitchClass;
    private _octave: number;

    // cache field depending on private ones
    private _frequency: number;
    private _octaValue: number;

    public get primaryName(): string {
        return this._pitchClass.primaryName;
    }
    public get secondaryName(): string {
        return this._pitchClass.secondaryName;
    }
    public get value(): number {
        return this._pitchClass.value;
    }

    public get octave(): number {
        return this._octave;
    }
    public get frequency(): number {
        return this._frequency;
    }
    public get octaValue(): number {
        return this._octaValue;
    }

    public constructor(pitchClass: IPitchClass, octave: number) {
        this._pitchClass = pitchClass;
        this._octave = octave;
        this._frequency =  this._pitchClass.frequency * (2 ** (this.octave - 4));
        this._octaValue = this.value + (this.octave - 4) * NOTE_COUNT;
    }
}

export class PitchesProvider { // fly-weight pattern
    public static readonly OCTAVE_MIN = 4;
    public static readonly OCTAVE_MAX = 6;

    private static _pitches: IPitch[];
    private static initialize() {
        if (!this._pitches) { // se non già istanziato
            this._pitches = new Array<IPitch>();
            EnumHelper.getValues(PrimaryNames).forEach(
                el => {
                    for (let i = this.OCTAVE_MIN; i <= this.OCTAVE_MAX; i++) {
                        this._pitches.push(
                            new Pitch(PitchClassesProvider.retrieveInstanceByValue(el),
                            i)
                        );
                    }
                }
            );
        }
    }
    public static retrieveInstances(): IPitch[] {
        this.initialize();
        return this._pitches;
    }
    public static retrieveInstanceByValueOct(value: number, oct: number): IPitch {
        this.initialize();
        let ret: IPitch;
        for (let i = 0; i < this._pitches.length; i++) {
            if (this._pitches[i].value === value && this._pitches[i].octave === oct) {
                ret = this._pitches[i];
                break;
            }
        }

        return ret;
    }
    public static retrieveByIPitchClassOct(iPitchClass: IPitchClass, oct: number): IPitch {
        return this.retrieveInstanceByValueOct(iPitchClass.value, oct);
    }
    public static retrieveInstanceByOctaValue(octaValue: number): IPitch {
        return this.retrieveInstanceByValueOct(octaValue % NOTE_COUNT,
            OCTAVE_DEFAULT + Math.floor(octaValue / NOTE_COUNT));
    }
    public static retrieveInstanceByNameOct(name: string, oct: number): IPitch {
        let value = EnumHelper.getValueOfKey(PrimaryNames, name);
        if (value === undefined) {
            value = EnumHelper.getValueOfKey(SecondaryNames, name);
        }
        return this.retrieveInstanceByValueOct(value, oct);
    }
}
