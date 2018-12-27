import { ModulableAudioParamWrapper } from './AudioParamWrapper';

export interface IModulableComponent {
  readonly innerNode: AudioNode;
  readonly modulableParameters: ModulableAudioParamWrapper[];
  mpChange(mp: ModulableAudioParamWrapper, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract readonly innerNode: AudioNode;
  public abstract readonly modulableParameters: ModulableAudioParamWrapper[];
  public mpChange(mp: ModulableAudioParamWrapper, newValue: number): void {
    mp.value = Number(newValue);
  }
}
