import { IUIAudioParameter, ModulableAudioParameter } from './Modulation';


export interface IModulableComponent {
  readonly innerNode: AudioNode;
  readonly modulableParameters: IUIAudioParameter<ModulableAudioParameter>[];
}
