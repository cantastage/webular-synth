import { sealed } from '../../../system2/utilities/ClassDecorators';
import { isInteger } from '../../../system2/utilities/NumericalExtensions';

@sealed
export class Tonality {
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
                if (!isInteger(element) || (element !== 1 && element !== 2)) {
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
