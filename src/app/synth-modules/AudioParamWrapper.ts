import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class AudioParamDescriptor {
  private _minValue: number;
  private _defaultValue: number;
  private _maxValue: number;
  private _measurementUnit: string;

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

  public constructor(minValue: number, defaultValue: number, maxValue: number, measurementUnit: string) {
    this._minValue = minValue;
    this._defaultValue = defaultValue;
    this._maxValue = maxValue;
    this._measurementUnit = measurementUnit;
  }
}

export interface IAudioParameter {
  readonly name: string;
  readonly innerDescriptor: AudioParamDescriptor;
  readonly audioParam: AudioParam;
  value: number;
}

class AudioParameter implements IAudioParameter {
  private _name: string;
  private _innerDescriptor: AudioParamDescriptor;
  private _audioParam: AudioParam;

  public get name(): string {
    return this._name;
  }
  public get innerDescriptor(): AudioParamDescriptor {
    return this._innerDescriptor;
  }
  public get audioParam(): AudioParam {
    return this._audioParam;
  }
  public get value(): number {
    return this.audioParam.value;
  }
  public set value(value: number) {
    if (value < this.innerDescriptor.minValue || value > this.innerDescriptor.maxValue) {
      throw new Error('error while assigning the user value');
    }
    this.audioParam.value = value;
  }

  public constructor(name: string, innerDescriptor: AudioParamDescriptor, audioParam: AudioParam) {
    this._name = name;
    this._innerDescriptor = innerDescriptor; // check...
    this._audioParam = audioParam;
  }
}

export interface IUIAudioParameter extends IAudioParameter {
  readonly uiDescriptor: AudioParamDescriptor;
}

export class UIAudioParameter implements IUIAudioParameter {
  private _audioParameter: AudioParameter;
  private _uiDescriptor: AudioParamDescriptor;
  private _transformation: number;

  public get uiDescriptor(): AudioParamDescriptor {
    return this._uiDescriptor;
  }
  public get name(): string {
    return this._audioParameter.name;
  }
  public get innerDescriptor(): AudioParamDescriptor {
    return this._audioParameter.innerDescriptor;
  }
  public get audioParam(): AudioParam {
    return this._audioParameter.audioParam;
  }
  public get value(): number {
    return Math.round(this._audioParameter.value / this._transformation);
  }
  public set value(value: number) {
    if (value < this.uiDescriptor.minValue || value > this.uiDescriptor.maxValue) {
      throw new Error('error while assigning the user value');
    }
    this._audioParameter.value = value * this._transformation;
  }

  public constructor(name: string, innerDescriptor: AudioParamDescriptor, audioParam: AudioParam,
    uiDescriptor: AudioParamDescriptor) {
    this._audioParameter = new AudioParameter(name, innerDescriptor, audioParam);
    this._uiDescriptor = uiDescriptor ? uiDescriptor : this._audioParameter.innerDescriptor;

    this._transformation = this._audioParameter.innerDescriptor.maxValue / this.uiDescriptor.maxValue;
    this.value = this.uiDescriptor.defaultValue;
  }
}

export class ModulableUIAudioParameter implements IUIAudioParameter {
  private _uiAudioParameter: UIAudioParameter;
  private _preModulationCache: number;
  private _isModulated: boolean;

  public get isModulated(): boolean {
    return this._isModulated;
  }

  public get uiDescriptor(): AudioParamDescriptor {
    return this._uiAudioParameter.uiDescriptor;
  }
  public get name(): string {
    return this._uiAudioParameter.name;
  }
  public get innerDescriptor(): AudioParamDescriptor {
    return this._uiAudioParameter.innerDescriptor;
  }
  public get audioParam(): AudioParam {
    return this._uiAudioParameter.audioParam;
  }

  public get value(): number {
    return this._uiAudioParameter.value;
  }
  public set value(value: number) {
    if (value < this._uiAudioParameter.uiDescriptor.minValue ||
      value > this._uiAudioParameter.uiDescriptor.maxValue) {
      throw new Error('error while assigning the user value');
    }
    if (!this._isModulated) {
      this._uiAudioParameter.value = value;
    } else {
      this._preModulationCache = value;
    }
  }

  public beginModulationConfig(): void {
    if (!this._isModulated) {
      this._isModulated = true;
      this._preModulationCache = this._uiAudioParameter.value;
    }
  }
  public endModulationConfig(): void {
    if (this._isModulated) {
      this._uiAudioParameter.value = this._preModulationCache;
      this._isModulated = false;
    }
  }

  constructor(name: string, innerDescriptor: AudioParamDescriptor, audioParam: AudioParam,
    uiDescriptor: AudioParamDescriptor) {
    this._uiAudioParameter = new UIAudioParameter(name, innerDescriptor, audioParam, uiDescriptor);
    this._preModulationCache = this._uiAudioParameter.uiDescriptor.defaultValue;
    this._isModulated = false;
    this.value = this.uiDescriptor.defaultValue;
  }
}
