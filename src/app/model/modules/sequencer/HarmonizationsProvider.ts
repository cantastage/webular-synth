import { IHarmonization } from './IHarmonization';

class Harmonization implements IHarmonization {
    private _name: string;
    private _pattern: number[];

    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        if (name == null || name === '') {
            throw new Error('error while assigning the tonality value');
        }
        this._name = name;
    }
    public get pattern(): number[] {
        return this._pattern;
    }
    public set pattern(pattern: number[]) {
        let validPattern = pattern != null;
        if (validPattern) {
            pattern.forEach(element => {
                if (!Number.isInteger(Number(element))) {
                    validPattern = false;
                    return false; // DOES THIS WORK AS BREAK?!?!
                }
            });
            if (validPattern) {
                let sum = 0;
                pattern.forEach(element => {
                    sum += element;
                });
                validPattern = sum === 12;
            }
        }

        if (!validPattern) {
            throw new Error('error while assigning the pattern values');
        }
        this._pattern = pattern;
    }

    public constructor(name: string, pattern: number[]) {
        this.name = name;
        this.pattern = pattern;
    }
}

export class HarmonizationsProvider { // fly-weight pattern
    private static _harmonizations: IHarmonization[];
    private static initialize() {
        if (!this._harmonizations) {
            this._harmonizations = [
                new Harmonization('M', [2, 2, 1, 2, 2, 2, 1]),
                new Harmonization('mN', [2, 1, 2, 2, 1, 2, 2]),
                new Harmonization('mH', [2, 1, 2, 2, 1, 3, 1]),
                new Harmonization('mM', [2, 1, 2, 2, 2, 2, 1]),
                new Harmonization('pentatonic', [3, 2, 2, 3, 2]),
                new Harmonization('esatonic', [2, 2, 2, 2, 2, 2])
            ];
        }
    }
    public static retrieveInstances(): IHarmonization[] {
        this.initialize();
        return this._harmonizations;
    }
    public static retrieveInstance(id: string): IHarmonization {
        this.initialize();
        let ret: IHarmonization;
        for (let i = 0; i < this._harmonizations.length; i++) {
            if (this._harmonizations[i].name === id) {
                ret = this._harmonizations[i];
                break;
            }
        }

        return ret;
    }
}
