import { IProgSequencer } from './IProgSequencer';
import { Progression } from '../Progression';

export class ProgSequencer implements IProgSequencer {
    private _difficulty: number;
    private _progression: Progression;
    private _channel: number;

    public get difficulty(): number {
        return this._difficulty;
    }
    public set difficulty(difficulty: number) {
        if (difficulty === undefined || difficulty < 1 || difficulty > 3) {
            throw new Error('error while assigning the difficulty value');
        }
        this._difficulty = difficulty;
    }
    public get progression(): Progression {
        return this._progression;
    }
    public set progression(progression: Progression) {
        if (progression === undefined) {
            throw new Error('error while assigning the progression value');
        }
        this._progression = progression;
    }
    public get channel(): number {
        return this._channel;
    }
    public set channel(channel: number) {
        if (channel === undefined || !Number.isInteger(channel) ||
            channel < 1 || channel > 16) {
            throw Error('error while assigning the channel value');
        }
        this._channel = channel;
    }

    public constructor(progression: Progression, difficulty: number, channel: number) {
        this.progression = progression;
        this.difficulty = difficulty;
        this.channel = channel;
    }
}
