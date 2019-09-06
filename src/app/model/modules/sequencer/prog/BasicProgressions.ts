import { Progression } from './Progression';
import { Chord } from './Chord';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';

export const BasicProgressions: {name: string, progression: Progression}[] = [
    {
        name: 'Dm7 - Am7 - G7 - Cmaj7',
        progression:  new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Fmaj7 - Em7 - Dm7 - Cmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Emaj7 - Cm7 - Fm7 - Dmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Cmaj7 - Dm7 - G7 - Cmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Cmaj7 - Am7 - Dm7 - G7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7'))
        ])
    },
    {
        name: 'Cm7 - Fm7 - D° - G7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('dim')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7'))
        ])
    },
    {
        name: 'Dm - G - Bb7 - Eb',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('maj')),
            new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj'))
        ])
    },
    {
        name: 'Dm7 - B° - E7 - A7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('B'), ChordQualitiesProvider.retrieveInstance('dim')),
            new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('dom7'))
        ])
    },
    {
        name: 'Fm7 - Bbm7 - Eb7 - Abmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    },
    {
        name: 'Ebmaj7 - Ab7 - Db7 - Eb7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('dom7')),
            new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('dom7'))
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
    },
    {
        name: 'Bbmaj7 - Cmin7 - Db° - Cm7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('dim7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7'))
        ])
    },
    {
        name: 'Dm7 - Db° - Cm7 - F7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('dim7')),
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7'))
        ])
    },
    {
        name: 'Cmaj7 - Eb° - Dm7 - G7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('dim')),
            new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7'))
        ])
    },
    {
        name: 'Dbmaj7 - Ebm9 - Amaj7 - Dbmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('min7')),
            new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('maj7')),
            new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('maj7'))
        ])
    }

];



