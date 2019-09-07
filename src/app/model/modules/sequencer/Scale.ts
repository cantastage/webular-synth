import { PitchClassesProvider } from './PitchClassesProvider';
import { IHarmonization } from './IHarmonization';
import { IPitchClass, NOTE_COUNT } from './IPitchClass';

export class Scale {
    private _key: IPitchClass;
    private _harmonization: IHarmonization; // struttura della scala in semitoni, vettore di interi

    // cache field depending on private ones
    private _diatonicNotes: IPitchClass[];

    public get key(): IPitchClass {
        return this._key;
    }
    public set key(key: IPitchClass) {
        if (key === undefined) {
            throw new Error('error while assigning the key value');
        }
        this._key = key;
        if (this.harmonization) {
            this.updateCache();
        }
    }
    public get harmonization(): IHarmonization {
        return this._harmonization;
    }
    public set harmonization(harmonization: IHarmonization) {
        if (harmonization === undefined) {
            throw new Error('error while assigning the harmonization value');
        }
        this._harmonization = harmonization;
        if (this.key) {
            this.updateCache();
        }
    }
    public get diatonicNotes(): IPitchClass[] {
        return this._diatonicNotes;
    }

    private updateCache(): void {
        this.diatonicNotes.splice(0, this.diatonicNotes.length); // clear all
        this.diatonicNotes.push(this.key);

        let incrementalStep = 0;
        for (let i = 0; i < this.harmonization.pattern.length; i++) {
            incrementalStep += this.harmonization.pattern[i];
            this.diatonicNotes.push(
                PitchClassesProvider.retrieveInstanceByValue((this.key.value + incrementalStep) % NOTE_COUNT)
            );
        }

        // let delta: number;
        // for (let i = 1; i < this.diatonicNotes.length - 1; i++) {
        //     delta = Math.abs(this.diatonicNotes[i].name.charCodeAt(0) -
        //         this.diatonicNotes[i - 1].name.charCodeAt(0));
        //     if (delta !== 1 && delta !== 6) {
        //         this.diatonicNotes[i].name = this.diatonicNotes[i].secondaryName;
        //     }
        // }
    }

    public constructor(key: IPitchClass, harmonization: IHarmonization) {
        this._diatonicNotes = new Array<IPitchClass>();
        this.key = key;
        this.harmonization = harmonization;
    }
}
