import { PitchClassesProvider } from './PitchClassesProvider';
import { IPitchClass, SD } from './IPitchClass';
import { IHarmonization } from './IHarmonization';

export class Scale {
    private _key: IPitchClass;
    private _harmonization: IHarmonization; // struttura della scala in semitoni, vettore di interi

    // cache field depending on private ones
    private _diatonicNotes: IPitchClass[];
    private _useEnharmonicNames: boolean[];

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
    public get useEnharmonicNames(): boolean[] {
        return this._useEnharmonicNames;
    }

    private updateCache(): void {
        this.diatonicNotes.splice(0, this.diatonicNotes.length); // clear all
        this.diatonicNotes.push(this.key);
        this.useEnharmonicNames.splice(0, this.useEnharmonicNames.length);
        this.useEnharmonicNames.push(false);

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
        let prevUsed: string = this.diatonicNotes[0].pitchClassName;
        let delta: number;
        for (let i = 1; i < this.diatonicNotes.length - 1; i++) {
            delta = Math.abs(this.diatonicNotes[i].pitchClassName.charCodeAt(0) - prevUsed.charCodeAt(0));
            if (delta !== 1 && delta !== 6) {
                this.useEnharmonicNames.push(true);
                prevUsed = this.diatonicNotes[i].enharmonicName;
            } else {
                this.useEnharmonicNames.push(false);
                prevUsed = this.diatonicNotes[i].pitchClassName;
            }
        }
    }

    public constructor(key: IPitchClass, harmonization: IHarmonization) {
        this._diatonicNotes = new Array<IPitchClass>();
        this._useEnharmonicNames = new Array<boolean>();
        this.key = key;
        this.harmonization = harmonization;
    }
}
