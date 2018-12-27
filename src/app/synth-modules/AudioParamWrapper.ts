import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class AudioParamDescriptor {
  private _name: string;
  private _minValue: number;
  private _defaultValue: number;
  private _maxValue: number;
  private _measurementUnit: string;

  public get name(): string {
    return this._name;
  }
  public get minValue(): number {
    return this._minValue;
  }
  public get defaultValue(): number {
    return this._defaultValue;
  }
  public get maxValue(): number {
    return this._maxValue;
  }
  public get measurementUnit(): string {
    return this._measurementUnit;
  }

  public constructor(name: string, minValue: number, defaultValue: number, maxValue: number, measurementUnit: string) {
    this._name = name;
    this._minValue = minValue;
    this._defaultValue = defaultValue;
    this._maxValue = maxValue;
    this._measurementUnit = measurementUnit;
  }
}

export class AudioParamWrapper {
  private _descriptor: AudioParamDescriptor;
  private _audioParameter: AudioParam;

  public get descriptor(): AudioParamDescriptor {
    return this._descriptor;
  }
  public get audioParameter(): AudioParam {
    return this._audioParameter;
  }

  public constructor(descriptor: AudioParamDescriptor, parameter: AudioParam) {
    this._descriptor = descriptor; // check...
    this._audioParameter = parameter;
  }
}

export class ModulableAudioParamWrapper extends AudioParamWrapper {
  private _preModulationCache: number;
  private _isModulated: boolean;

  public beginModulationConfig(): void {
    if (!this._isModulated) {
      this._isModulated = true;
      this._preModulationCache = this.audioParameter.value;
    }
  }
  public endModulationConfig(): void {
    if (this._isModulated) {
      this.audioParameter.value = this._preModulationCache;
      this._isModulated = false;
    }
  }
  public get value(): number {
    return this.audioParameter.value;
  }
  public set value(value: number) {
    if (!value || value < this.descriptor.minValue || value > this.descriptor.maxValue) {
      throw new Error('error while assigning the user value');
    }
    if (!this._isModulated) {
      this.audioParameter.value = value;
    } else {
      this._preModulationCache = value;
    }
  }

  constructor(descriptor: AudioParamDescriptor, parameter: AudioParam) {
    super(descriptor, parameter);
    this._preModulationCache = this.descriptor.defaultValue;
    this._isModulated = false;
  }
}

// export class PercentageAPWWrapper {
//   private _apw: AudioParamWrapper;
//   private _percentage: number;

//   public get audioParamWrapper(): AudioParamWrapper {
//     return this._apw;
//   }
//   public get percentage(): number {
//     return this._percentage;
//   }
//   public set percentage(value: number) {
//     if (!value || value < 0 || value > 1) {
//       throw new Error('error while assigning the percentage value');
//     }
//     this._percentage = value;
//     this.audioParamWrapper.audioParameter.value = this.audioParamWrapper.descriptor.maxValue * this.percentage;
//   }

//   constructor(apw: AudioParamWrapper) {
//     this._apw = apw;
//     this.percentage = 1;
//   }
// }
