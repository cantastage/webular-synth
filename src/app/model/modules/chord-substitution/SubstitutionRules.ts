import { Chord } from 'src/app/synth-modules/chord-substitution/Chord';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';

// Substitution rules for maj7 chords:
// - every rule contains 2 chords of half value with respect to starting chord. If chord1 = chord2, the rule is 1:1
// - every rule is based on chord transitions: every chord is referred to C,
//   if the input chord is of a different key it will be transposed
// chord1: first half of the whole value
// chord2: second half of the whole value
// difficulty: arbitrary variable expressing the difficulty level of the substitution

class SubstitutionRules {
    public substitutions: Array<any>;
    public selected_table: any;
    /*
    public buildSubsitutionArray(): void {
        this.substitutions = [];
        this.substitutions.push(this.sub_maj);
        this.substitutions.push(this.sub_min);
        this.substitutions.push(this.sub_dim);
        this.substitutions.push(this.sub_aug);
        this.substitutions.push(this.sub_maj7);
        this.substitutions.push(this.sub_min7);
        this.substitutions.push(this.sub_halfDim7);
        this.substitutions.push(this.sub_aug7);
        this.substitutions.push(this.sub_min9);
        this.substitutions.push(this.sub_dim9);
        this.substitutions.push(this.sub_dim7);
        this.substitutions.push(this.sub_aug9);
        this.substitutions.push(this.sub_maj9);
        this.substitutions.push(this.sub_dom7);
        this.substitutions.push(this.sub_dom13);
    }
    */

    constructor() { }
}
// X MAJ7 Chord Substitution Rules

const sub_maj7: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 1},
    {'chord1': new Chord('C', 'min7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 2},
    {'chord1': new Chord('C', 'maj'), 'chord2': new Chord('C', 'maj'), 'difficulty': 1},
    {'chord1': new Chord('A', 'min7'), 'chord2': new Chord('A', 'min7'), 'difficulty': 1},
    {'chord1': new Chord('E', 'min7'), 'chord2': new Chord('E', 'min7'), 'difficulty': 1},
];
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

const sub_min: {chord1: Chord, chord2: Chord, difficulty: number}[] = [
    {'chord1': new Chord('A#', 'maj'), 'chord2': new Chord('A#', 'maj'), 'difficulty': 3},
    {'chord1': new Chord('F', 'dom7'), 'chord2': new Chord('F', 'dom7'), 'difficulty': 3},
    {'chord1': new Chord('C', 'min7'), 'chord2': new Chord('C', 'min7'), 'difficulty': 1},
    {'chord1': new Chord('A#', 'maj'), 'chord2': new Chord('C', 'min'), 'difficulty': 3},
    {'chord1': new Chord('C', 'dom7'), 'chord2': new Chord('C', 'min'), 'difficulty': 2},
    {'chord1': new Chord('G', 'min'), 'chord2': new Chord('C', 'dom7'), 'difficulty': 2},
];
const sub_min7: { }[] = [];
const sub_dim: { }[] = [];
const sub_aug: { }[] = [];
const sub_halfDim7: { }[] = [];
const sub_aug7: { }[] = [];
const sub_min9: { }[] = [];
const sub_dim9: { }[] = [];
const sub_dim7: { }[] = [];
const sub_aug9: { }[] = [];
const sub_maj9: { }[] = [];
const sub_dom7: { }[] = [];
const sub_dom13: { }[] = [];


// X MAJ Chord Substitution Rules

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


