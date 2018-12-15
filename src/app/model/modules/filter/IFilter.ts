export interface IFilter {
  frequency: number;
  resonance: number;
  FREQUENCY_MIN(): number;
  FREQUENCY_DEFAULT(): number;
  FREQUENCY_MAX(): number;
  RESONANCE_MIN(): number;
  RESONANCE_DEFAULT(): number;
  RESONANCE_MAX(): number;
}
