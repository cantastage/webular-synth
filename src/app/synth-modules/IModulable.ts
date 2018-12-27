import { sealed } from '../system2/utilities/ClassDecorators';

// @sealed
// export class UIParameter {
//   private _minValue: number;
//   private _defaultValue: number;
//   private _maxValue: number;
//   private _valueToUIValueFactor: number;

//   public get minValue(): number {
//     return this._minValue;
//   }
//   public get defaultValue(): number {
//     return this._defaultValue;
//   }
//   public get maxValue(): number {
//     return this._maxValue;
//   }
//   public get valueToUIValueFactor(): number {
//     return this._valueToUIValueFactor;
//   }
//   public get minUIValue(): number { // 2DO
//     return this._minValue;
//   }
//   public get defaultUIValue(): number { // 2DO
//     return this._defaultValue;
//   }
//   public get maxUIValue(): number { // 2DO
//     return this._maxValue;
//   }

//   constructor(minValue: number, defaultValue: number, maxValue: number, valueToUIValueFactor: number) {
//     this._minValue = minValue;
//     this._defaultValue = defaultValue;
//     this._maxValue = maxValue;
//     this._valueToUIValueFactor = valueToUIValueFactor;
//   }
// }

@sealed
export class UIParameterDescriptor {
  private _name: string;
  private _minUIValue: number; // for our purpose we "hide" the defaults of AudioParam
  private _defaultUIValue: number;
  private _maxUIValue: number;
  private _measurementUnit: string;

  public get name(): string {
    return this._name;
  }
  public get minUIValue(): number {
    return this._minUIValue;
  }
  public get defaultUIValue(): number {
    return this._defaultUIValue;
  }
  public get maxUIValue(): number {
    return this._maxUIValue;
  }
  public get measurementUnit(): string {
    return this._measurementUnit;
  }

  public constructor(name: string, minUIValue: number, defaultUIValue: number, maxUIValue: number, measurementUnit: string) {
    this._name = name;
    this._minUIValue = minUIValue;
    this._defaultUIValue = defaultUIValue;
    this._maxUIValue = maxUIValue;
    this._measurementUnit = measurementUnit;
  }
}

@sealed
export class AudioParameter2 {
  private _uiDescriptor: UIParameterDescriptor;
  private _audioParameter: AudioParam;
  private _uiValue: number;

  public get uiDescriptor(): UIParameterDescriptor {
    return this._uiDescriptor;
  }
  public get audioParameter(): AudioParam {
    return this._audioParameter;
  }
  public get uiValue(): number {
    return this._uiValue;
  }
  public set uiValue(uiValue: number) {
    if (!uiValue || uiValue < this.uiDescriptor.minUIValue || uiValue > this.uiDescriptor.maxUIValue) {
      throw new Error('error while assigning the user value');
    }
    this._uiValue = uiValue;
  }

  public constructor(uiDescriptor: UIParameterDescriptor, parameter: AudioParam) {
    this._uiDescriptor = uiDescriptor; // check...
    this._audioParameter = parameter;
    this.uiValue = this.uiDescriptor.defaultUIValue;
    // uncoupled!
    this.audioParameter.value = this.uiValue;
  }
}

export interface IModulableComponent {
  readonly innerNode: AudioNode;
  readonly modulableParameters: AudioParameter2[];
  mpChange(mp: AudioParameter2, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract readonly innerNode: AudioNode;
  public abstract readonly modulableParameters: AudioParameter2[];
  public mpChange(mp: AudioParameter2, newValue: number): void {
    mp.uiValue = Number(newValue);

    // THE FOLLOWING SHOULD BE DONE ONLY IF NOT UNDER MODULATION:
    mp.audioParameter.value = mp.uiValue;
  }
}
