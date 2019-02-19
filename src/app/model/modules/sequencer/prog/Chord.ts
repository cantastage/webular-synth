import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { IPitchClass } from 'src/app/model/modules/sequencer/IPitchClass';
import { IChordQuality } from 'src/app/model/modules/chord-substitution/IChordQualities';
import { Scale } from 'src/app/model/modules/sequencer/Scale';
import { IChordNote } from './IChordNote';

/**
 * Root is played on the 4th octave, extensions on the 5th
 *
 */
export class Chord {
    private _root: IPitchClass;
    private _quality: IChordQuality;

    // cache field depending on private ones
    private _chromaticScale: Scale;
    private _chordNotes: IChordNote[];

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
    public get chordNotes(): IChordNote[] {
        return this._chordNotes;
    }

    constructor(root: IPitchClass, quality: IChordQuality) {
        this.root = root;
        this.quality = quality;
    }

    private updateCache(): void {
        throw new Error('NOT IMPLEMENTED YET');
    }
}
