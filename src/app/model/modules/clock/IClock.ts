export interface IClock {
  bpm: number;
  readonly bms: number;
  readonly minValue: number;
  readonly defaultValue: number;
  readonly maxValue: number;
}
