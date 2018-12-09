import { IReferralNote, NoteNames, EnharmonicNames, A4, SD } from './IReferralNote';

@sealed
class ReferralNote implements IReferralNote {
    private _referralNote: NoteNames;

    private _enharmonicName: EnharmonicNames;
    private _referralFrequency: number;

    public referralNote(): NoteNames {
        return this._referralNote;
    }
    public setReferralNote(referralNote: NoteNames) { // creepy, but unavoidable
        this._referralNote = referralNote;
        // CHECK BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const tmp = EnharmonicNames[NoteNames[referralNote]];
        this._enharmonicName = tmp ? tmp : EnharmonicNames[EnharmonicNames.nd];
        this._referralFrequency = A4 * (SD ** (referralNote - 9));
    }
    public enharmonicName(): EnharmonicNames {
        return this._enharmonicName;
    }
    public referralFrequency(): number {
        return this._referralFrequency;
    }

    public constructor(referralNote: NoteNames) {
        this.setReferralNote(referralNote);
    }
}

export class ReferralNotesProvider { // fly-weitght pattern
    private static _referralNotes: IReferralNote[];
    private static initialize() {
        if (!this._referralNotes) {
            this._referralNotes = new Array<IReferralNote>();
            Object.keys(NoteNames).forEach(element => {
                // CHECK BELOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                this._referralNotes.push(new ReferralNote(NoteNames[element]));
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
            if (element.referralNote() === id) {
                ret = element;
            }
        });

        return ret;
    }
}
