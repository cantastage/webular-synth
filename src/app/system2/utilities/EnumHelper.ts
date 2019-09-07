// WARNING PASS ONLY ENUM AS enumino!!!

export class EnumHelper {
    public static getKeys(enumino: any): string[] {
        const keys = new Array<string>();
        Object.keys(enumino).forEach(el => {
            if (isNaN(parseInt(el, 10))) { // only enum string identifiers
                keys.push(el);
            }
        });
        return keys;
    }
    public static getValues(enumino: any): number[] {
        const values = new Array<number>();
        this.getKeys(enumino).forEach(el => values.push(enumino[el]));
        return values;
    }

    public static getValueOfKey(enumino: any, key: string): number {
        const tmp = this.getKeys(enumino).indexOf(key);
        if (tmp < 0) {
            return undefined;
        }
        return this.getValues(enumino)[tmp];
    }
    public static getKeyOfValue(enumino: any, value: number): string {
        const tmp = this.getValues(enumino).indexOf(value);
        if (tmp < 0) {
            return undefined;
        }
        return this.getKeys(enumino)[tmp];
    }
}
