/*
*
* The enum provides chord types allowed in the chord substitution application. The binary value provides
* the notes in the chromatic scales by assigning 1 to the notes present in the chord, from root (most significant
* bit), to the 13th (least significant bit).
*
*/

export enum ChordQualities {
    'maj' = 0b100010010000000000,
    'min' = 0b100100010000000000,
    'dim' = 0b100100100000000000,
    'aug' = 0b100010001000000000,
    'maj7' = 0b100010010001000000,
    'min7' = 0b100100010010000000,
    'halfDim7' = 0b100100100010000000,
    'aug7' = 0b100010001010000000,
    'min9' = 0b100100000010001000,
    'dim9' = 0b100100100000001000,
    'dim7' = 0b100100100100000000,
    'aug9' = 0b100010001000001000,
    'maj9' = 0b100010000001001000,
    'dom7' = 0b100010010010000000,
    'dom13' = 0b100010000010000001
}

export interface IChordQuality {
    readonly name: string;
    readonly value: number;
}
