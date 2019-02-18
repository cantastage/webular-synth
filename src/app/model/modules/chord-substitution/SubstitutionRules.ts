import { Chord } from 'src/app/synth-modules/chord-substitution/Chord';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';

// Substitution rules for maj7 chords:
// - every rule contains 2 chords of half value with respect to starting chord. If chord1 = chord2, the rule is 1:1
// - every rule is based on chord transitions: every chord is referred to C,
//   if the input chord is of a different key it will be transposed
// chord1: first half of the whole value
// chord2: second half of the whole value
// difficulty: arbitrary variable expressing the difficulty level of the substitution

// X MAJ7 Chord Substitution Rules
const sub_maj7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('C', 'min7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'maj'), 'chord2': new Chord('C', 'maj'), 'difficulty': 1},
    {'chord1': new Chord('A', 'min7'), 'chord2': new Chord('A', 'min7'), 'difficulty': 1},
    {'chord1': new Chord('E', 'min7'), 'chord2': new Chord('E', 'min7'), 'difficulty': 1},
];
// X MAJ Chord Substitution Rules
const sub_maj: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('C', 'min'), 'chord2': new Chord('C', 'min'), 'difficulty': 2},
    {'chord1': new Chord('G', 'dom7'), 'chord2': new Chord('G', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('A', 'min'), 'chord2': new Chord('A', 'min'), 'difficulty': 1},
    {'chord1': new Chord('E', 'min'), 'chord2': new Chord('E', 'min'), 'difficulty': 1},
    {'chord1': new Chord('G', 'dom7'), 'chord2': new Chord('C', 'maj'), 'difficulty': 1},
    {'chord1': new Chord('C', 'maj'), 'chord2': new Chord('C', 'maj'), 'difficulty': 1},
    {'chord1': new Chord('D', 'min'), 'chord2': new Chord('G', 'dom7'), 'difficulty': 2},
];
// X MIN Chord Substitution Rules
const sub_min: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('A#', 'maj'), 'chord2': new Chord('A#', 'maj'), 'difficulty': 3},
    {'chord1': new Chord('F', 'dom7'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 3},
    {'chord1': new Chord('C', 'min7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 1},
    {'chord1': new Chord('A#', 'maj'), 'chord2': new Chord('C', 'min'), 'difficulty': 3},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'min'), 'difficulty': 2},
    {'chord1': new Chord('G', 'min'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 2},
];
// X MIN7 Chord Substitution Rules
const sub_min7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('F#', 'dom7'), 'chord2': new Chord('F#', 'dom7'), 'difficulty': 3},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'min'), 'chord2': new Chord('C', 'min'), 'difficulty': 1},
    {'chord1': new Chord('Eb', 'maj7'), 'chord2': new Chord('Eb', 'maj7'), 'difficulty': 1},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 2},
    {'chord1': new Chord('F', 'maj'), 'chord2': new Chord('C', 'min'), 'difficulty': 2},
    {'chord1': new Chord('G', 'min'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 2},
];
// X DIM Chord Substitution Rules   ---> no rules
const sub_dim: {chord1: Chord, chord2: Chord, difficulty: number}[] = [

];
// X AUG Chord Substitution Rules   ---> no rules
const sub_aug: {chord1: Chord, chord2: Chord, difficulty: number}[] = [

];
// X HalfDIM Chord Substitution Rules
const sub_halfDim7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('F', 'dom7'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'min'), 'chord2': new Chord('C', 'min'), 'difficulty': 1},
    {'chord1': new Chord('C', 'min7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 1},
    {'chord1': new Chord('F#', 'dom7'), 'chord2': new Chord('G#', 'maj'), 'difficulty': 3},
    {'chord1': new Chord('C#', 'maj'), 'chord2': new Chord('C', 'min'), 'difficulty': 3},
    {'chord1': new Chord('C#', 'maj'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 3},
];
// X AUG7 Chord Substitution Rules
const sub_aug7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('F', 'dom7'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('G', 'min'), 'chord2': new Chord('G', 'min'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
];
// X MIN9 Chord Substitution Rules
const sub_min9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('C', 'maj9'), 'chord2': new Chord('C', 'maj9'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'min7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 1},
];
// X DIM9 Chord Substitution Rules
const sub_dim9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('D#', 'maj'), 'chord2': new Chord('D#', 'maj'), 'difficulty': 3},
    {'chord1': new Chord('F', 'min'), 'chord2': new Chord('F', 'min'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
];
// X DIM7 Chord Substitution Rules
const sub_dim7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('B', 'dom7'), 'chord2': new Chord('B', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('A#', 'dim7'), 'chord2': new Chord('A#', 'dim7'), 'difficulty': 3},
    {'chord1': new Chord('F#', 'dom7'), 'chord2': new Chord('F#', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('G#', 'dom7'), 'chord2': new Chord('C#', 'min'), 'difficulty': 3},
    {'chord1': new Chord('E', 'dom7'), 'chord2': new Chord('E', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('B', 'min'), 'chord2': new Chord('E', 'dom7'), 'difficulty': 3},
];
// X AUG9 Chord Substitution Rules
const sub_aug9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('F', 'min7'), 'chord2': new Chord('F', 'min7'), 'difficulty': 1},
    {'chord1': new Chord('Bb', 'dom7'), 'chord2': new Chord('Bb', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('E', 'min'), 'chord2': new Chord('A', 'dom7'), 'difficulty': 3},
    {'chord1': new Chord('C#', 'maj'), 'chord2': new Chord('C#', 'maj'), 'difficulty': 2},
    {'chord1': new Chord('D#', 'min'), 'chord2': new Chord('G#', 'dom7'), 'difficulty': 3},
];
// X MAJ9 Chord Substitution Rules
const sub_maj9: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('Bb', 'dom7'), 'chord2': new Chord('Bb', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('F', 'min'), 'chord2': new Chord('F', 'min'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('A#', 'dom7'), 'chord2': new Chord('D#', 'dom7'), 'difficulty': 3},
    {'chord1': new Chord('A#', 'dom7'), 'chord2': new Chord('D#', 'maj'), 'difficulty': 3},
];
// X DOM7 Chord Substitution Rules
const sub_dom7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('G', 'dom7'), 'chord2': new Chord('G', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('F', 'dom7'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 2},
    {'chord1': new Chord('G', 'min'), 'chord2': new Chord('G', 'min'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('F', 'maj'), 'difficulty': 2},
    {'chord1': new Chord('G', 'min'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 2},
];
// X DOM13 Chord Substitution Rules
const sub_dom13: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('G', 'min7'), 'chord2': new Chord('G', 'min7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},

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


