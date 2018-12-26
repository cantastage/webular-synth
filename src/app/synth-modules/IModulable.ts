import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class ParameterDescriptor {
  private _name: string;
  private _minUIValue: number; // for our purpose we "hide" the defaults of AudioParam
  private _maxUIValue: number;
  private _measurementUnit: string;

  public get name(): string {
    return this._name;
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

  public constructor(name: string, minUIValue: number, maxUIValue: number, measurementUnit: string) {
    this._name = name;
    this._minUIValue = minUIValue;
    this._maxUIValue = maxUIValue;
    this._measurementUnit = measurementUnit;
  }
}

@sealed
export class AudioParameter2 {
  private _parameterDescriptor: ParameterDescriptor;
  private _audioParameter: AudioParam;
  private _uiValue: number;

  public get parameterDescriptor(): ParameterDescriptor {
    return this._parameterDescriptor;
  }
  public get audioParameter(): AudioParam {
    return this._audioParameter;
  }
  public get uiValue(): number {
    return this._uiValue;
  }
  public set uiValue(uiValue: number) {
    if (!uiValue || uiValue < this.parameterDescriptor.minUIValue || uiValue > this.parameterDescriptor.maxUIValue) {
      throw new Error('error while assigning the user value');
    }
    this._uiValue = uiValue;
  }

  public constructor(parameterDescriptor: ParameterDescriptor, parameter: AudioParam) {
    this._parameterDescriptor = parameterDescriptor; // check...
    this._audioParameter = parameter;
    this._uiValue = this.audioParameter.value;
  }
}

export interface IModulableComponent {
  innerNode(): AudioNode;
  modulableParameters(): AudioParameter2[];
  mpChange(mp: AudioParameter2, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract innerNode(): AudioNode;
  public abstract modulableParameters(): AudioParameter2[];
  public mpChange(mp: AudioParameter2, newValue: number): void {
    mp.uiValue = Number(newValue);

    // THE FOLLOWING SHOULD BE DONE ONLY IF NOT UNDER MODULATION:
    mp.audioParameter.value = Number(newValue);
  }
}
