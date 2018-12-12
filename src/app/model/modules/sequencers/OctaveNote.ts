import { ICache } from '../../../system2/utilities/ICache';
import { IReferralNote } from './IReferralNote';

export class OctaveNote implements ICache {
    public static readonly OCTAVE_MIN = 1;
    public static readonly OCTAVE_DEFAULT = 4;
    public static readonly OCTAVE_MAX = 5;

    private _note4: IReferralNote;
    private _octave: number;

    // cache field depending on private ones
    private _associatedFrequency: number;

    public get note4(): IReferralNote {
        return this._note4;
    }
    public set note4(note4: IReferralNote) {
        if (note4 == null) {
            throw new Error('error while assigning the note4 value');
        }
        this._note4 = note4;
        this._updateCache();
    }
    public get octave(): number {
        return this._octave;
    }
    public set octave(octave: number) {
        if (!Number.isInteger(Number(octave)) || octave < OctaveNote.OCTAVE_MIN || octave > OctaveNote.OCTAVE_MAX) {
            throw new Error('error while assigning the octave value');
        }
        this._octave = octave;
        this._updateCache();
    }
    public get associatedFrequency(): number {
        return this._associatedFrequency;
    }

    public _updateCache(): void {
        this._associatedFrequency = this.note4.referralFrequency() * (2 ** (this.octave - 4));
    }

    public constructor(note4: IReferralNote, octave: number) {
        this.note4 = note4;
        this.octave = octave;
    }
}
