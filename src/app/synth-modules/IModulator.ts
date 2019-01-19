import { Input } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { IModulableComponent } from './IModulable';
import { UIAudioParameter, ModulableUIAudioParameter, AudioParamDescriptor } from './AudioParamWrapper';

export interface IModulatorComponent {
  modulatedComponent: IModulableComponent;
  modulatedParameter: ModulableUIAudioParameter;

  onModulatedComponentAttach(): void;
  onModulatedComponentDetach(): void;
  onModulatedParameterAttach(): void;
  onModulatedParameterDetach(): void;
}

export abstract class ModulatorComponent {
  protected _intensityNode: GainNode;
  private _intensity: UIAudioParameter; // readonly
  protected _modulatedComponent: IModulableComponent;
  protected _modulatedParameter: ModulableUIAudioParameter;

  public get intensity(): UIAudioParameter {
    return this._intensity;
  }
  public get modulatedComponent(): IModulableComponent {
    return this._modulatedComponent;
  }
  @Input()
  public set modulatedComponent(mm: IModulableComponent) {
    if (mm && mm != null) { // Attach
      this._modulatedComponent = mm;
      this.onModulatedComponentAttach();
    } else { // Detach
      this.onModulatedComponentDetach();
      this._modulatedComponent = null;
    }
  }
  public get modulatedParameter(): ModulableUIAudioParameter {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: ModulableUIAudioParameter) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;

      this.modulatedParameter.beginModulationConfig();
      this.intensity.value = 100;
      this._intensityNode.connect(this.modulatedParameter.audioParam);
      this.onModulatedParameterAttach();
    } else { // Detach
      this.onModulatedParameterDetach();
      this._intensityNode.disconnect(this.modulatedParameter.audioParam);
      this.intensity.value = this.intensity.uiDescriptor.defaultValue;
      this.modulatedParameter.endModulationConfig();

      this._modulatedParameter = null;
    }
  }

  protected abstract onModulatedComponentAttach(): void;
  protected abstract onModulatedComponentDetach(): void;
  protected abstract onModulatedParameterAttach(): void;
  protected abstract onModulatedParameterDetach(): void;

  public constructor(contextManager: AudioContextManagerService) {
    this._intensityNode = contextManager.audioContext.createGain();
    this._intensity = new UIAudioParameter('intensity',
      new AudioParamDescriptor(0, 22000, 22000, 'Hz'),
      this._intensityNode.gain,
      new AudioParamDescriptor(0, 100, 100, '%'));
  }

  public intensityChange(newValue: number): void {
    // eventual checks
    this.intensity.value = Number(newValue);
  }
}
