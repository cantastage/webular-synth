import { OctaveNote } from './OctaveNote';

export class Subdivision {
    public static readonly NOTE_COUNT = 8;

    public static readonly DURATION_MIN = 0;
    public static readonly DURATION_MAX = 1;

    public static readonly VELOCITY_MIN = 0;
    public static readonly VELOCITY_MAX = 127;

    private _notes: OctaveNote[];
    private _duration: number;
    private _velocity: number;

    public get notes(): OctaveNote[] {
        return this._notes;
    }
    public set notes(notes: OctaveNote[]) {
        if (notes == null || notes.length !== Subdivision.NOTE_COUNT) {
            throw new Error('error while assigning the notes values');
        }
        this._notes = notes;
    }
    public get duration(): number {
        return this._duration;
    }
    public set duration(duration: number) {
        if (duration < Subdivision.DURATION_MIN || duration > Subdivision.DURATION_MAX) {
            throw new Error('error while assigning the duration value');
        }
        this._duration = duration;
    }
    public get velocity(): number {
        return this._velocity;
    }
    public set velocity(velocity: number) {
        if (!Number.isInteger(Number(velocity)) || velocity < Subdivision.VELOCITY_MIN || velocity > Subdivision.VELOCITY_MAX) {
            throw new Error('error while assigning the velocity value');
        }
        this._velocity = velocity;
    }

    public constructor(notes: OctaveNote[], duration: number, velocity: number) {
        this.notes = notes;
        this.duration = duration;
        this.velocity = velocity;
    }
}
