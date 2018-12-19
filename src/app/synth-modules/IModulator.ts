import { IModulableComponent } from './IModulable';

export interface IModulatorComponent {
  onModulatedModuleAttach(modulableModule: IModulableComponent);
  onModulatedParameterAttach(modulableParameter: AudioParam);
  onModulatedParameterDetach();
  onModulatedModuleDetach();
}
