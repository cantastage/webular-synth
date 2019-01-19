import { ModulableUIAudioParameter } from './AudioParamWrapper';

export interface IModulableComponent {
  readonly innerNode: AudioNode;
  readonly modulableParameters: ModulableUIAudioParameter[];
  mpChange(mp: ModulableUIAudioParameter, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract readonly innerNode: AudioNode;
  public abstract readonly modulableParameters: ModulableUIAudioParameter[];
  public mpChange(mp: ModulableUIAudioParameter, newValue: number): void {
    mp.value = Number(newValue);
  }
}
