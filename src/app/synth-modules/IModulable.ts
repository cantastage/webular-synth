import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class ModulableParameter {
  private _name: string;
  private _audioParameter: AudioParam;
  private _uiValue: number;
  private _minUIValue: number; // for our purpose we "hide" the defaults of AudioParam
  private _maxUIValue: number;
  private _measurementUnit: string;

  public get name(): string {
    return this._name;
  }
  public get audioParameter(): AudioParam {
    return this._audioParameter;
  }
  public get uiValue(): number {
    return this._uiValue;
  }
  public set uiValue(uiValue: number) {
    if (!uiValue || uiValue < this.minUIValue || uiValue > this.maxUIValue) {
      throw new Error('error while assigning the user value');
    }
    this._uiValue = uiValue;
  }
  public get minUIValue(): number {
    return this._minUIValue;
  }
  public get maxUIValue(): number {
    return this._maxUIValue;
  }
  public get measurementUnit(): string {
    return this._measurementUnit;
  }

  public constructor(name: string, parameter: AudioParam, minValue: number, maxValue: number, measurementUnit: string) {
    this._name = name;
    this._audioParameter = parameter;
    this._uiValue = this.audioParameter.value;
    this._minUIValue = minValue;
    this._maxUIValue = maxValue;
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
    mp.uiValue = Number(newValue);
  }
}
