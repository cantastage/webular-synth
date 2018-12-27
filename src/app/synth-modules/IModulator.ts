import { Input } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { IModulableComponent } from './IModulable';
import { AudioParamWrapper, ModulableAudioParamWrapper, AudioParamDescriptor } from './AudioParamWrapper';

export interface IModulatorComponent {
  modulatedComponent: IModulableComponent;
  modulatedParameter: ModulableAudioParamWrapper;

  onModulatedComponentAttach(): void;
  onModulatedComponentDetach(): void;
  onModulatedParameterAttach(): void;
  onModulatedParameterDetach(): void;
}

export abstract class ModulatorComponent {
  protected _intensityNode: GainNode;
  private _intensity: AudioParamWrapper; // readonly
  protected _modulatedComponent: IModulableComponent;
  protected _modulatedParameter: ModulableAudioParamWrapper;

  public get intensity(): AudioParamWrapper {
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
  public get modulatedParameter(): ModulableAudioParamWrapper {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: ModulableAudioParamWrapper) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;

      this.modulatedParameter.beginModulationConfig();
      this.intensity.audioParameter.value = this.modulatedParameter.descriptor.maxValue;
      this._intensityNode.connect(this.modulatedParameter.audioParameter);
      this.onModulatedParameterAttach();
    } else { // Detach
      this.onModulatedParameterDetach();
      this._intensityNode.disconnect(this.modulatedParameter.audioParameter);
      this.intensity.audioParameter.value = this.intensity.descriptor.defaultValue;
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
    this._intensity = new AudioParamWrapper(new AudioParamDescriptor('intensity', 0, 100, 100, '%'), this._intensityNode.gain);
  }

  public intensityChange(ctx: ModulatorComponent, newValue: number): void {
    // eventual checks
    ctx.intensity.audioParameter.value = Number(newValue) / 100 *
      ctx.modulatedParameter.descriptor.maxValue;
  }
}
