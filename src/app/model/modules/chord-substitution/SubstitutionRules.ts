import { Chord } from 'src/app/model/modules/sequencer/Chord';
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
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
    'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
    'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
    'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
    'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
    'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
    'difficulty': 1},
];
// X MAJ Chord Substitution Rules
const sub_maj: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('D'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
];
// X MIN Chord Substitution Rules
const sub_min: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
];
// X MIN7 Chord Substitution Rules
const sub_min7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Gb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Gb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
];
// X DIM Chord Substitution Rules   ---> no rules
const sub_dim: {chord1: Chord, chord2: Chord, difficulty: number}[] = [

];
// X AUG Chord Substitution Rules   ---> no rules
const sub_aug: {chord1: Chord, chord2: Chord, difficulty: number}[] = [

];
// X HalfDIM Chord Substitution Rules
const sub_halfDim7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Gb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Ab'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
];
// X AUG7 Chord Substitution Rules
const sub_aug7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
];
// X MIN9 Chord Substitution Rules
const sub_min9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj9')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('maj9')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'difficulty': 1},
];
// X DIM9 Chord Substitution Rules
const sub_dim9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
];
// X DIM7 Chord Substitution Rules
const sub_dim7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('B'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('B'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dim7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dim7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Gb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Gb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Ab'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('B'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 3},
];
// X AUG9 Chord Substitution Rules
const sub_aug9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('E'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('A'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Db'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Ab'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 3},
];
// X DOM9 Chord Substitution Rules
const sub_dom9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 3},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('min')),
    'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('Bb'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('Eb'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 3},
];
// X DOM7 Chord Substitution Rules
const sub_dom7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('maj')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('F'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 2},
];
// X DOM13 Chord Substitution Rules
const sub_dom13: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('G'), ChordQualitiesProvider.retrieveInstanceByName('min7')),
     'difficulty': 2},
    {'chord1': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'chord2': new Chord(PitchClassesProvider.retrieveInstanceByName('C'), ChordQualitiesProvider.retrieveInstanceByName('dom7')),
     'difficulty': 1},

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
    'sub_dom9',
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
    sub_dom9,
    sub_dom7,
    sub_dom13
];


