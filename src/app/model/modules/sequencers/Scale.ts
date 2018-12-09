import { SD, ReferralNotes } from './ReferralNotes';
import { Tonality } from './Tonality';

export class Scale {
    private _key: ReferralNotes;
    private _tonality: Tonality;

    private _diatonicNotes: ReferralNotes[]; // for caching

    public get key(): ReferralNotes {
        return this._key;
    }
    public set key(key: ReferralNotes) {
        this._key = key;
        this.updateDiatonicNotes();
    }
    public get tonality(): Tonality {
        return this._tonality;
    }
    public set tonality(tonality: Tonality) {
        if (tonality == null) {
            throw new Error('error while assigning the tonality value');
        }
        this._tonality = tonality;
        this.updateDiatonicNotes();
    }
    public get diatonicNotes(): ReferralNotes[] {
        return this._diatonicNotes;
    }

    private updateDiatonicNotes(): void {
        if (!this.diatonicNotes) {
            this._diatonicNotes = new Array<ReferralNotes>();
        }
        this.diatonicNotes.splice(0, this.diatonicNotes.length); // clear all
        this.diatonicNotes.push(this.key);
        let incrementalStep = 0;
        this.tonality.pattern.forEach(element => {
            incrementalStep += element;
            const nextfreq = parseFloat(ReferralNotes[this.key]) * (SD ** incrementalStep);
            const nextnote = (): ReferralNotes => {
                let nextnotehp: ReferralNotes; let nextfreqhp: number;
                Object.keys(ReferralNotes).forEach(element2 => {
                    nextnotehp = ReferralNotes[element2]; nextfreqhp = parseFloat(ReferralNotes[nextnotehp]);
                    for (let k = 0; k < 10; k++) { // overdimensioned, maybe 2 (covering 5 octaves) is ok?
                        if (Math.floor(nextfreq) === Math.floor(nextfreqhp * (2 ** k)) ||
                            Math.floor(nextfreq) === Math.floor(nextnotehp / (2 ** k))) {
                            return nextnotehp;
                        }
                    }
                });
                return nextnotehp;
            };
            this.diatonicNotes.push(nextnote());
        });
    }

    public constructor(key: ReferralNotes, tonality: Tonality) {
        this.key = key;
        this.tonality = tonality;
    }
}
