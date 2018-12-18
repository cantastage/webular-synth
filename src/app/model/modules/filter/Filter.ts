import { ISoundGenerator } from '../ISoundGenerator';
import { IFilter } from './IFilter';

export class Filter implements IFilter, ISoundGenerator {
  public static readonly FREQUENCY_MIN = 20;
  public static readonly FREQUENCY_DEFAULT = 5500;
  public static readonly FREQUENCY_MAX = 22000;
  public static readonly RESONANCE_MIN = 0.1;
  public static readonly RESONANCE_DEFAULT = 0.5;
  public static readonly RESONANCE_MAX = 10;

  private _frequency: number; // AudioParam?!?! number directly?!
  private _resonance: number;

  public get frequency(): number {
    return this._frequency;
  }
  public set frequency(value: number) {
    if (!Number.isInteger(value) || value < Filter.FREQUENCY_MIN || value > Filter.FREQUENCY_MAX) {
      throw new Error('error while assigning the frequency value');
    }
    this._frequency = value;
  }
  public get resonance(): number {
    return this._resonance;
  }
  public set resonance(value: number) {
    if (value < Filter.RESONANCE_MIN || value > Filter.RESONANCE_MAX) {
      throw new Error('error while assigning the resonance value');
    }
    this._resonance = value;
  }

  public FREQUENCY_MIN(): number {
    return Filter.FREQUENCY_MIN;
  }
  public FREQUENCY_DEFAULT(): number {
    return Filter.FREQUENCY_DEFAULT;
  }
  public FREQUENCY_MAX(): number {
    return Filter.FREQUENCY_MAX;
  }
  public RESONANCE_MIN(): number {
    return Filter.RESONANCE_MIN;
  }
  public RESONANCE_DEFAULT(): number {
    return Filter.RESONANCE_DEFAULT;
  }
  public RESONANCE_MAX(): number {
    return Filter.RESONANCE_MAX;
  }

  constructor(frequency: number, resonance: number) {
    this.frequency = frequency;
    this.resonance = resonance;
  }
}
