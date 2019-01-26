import { sealed } from '../system2/utilities/ClassDecorators';

@sealed
export class AudioParameterDescriptor {
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

export interface IValuable {
  value: number;
}
export class Valuable implements IValuable {
  public constructor(public value: number) { }
}

export interface IAudioParameter<T extends AudioParam | IValuable> {
  readonly name: string;
  readonly llDescriptor: AudioParameterDescriptor;
  readonly audioParam: T;
  llValue: number; // indirection level 1 towards audioParam
}

export class AudioParameter<T extends AudioParam | IValuable> implements IAudioParameter<T> {
  private _name: string;
  private _llDescriptor: AudioParameterDescriptor;
  private _audioParam: T;

  public get name(): string {
    return this._name;
  }
  public get llDescriptor(): AudioParameterDescriptor {
    return this._llDescriptor;
  }
  public get audioParam(): T {
    return this._audioParam;
  }
  public get llValue(): number {
    return this.audioParam.value;
  }
  public set llValue(value: number) {
    if (value < this.llDescriptor.minValue || value > this.llDescriptor.maxValue) {
      throw new Error('error while assigning the user value');
    }
    this.audioParam.value = value;
  }

  public constructor(name: string, llDescriptor: AudioParameterDescriptor, audioParam: T) {
    this._name = name;
    this._llDescriptor = llDescriptor;
    this._audioParam = audioParam;

    this.llValue = this.llDescriptor.defaultValue;
  }
}

export interface IModulableAudioParameter extends IAudioParameter<AudioParam> {
  readonly isModulated: boolean;
  beginModulationConfig(): boolean;
  endModulationConfig(): boolean;
}

export class ModulableAudioParameter extends AudioParameter<AudioParam>
  implements IModulableAudioParameter {
  private _isModulated: boolean;

  public get isModulated(): boolean {
    return this._isModulated;
  }

  beginModulationConfig(): boolean {
    if (!this.isModulated) {
      this._isModulated = true;
      return true;
    }
    return false;
  }
  endModulationConfig(): boolean {
    if (this.isModulated) {
      this._isModulated = false;
      return true;
    }
    return false;
  }

  constructor(name: string, llDescriptor: AudioParameterDescriptor, audioParam: AudioParam) {
      super(name, llDescriptor, audioParam);
      this._isModulated = false;
  }
}

export interface IUIAudioParameter<T extends IAudioParameter<AudioParam | IValuable>> {
  readonly audioParameter: T;
  readonly hlDescriptor: AudioParameterDescriptor;
  hlValue: number; // indirection level 2 towards audioParam
}

export class UIAudioParameter<T extends IAudioParameter<AudioParam | IValuable>>
  implements IUIAudioParameter<T> {
  private _audioParameter: T;
  private _hlDescriptor: AudioParameterDescriptor;
  private _hlValue: number;

  public get audioParameter(): T {
    return this._audioParameter;
  }
  public get hlDescriptor(): AudioParameterDescriptor {
    return this._hlDescriptor;
  }
  private get transformationCoefficient(): number {
    return this.audioParameter.llDescriptor.maxValue / this.hlDescriptor.maxValue;
  }
  public get hlValue(): number {
    return this._hlValue;
  }
  public set hlValue(value: number) {
    if (value < this.hlDescriptor.minValue || value > this.hlDescriptor.maxValue) {
      throw new Error('error while assigning the user value');
    }
    this._hlValue = value;
    this.audioParameter.llValue = this.hlValue * this.transformationCoefficient;
  }

  public constructor(audioParameter: T, hlDescriptor: AudioParameterDescriptor) {
    this._audioParameter = audioParameter;
    this._hlDescriptor = hlDescriptor ? hlDescriptor : this.audioParameter.llDescriptor;

    this.hlValue = this.hlDescriptor.defaultValue;
  }
}
