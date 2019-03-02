import { Progression } from './Progression';
import { Chord } from './Chord';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';

export const BasicProgressions: {name: string, progression: Progression}[] = [
    {
        name: 'Dmin7 - Amin7 - G7 - Cmaj7',
        progression:  new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Fmaj7 - Emin7 - Dmin7 - Cmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Emaj7 - Cmin7 - Fmin7 - Dmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    }

];



