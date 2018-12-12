import { ICache } from '../../../system2/utilities/ICache';
import { ReferralNotesProvider } from './ReferralNotesProvider';
import { IReferralNote, SD } from './IReferralNote';
import { Tonality } from './Tonality';

export class Scale implements ICache {
    private _key: IReferralNote;
    private _tonality: Tonality;

    // cache field depending on private ones
    private _diatonicNotes: IReferralNote[];

    public get key(): IReferralNote {
        return this._key;
    }
    public set key(key: IReferralNote) {
        if (key == null) {
            throw new Error('error while assigning the key value');
        }
        this._key = key;
        if (this.tonality) {
            this._updateCache();
        }
    }
    public get tonality(): Tonality {
        return this._tonality;
    }
    public set tonality(tonality: Tonality) {
        if (tonality == null) {
            throw new Error('error while assigning the tonality value');
        }
        this._tonality = tonality;
        if (this.key) {
            this._updateCache();
        }
    }
    public get diatonicNotes(): IReferralNote[] {
        return this._diatonicNotes;
    }

    public _updateCache(): void {
        if (!this.diatonicNotes) {
            this._diatonicNotes = new Array<IReferralNote>();
        }
        this.diatonicNotes.splice(0, this.diatonicNotes.length); // clear all
        this.diatonicNotes.push(this.key);
        let incrementalStep = 0;
        this.tonality.pattern.forEach(element => {
            incrementalStep += element;
            const nextfreq = this.key.referralFrequency() * (SD ** incrementalStep);

            const nextnote = (): IReferralNote => {
                let nextnotehp: IReferralNote; let nextfreqhp: number;
                let found = false;
                for (let i = 0; i < ReferralNotesProvider.retrieveInstances().length; i++) {
                    nextnotehp = ReferralNotesProvider.retrieveInstances()[i];
                    nextfreqhp = nextnotehp.referralFrequency();
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

    public constructor(key: IReferralNote, tonality: Tonality) {
        this.key = key;
        this.tonality = tonality;
    }
}
