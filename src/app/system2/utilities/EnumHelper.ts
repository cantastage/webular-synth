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
        return this.getValues(enumino)[this.getKeys(enumino).indexOf(key)];
    }
    public static getKeyOfValue(enumino: any, value: number): string {
        return this.getKeys(enumino)[this.getValues(enumino).indexOf(value)];
    }
}
