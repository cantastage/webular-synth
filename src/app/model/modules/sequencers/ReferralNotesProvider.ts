import { sealed } from '../../../system2/utilities/ClassDecorators';
import { IReferralNote, NoteNames, EnharmonicNames, A4, SD } from './IReferralNote';
import { ICache } from '../../../system2/utilities/ICache';

@sealed
class ReferralNote implements IReferralNote, ICache {
    private _referralNote: NoteNames;

    // cache fields depending on private ones
    private _enharmonicName: EnharmonicNames;
    private _referralFrequency: number;

    private referralNoteKey(): string {
        return NoteNames[this._referralNote];
    }
    private referralNoteValue(): number {
        return this._referralNote;
    }
    public referralNote(): string {
        return this.referralNoteKey();
    }
    public setReferralNote(referralNote: NoteNames) { // creepy, but unavoidable
        this._referralNote = referralNote;
        this._updateCache();
    }
    private enharmonicNameKey(): string {
        return EnharmonicNames[this._enharmonicName];
    }
    private enharmonicNameValue(): number {
        return this._enharmonicName;
    }
    public enharmonicName(): string {
        return this.enharmonicNameKey();
    }
    public referralFrequency(): number {
        return this._referralFrequency;
    }
    _updateCache(): void {
        // CHECK BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this._enharmonicName = String(EnharmonicNames[this.referralNoteValue()]) !== 'undefined' ?
            this.referralNoteValue() : EnharmonicNames.nd;
        this._referralFrequency = A4 * (SD ** (this.referralNoteValue() - 9));
    }

    public constructor(referralNote: NoteNames) {
        this.setReferralNote(referralNote);
    }
}

export class ReferralNotesProvider { // fly-weight pattern
    private static _referralNotes: IReferralNote[];
    private static initialize() {
        if (!this._referralNotes) {
            this._referralNotes = new Array<IReferralNote>();
            // CHECK BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            Object.keys(NoteNames).forEach(element => {
                if (isNaN(parseInt(element, 10))) { // only enum string identifiers
                    this._referralNotes.push(new ReferralNote(NoteNames[element]));
                }
            });
        }
    }
    public static retrieveInstances(): IReferralNote[] {
        this.initialize();
        return this._referralNotes;
    }
    public static retrieveInstance(id: NoteNames): IReferralNote {
        this.initialize();
        let ret: IReferralNote;
        this._referralNotes.forEach(element => {
            if (element.referralNote() === NoteNames[id]) {
                ret = element;
            }
        });

        return ret;
    }
}
