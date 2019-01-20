import { IUIAudioParameter, ModulableAudioParameter } from './Modulation';


export interface IModulableComponent {
  readonly innerNode: AudioNode;
  readonly modulableParameters: IUIAudioParameter<ModulableAudioParameter>[];
  mpChange(mp: IUIAudioParameter<ModulableAudioParameter>, newValue: number): void;
}

export abstract class ModulableComponent implements IModulableComponent {
  public abstract readonly innerNode: AudioNode;
  public abstract readonly modulableParameters: IUIAudioParameter<ModulableAudioParameter>[];
  public mpChange(mp: IUIAudioParameter<ModulableAudioParameter>, newValue: number): void {
    mp.hlValue = Number(newValue);
  }
}
