import { ModulableParameter, ISoundGenerator } from '../ISoundGenerator';
import { IFilter } from './IFilter';

export class Filter implements IFilter, ISoundGenerator {
  public static readonly FREQUENCY_MIN = 20;
  public static readonly FREQUENCY_DEFAULT = 5500;
  public static readonly FREQUENCY_MAX = 22000;
  public static readonly RESONANCE_MIN = 0.1;
  public static readonly RESONANCE_DEFAULT = 0.5;
  public static readonly RESONANCE_MAX = 10;

  private _frequency: ModulableParameter;
  private _resonance: ModulableParameter;

  public get frequency(): number {
    return this._frequency.value;
  }
  public set frequency(value: number) {
    if (!this._frequency) {
      this._frequency = new ModulableParameter(value,
        (arg: number) => Number.isInteger(arg) && arg >= Filter.FREQUENCY_MIN && arg <= Filter.FREQUENCY_MAX);
    } else {
      this._frequency.value = value;
    }
  }
  public get resonance(): number {
    return this._resonance.value;
  }
  public set resonance(value: number) {
    if (!this._resonance) {
      this._resonance = new ModulableParameter(value,
        (arg: number) => arg >= Filter.RESONANCE_MIN && arg <= Filter.RESONANCE_MAX);
    } else {
      this._resonance.value = value;
    }
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
