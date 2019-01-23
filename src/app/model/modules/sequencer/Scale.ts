import { ICache } from '../../../system2/utilities/ICache';
import { PitchClassesProvider } from './PitchClassesProvider';
import { IPitchClass, SD } from './IPitchClass';
import { IHarmonization } from './IHarmonization';

export class Scale implements ICache {
    private _key: IPitchClass;
    private _harmonization: IHarmonization;

    // cache field depending on private ones
    private _diatonicNotes: IPitchClass[];

    public get key(): IPitchClass {
        return this._key;
    }
    public set key(key: IPitchClass) {
        if (key == null) {
            throw new Error('error while assigning the key value');
        }
        this._key = key;
        if (this.harmonization) {
            this._updateCache();
        }
    }
    public get harmonization(): IHarmonization {
        return this._harmonization;
    }
    public set harmonization(harmonization: IHarmonization) {
        if (harmonization == null) {
            throw new Error('error while assigning the harmonization value');
        }
        this._harmonization = harmonization;
        if (this.key) {
            this._updateCache();
        }
    }
    public get diatonicNotes(): IPitchClass[] {
        return this._diatonicNotes;
    }

    public _updateCache(): void {
        if (!this.diatonicNotes) {
            this._diatonicNotes = new Array<IPitchClass>();
        }
        this.diatonicNotes.splice(0, this.diatonicNotes.length); // clear all
        this.diatonicNotes.push(this.key);
        let incrementalStep = 0;
        this.harmonization.pattern.forEach(element => {
            incrementalStep += element;
            const nextfreq = this.key.referralFrequency * (SD ** incrementalStep);

            const nextnote = (): IPitchClass => {
                let nextnotehp: IPitchClass; let nextfreqhp: number;
                let found = false;
                for (let i = 0; i < PitchClassesProvider.retrieveInstances().length; i++) {
                    nextnotehp = PitchClassesProvider.retrieveInstances()[i];
                    nextfreqhp = nextnotehp.referralFrequency;
                    for (let k = 0; k < 10 && !found; k++) { // overdimensioned, maybe 2 (covering 5 octaves) is ok?
                        if (Math.floor(nextfreq) === Math.floor(nextfreqhp * (2 ** k)) ||
                            Math.floor(nextfreq) === Math.floor(nextfreqhp / (2 ** k))) {
                            found = true; // exits from the foreach, occurrence found
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
                return nextnotehp;
            };

            this.diatonicNotes.push(nextnote());
        });
    }

    public constructor(key: IPitchClass, harmonization: IHarmonization) {
        this.key = key;
        this.harmonization = harmonization;
    }
}
