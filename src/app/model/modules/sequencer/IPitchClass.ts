export const A4 = 440;
export const SD = (2 ** (1 / 12));

export enum NoteNames {
    C = 0,
    Db = 1,
    D = 2,
    Eb = 3,
    E = 4,
    F = 5,
    Gb = 6,
    G = 7,
    Ab = 8,
    A = 9,
    Bb = 10,
    B = 11
}

export enum EnharmonicNames {
    'nd' = -1,
    'B#' = 0, // EnharmonicName of the i-th corresponding NoteName
    'C#' = 1,
    'D#' = 3,
    'Fb' = 4,
    'E#' = 5,
    'F#' = 6,
    'G#' = 8,
    'A#' = 10,
    'Cb' = 11
}

export interface IPitchClass {
    readonly pitchClassName: string;
    readonly enharmonicName: string;
    readonly referralFrequency: number;
}
