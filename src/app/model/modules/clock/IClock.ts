export interface IClock {
  bpm: number;
  BEATS_MIN(): number;
  BEATS_DEFAULT(): number;
  BEATS_MAX(): number;
}
