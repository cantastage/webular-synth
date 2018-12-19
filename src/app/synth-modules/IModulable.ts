import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class ModulableParameter {
  private _name: string;
  private _parameter: AudioParam;
  private _measurementUnit: string;

  public get name() {
    return this._name;
  }
  public get parameter() {
    return this._parameter;
  }
  public get measurementUnit() {
    return this._measurementUnit;
  }

  constructor(name: string, parameter: AudioParam, measurementUnit: string) {
    this._name = name;
    this._parameter = parameter;
    this._measurementUnit = measurementUnit;
  }
}

export interface IModulableComponent {
  modulableParameters(): ModulableParameter[];
  mpChange(mp: ModulableParameter, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract modulableParameters(): ModulableParameter[];
  public mpChange(mp: ModulableParameter, newValue: number): void {
    mp.parameter.value = Number(newValue);
  }
}
