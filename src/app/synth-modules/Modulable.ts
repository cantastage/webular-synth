import { ModulableAudioParameter, IUIAudioParameter } from './Modulation';


export interface IModulableComponent {
  readonly innerNode: AudioNode;
  readonly modulableParameters: ModulableAudioParameter[];
  readonly uiModulableParameters: IUIAudioParameter<ModulableAudioParameter>[];
}
