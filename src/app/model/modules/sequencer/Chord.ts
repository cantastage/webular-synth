import { IPitchClass, NOTE_COUNT } from './IPitchClass';
import { IChordQuality } from '../chord-substitution/IChordQuality';
import { Scale } from './Scale';
import { IPitch } from './IPitch';
import { HarmonizationsProvider } from './HarmonizationsProvider';
import { PitchesProvider } from './PitchesProvider';

/**
 * Root is played on the 4th octave, extensions on the 5th and 6th
 *
 */
export class Chord {
    public static readonly FLAG_COUNT = 18;
    private _root: IPitchClass; // root note dell'accordo
    private _quality: IChordQuality;

    // cache field depending on private ones
    private _chromaticScale: Scale;
    private _chordNotes: IPitch[]; // corrisponde al voicing dell'accordo

    // definisce la root
    public get root(): IPitchClass {
        return this._root;
    }
    public set root(root: IPitchClass) {
        if (root === undefined) {
            throw new Error('error while assigning the root value');
        }
        this._root = root;
        if (this.quality) {
            this.updateCache();
        }
    }
    public get quality(): IChordQuality {
        return this._quality;
    }
    public set quality(quality: IChordQuality) {
        if (quality === undefined) {
            throw new Error('error while assigning the quality value');
        }
        this._quality = quality;
        if (this.root) {
            this.updateCache();
        }
    }
    public get chordNotes(): IPitch[] {
        return this._chordNotes;
    }

    // NB costruttore dell'accordo!
    public constructor(root: IPitchClass, quality: IChordQuality) {
        this._chordNotes = new Array<IPitch>();
        this.root = root;
        this.quality = quality;
    }

    // update notes?
    private updateCache(): void {
        this._chromaticScale = new Scale(this.root, HarmonizationsProvider.retrieveInstanceByName('chromatic'));

        this.chordNotes.splice(0, this.chordNotes.length); // clear all

        let oct = PitchesProvider.OCTAVE_MIN;
        let nip: IPitchClass;
        // tslint:disable-next-line:no-bitwise
        let flag_mask = 1 << (Chord.FLAG_COUNT - 1);
        let on = false;

        for (let i = 0; i < Chord.FLAG_COUNT; i++) {
            // tslint:disable-next-line:no-bitwise
            on = (this.quality.value & flag_mask) === flag_mask;
            if (i > 0 && (this.root.value + i) % NOTE_COUNT === 0) { oct++; }
            if (on) {
                nip = this._chromaticScale.diatonicNotes[i % NOTE_COUNT];
                this.chordNotes.push(PitchesProvider.retrieveInstanceByIPitchClassOct(nip, oct));
            }

            // tslint:disable-next-line:no-bitwise
            flag_mask = flag_mask >> 1;
        }
    }
}
