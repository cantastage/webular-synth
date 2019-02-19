export enum ChordQualities {
    'maj' = 0,
    'min' = 1,
    'dim' = 2,
    'aug' = 3,
    'maj7' = 4,
    'min7' = 5,
    'halfDim7' = 6,
    'aug7' = 7,
    'min9' = 8,
    'dim9' = 9,
    'dim7' = 10,
    'aug9' = 11,
    'maj9' = 12,
    'dom7' = 13,
    'dom13' = 14
}

export interface IChordQuality {
    readonly chordQualityName: string;
    readonly chordQualityValue: number;
}
