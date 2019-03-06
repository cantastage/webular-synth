import { Chord } from 'src/app/model/modules/sequencer/prog/Chord';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';
import { PitchClassesProvider } from '../sequencer/PitchClassesProvider';
import { ChordQualitiesProvider } from './ChordQualitiesProvider';
/*
*  Substitution rules for maj7 chords:
*  - every rule contains 2 chords of half value with respect to starting chord. If chord1 = chord2, the rule is 1:1
*  - every rule is based on chord transitions: every chord is referred to C,
*    if the input chord is of a different key it will be transposed
*  chord1: first half of the whole value
*  chord2: second half of the whole value
*  difficulty: arbitrary variable expressing the difficulty level of the substitution
*/
// X MAJ7 Chord Substitution Rules
const sub_maj7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 1},
];
// X MAJ Chord Substitution Rules
const sub_maj: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
];
// X MIN Chord Substitution Rules
const sub_min: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
];
// X MIN7 Chord Substitution Rules
const sub_min7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Gb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Gb'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
];
// X DIM Chord Substitution Rules   ---> no rules
const sub_dim: {chord1: Chord, chord2: Chord, difficulty: number}[] = [

];
// X AUG Chord Substitution Rules   ---> no rules
const sub_aug: {chord1: Chord, chord2: Chord, difficulty: number}[] = [

];
// X HalfDIM Chord Substitution Rules
const sub_halfDim7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Gb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
];
// X AUG7 Chord Substitution Rules
const sub_aug7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
];
// X MIN9 Chord Substitution Rules
const sub_min9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj9')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj9')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 1},
];
// X DIM9 Chord Substitution Rules
const sub_dim9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
];
// X DIM7 Chord Substitution Rules
const sub_dim7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('B'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('B'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dim7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dim7')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Gb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Gb'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('B'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
];
// X AUG9 Chord Substitution Rules
const sub_aug9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('E'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Db'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Ab'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
];
// X MAJ9 Chord Substitution Rules
const sub_maj9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('Bb'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('Eb'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 3},
];
// X DOM7 Chord Substitution Rules
const sub_dom7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('maj')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('F'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 2},
];
// X DOM13 Chord Substitution Rules
const sub_dom13: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('min7')), 'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('dom7')), 'difficulty': 1},

];

export enum sub_tables {
    'sub_maj',
    'sub_min',
    'sub_dim',
    'sub_aug',
    'sub_maj7',
    'sub_min7',
    'sub_halfDim7',
    'sub_aug7',
    'sub_min9',
    'sub_dim9',
    'sub_dim7',
    'sub_aug9',
    'sub_maj9',
    'sub_dom7',
    'sub_dom13'
}


export const substitutionRulesets: Array<any>[] = [
    sub_maj,
    sub_min,
    sub_dim,
    sub_aug,
    sub_maj7,
    sub_min7,
    sub_halfDim7,
    sub_aug7,
    sub_min9,
    sub_dim9,
    sub_dim7,
    sub_aug9,
    sub_maj9,
    sub_dom7,
    sub_dom13
];


