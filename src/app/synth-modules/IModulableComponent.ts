import { IModulableAudioParameter, IUIAudioParameter } from './AudioParameter';
import { SynthModule } from '../interfaces/module.component';


export interface IModulableComponent extends SynthModule {
  readonly modulableParameters: IModulableAudioParameter[];
  readonly uiModulableParameters: IUIAudioParameter<IModulableAudioParameter>[];
  selectedModulableParameter: IModulableAudioParameter;
}
