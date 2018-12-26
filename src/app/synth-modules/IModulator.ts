import { IModulableComponent, AudioParameter2, ParameterDescriptor } from './IModulable';
import { Input } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';

export interface IModulatorComponent {
  modulatedComponent: IModulableComponent;
  modulatedParameter: AudioParameter2;

  onModulatedComponentAttach(): void;
  onModulatedComponentDetach(): void;
  onModulatedParameterAttach(): void;
  onModulatedParameterDetach(): void;
}

export abstract class ModulatorComponent {
  protected _intensityNode: GainNode;
  private _intensity: AudioParameter2; // readonly
  protected _modulatedComponent: IModulableComponent;
  // THINK CAREFULLY ABOUT THE TYPE BELOW
  protected _modulatedParameter: AudioParameter2;

  public get intensity(): AudioParameter2 {
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
  public get modulatedParameter(): AudioParameter2 {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: AudioParameter2) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;

      this.modulatedParameter.audioParameter.value = 0; // mp's being modulated
      // (omission of percentage)
      this.intensity.audioParameter.value = this.modulatedParameter.parameterDescriptor.maxUIValue;
      this._intensityNode.connect(this.modulatedParameter.audioParameter);
      this.onModulatedParameterAttach();
    } else { // Detach
      this.onModulatedParameterDetach();
      this._intensityNode.disconnect(this.modulatedParameter.audioParameter);
      this.intensity.audioParameter.value = this.intensity.parameterDescriptor.defaultUIValue;
      this.modulatedParameter.audioParameter.value = this.modulatedParameter.uiValue; // no longer

      this._modulatedParameter = null;
    }
  }

  protected abstract onModulatedComponentAttach(): void;
  protected abstract onModulatedComponentDetach(): void;
  protected abstract onModulatedParameterAttach(): void;
  protected abstract onModulatedParameterDetach(): void;

  public constructor(contextManager: AudioContextManagerService) {
    this._intensityNode = contextManager.audioContext.createGain();
    this._intensity = new AudioParameter2(new ParameterDescriptor('intensity', 0, 100, 100, ''), this._intensityNode.gain);
  }

  public intensityChange(ctx: ModulatorComponent, newValue: number): void {
    // eventual checks
    ctx.intensity.uiValue = Number(newValue);
    // newValue as integer part of a percentage
    ctx.intensity.audioParameter.value = Number(newValue) / 100 *
      ctx.modulatedParameter.parameterDescriptor.maxUIValue;
  }
}
