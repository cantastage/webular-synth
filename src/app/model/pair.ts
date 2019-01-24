/**
 * Represents a data structure with two generic types
 */
export class Pair<X, Y> {
    constructor(x: X, y: Y) {
        this._x = x;
        this._y = y;
    }

    private _x: X;
    private _y: Y;

    get x(): X {
        return this._x;
    }

    get y(): Y {
        return this._y;
    }
}
