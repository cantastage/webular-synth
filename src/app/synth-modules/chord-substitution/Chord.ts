import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';

export class Chord {
    private root: any;
    private quality: any;

    constructor(root: string, quality: string) {
        this.root = root;
        this.quality = quality;
     }

     public findPitchClass() {
        return PitchClassesProvider.retrieveInstance(this.root);

     }

     public findChordQuality() {
         return ChordQualitiesProvider.retrieveInstance(this.quality);
     }

}
