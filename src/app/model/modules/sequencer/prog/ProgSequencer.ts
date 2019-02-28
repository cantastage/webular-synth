import { IProgSequencer } from './IProgSequencer';
import { Progression } from './Progression';

export class ProgSequencer implements IProgSequencer {
    private _difficulty: number;
    private _progression: Progression;

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

    public constructor(progression: Progression, difficulty: number) {
        this.progression = progression;
        this.difficulty = difficulty;
    }
}
