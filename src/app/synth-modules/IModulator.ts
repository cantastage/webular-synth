import { IModulableComponent, ModulableParameter } from './IModulable';
import { Input } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';

export interface IModulatorComponent {
  modulatedComponent: IModulableComponent;
  modulatedParameter: ModulableParameter;

  onModulatedComponentAttach(): void;
  onModulatedComponentDetach(): void;
  onModulatedParameterAttach(): void;
  onModulatedParameterDetach(): void;
}

export abstract class ModulatorComponent {
  protected _fxAmplifier: GainNode;
  protected _modulatedComponent: IModulableComponent;
  protected _modulatedParameter: ModulableParameter;

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
  public get modulatedParameter(): ModulableParameter {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: ModulableParameter) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;

      this.modulatedParameter.audioParameter.value = 0;
      this._fxAmplifier.gain.value = this.modulatedParameter.maxUIValue;
      this._fxAmplifier.connect(this.modulatedParameter.audioParameter);
      this.onModulatedParameterAttach();
    } else { // Detach
      this.onModulatedParameterDetach();
      this._fxAmplifier.disconnect(this.modulatedParameter.audioParameter);
      this._fxAmplifier.gain.value = this._fxAmplifier.gain.defaultValue;
      this.modulatedParameter.audioParameter.value = this.modulatedParameter.uiValue;

      this._modulatedParameter = null;
    }
  }

  protected abstract onModulatedComponentAttach(): void;
  protected abstract onModulatedComponentDetach(): void;
  protected abstract onModulatedParameterAttach(): void;
  protected abstract onModulatedParameterDetach(): void;

  public constructor(contextManager: AudioContextManagerService) {
    this._fxAmplifier = contextManager.audioContext.createGain();
  }
}
