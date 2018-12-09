export const A4 = 440;
export const SD = (2 ** (1 / 12));

export enum ReferralNotes {
    A = A4,
    Bb = A * (SD ** 1),
    B = A * (SD ** 2),
    C = A * (SD ** (-9)),
    Db = A * (SD ** (-8)),
    D = A * (SD ** (-7)),
    Eb = A * (SD ** (-6)),
    E = A * (SD ** (-5)),
    F = A * (SD ** (-4)),
    Gb = A * (SD ** (-3)),
    G = A * (SD ** (-2)),
    Ab = A * (SD ** (-1)),
}
