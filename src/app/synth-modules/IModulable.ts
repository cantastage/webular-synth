import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class ModulableParameter {
  private _name: string;
  private _audioParameter: AudioParam;
  private _minValue: number;
  private _maxValue: number;
  private _measurementUnit: string;

  public get name() {
    return this._name;
  }
  public get audioParameter() {
    return this._audioParameter;
  }
  public get minValue(): number {
    return this._minValue;
  }
  public get maxValue(): number {
    return this._maxValue;
  }
  public get measurementUnit() {
    return this._measurementUnit;
  }

  constructor(name: string, parameter: AudioParam, minValue: number, maxValue: number, measurementUnit: string) {
    this._name = name;
    this._audioParameter = parameter;
    this._minValue = minValue;
    this._maxValue = maxValue;
    this._measurementUnit = measurementUnit;
  }
}

export interface IModulableComponent {
  innerNode(): AudioNode;
  modulableParameters(): ModulableParameter[];
  mpChange(mp: ModulableParameter, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract innerNode(): AudioNode;
  public abstract modulableParameters(): ModulableParameter[];
  public mpChange(mp: ModulableParameter, newValue: number): void {
    mp.audioParameter.value = Number(newValue);
  }
}
