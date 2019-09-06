import { Progression } from '../Progression';
import { Chord } from '../Chord';
import { PitchClassesProvider } from 'src/app/model/modules/sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';

export const BasicProgressions: {name: string, progression: Progression}[] = [
    {
        name: 'Dm7 - Am7 - G7 - Cmaj7',
        progression:  new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    },
    {
        name: 'Fmaj7 - Em7 - Dm7 - Cmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    },
    {
        name: 'Emaj7 - Cm7 - Fm7 - Dmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    },
    {
        name: 'Cmaj7 - Dm7 - G7 - Cmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    },
    {
        name: 'Cmaj7 - Am7 - Dm7 - G7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7'))
        ])
    },
    {
        name: 'Cm7 - Fm7 - D° - G7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('dim')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7'))
        ])
    },
    {
        name: 'Dm - G - Bb7 - Eb',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj'))
        ])
    },
    {
        name: 'Dm7 - B° - E7 - A7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('B'), ChordQualitiesProvider.retrieveInstanceByName('dim')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('dom7'))
        ])
    },
    {
        name: 'Fm7 - Bbm7 - Eb7 - Abmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Ab'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    },
    {
        name: 'Ebmaj7 - Ab7 - Db7 - Eb7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Ab'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('dom7'))
        ])
    },
    {
        name: 'Emaj7 - Cmin7 - Fmin7 - Dmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    },
    {
        name: 'Bbmaj7 - Cmin7 - Db° - Cm7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('dim7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7'))
        ])
    },
    {
        name: 'Dm7 - Db° - Cm7 - F7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('dim7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7'))
        ])
    },
    {
        name: 'Cmaj7 - Eb° - Dm7 - G7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('dim')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7'))
        ])
    },
    {
        name: 'Dbmaj7 - Ebm9 - Amaj7 - Dbmaj7',
        progression: new Progression([
            new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
            new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('maj7'))
        ])
    }

];



