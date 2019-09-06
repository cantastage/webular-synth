import { sealed } from 'src/app/system2/utilities/ClassDecorators';
import { IPitchClass, PrimaryNames, SecondaryNames, A4, SD } from './IPitchClass';
import { EnumHelper } from 'src/app/system2/utilities/EnumHelper';

@sealed
class PitchClass implements IPitchClass {
    private _value: PrimaryNames;
    private _name: string;

    // cache fields depending on private ones
    private _frequency: number;

    private get primaryNameKey(): string {
        return EnumHelper.getKeyOfValue(PrimaryNames, this._value);
    }
    public get primaryName(): string {
        return this.primaryNameKey;
    }
    private get secondaryNameKey(): string {
        const tmp = EnumHelper.getKeyOfValue(SecondaryNames, this._value);
        return tmp ? tmp : 'nd';
    }
    public get secondaryName(): string {
        return this.secondaryNameKey;
    }
    public get value(): number {
        return this._value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        if (name !== this.primaryName && name !== this.secondaryName) {
            throw new Error('error while assigning the name value');
        }
        this._name = name;
    }
    public get frequency(): number {
        return this._frequency;
    }

    public constructor(pitchClass: PrimaryNames) {
        this._value = pitchClass;
        this._frequency = A4 * (SD ** (this.value - 9));
        this.name = this.primaryName;
    }
}

export class PitchClassesProvider { // fly-weight pattern
    private static _pitchClasses: IPitchClass[];
    private static initialize() {
        if (!this._pitchClasses) { // se non già istanziato
            this._pitchClasses = new Array<IPitchClass>();
            EnumHelper.getValues(PrimaryNames).forEach(
                el => this._pitchClasses.push(new PitchClass(el))
            );
        }
    }
    public static retrieveInstances(): IPitchClass[] {
        this.initialize();
        return this._pitchClasses;
    }
    public static retrieveInstanceByValue(value: number): IPitchClass {
        this.initialize();
        let ret: IPitchClass;
        for (let i = 0; i < this._pitchClasses.length; i++) {
            if (this._pitchClasses[i].value === value) {
                ret = this._pitchClasses[i];
                break;
            }
        }
        return ret;
    }
    public static retrieveInstanceByName(name: string): IPitchClass {
        return this.retrieveInstanceByValue(EnumHelper.getValueOfKey(PrimaryNames, name));
    }
}
