import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { IPitchClass } from 'src/app/model/modules/sequencer/IPitchClass';
import { IChordQualities } from 'src/app/model/modules/chord-substitution/IChordQualities';

/**
 * Root is played on the 4th octave, extensions on the 5th
 *
 */
export class Chord {
    public root: IPitchClass;
    public quality: IChordQualities;
    private chordNotes: Array<any>;

    constructor(root: IPitchClass, quality: IChordQualities) {
        this.root = root;
        this.quality = quality;
        // this.chordNotes =
     }

     public findPitchClass() {
        return this.root;

     }

     public findChordQuality() {
         return this.quality;
     }

}
