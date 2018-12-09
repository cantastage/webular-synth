import { ReferralNotes } from './ReferralNotes';

export class OctaveNote {
    public static readonly OCTAVE_MIN = 1;
    public static readonly OCTAVE_MAX = 5;

    private _note4: ReferralNotes;
    private _octave: number;

    private _associatedFrequency: number; // for caching

    public get note4(): ReferralNotes {
        return this._note4;
    }
    public set note4(note4: ReferralNotes) {
        this._note4 = note4;
        this.updateAssociatedFrequency();
    }
    public get octave(): number {
        return this._octave;
    }
    public set octave(octave: number) {
        if (!isInteger(octave) || octave < OctaveNote.OCTAVE_MIN || octave > OctaveNote.OCTAVE_MAX) {
            throw new Error('error while assigning the octave value');
        }
        this._octave = octave;
        this.updateAssociatedFrequency();
    }
    public get associatedFrequency(): number {
        return this._associatedFrequency;
    }

    private updateAssociatedFrequency(): void {
        this._associatedFrequency = parseFloat(ReferralNotes[this.note4]) * (2 ** (this.octave - 4));
    }

    public constructor(note4: ReferralNotes, octave: number) {
        this.note4 = note4;
        this.octave = octave;
    }
}
