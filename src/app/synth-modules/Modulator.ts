import { Input } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { IModulableComponent } from './Modulable';
import { IUIAudioParameter, ModulableAudioParameter, AudioParameter, UIAudioParameter, AudioParameterDescriptor } from './Modulation';

export interface IModulatorComponent {
  modulatedComponent: IModulableComponent;
  modulatedParameter: IUIAudioParameter<ModulableAudioParameter>;

  onModulatedComponentAttach(): void;
  onModulatedComponentDetach(): void;
  onModulatedParameterAttach(): void;
  onModulatedParameterDetach(): void;
}

export abstract class ModulatorComponent {
  protected _intensityNode: GainNode;
  private _intensity: IUIAudioParameter<AudioParameter>;
  protected _modulatedComponent: IModulableComponent;
  protected _modulatedParameter: IUIAudioParameter<ModulableAudioParameter>;

  public get intensity(): IUIAudioParameter<AudioParameter> {
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
  public get modulatedParameter(): IUIAudioParameter<ModulableAudioParameter> {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: IUIAudioParameter<ModulableAudioParameter>) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;

      this.modulatedParameter.audioParameter.beginModulationConfig();
      this._intensity = new UIAudioParameter<AudioParameter>(
        new AudioParameter(
          'intensity',
          new AudioParameterDescriptor(
            this.modulatedParameter.audioParameter.llDescriptor.minValue,
            this.modulatedParameter.audioParameter.llDescriptor.maxValue,
            this.modulatedParameter.audioParameter.llDescriptor.maxValue,
            this.modulatedParameter.audioParameter.llDescriptor.measurementUnit
          ),
          this._intensityNode.gain
        ),
        new AudioParameterDescriptor(0, 100, 100, '%')
      );
      this._intensityNode.connect(this.modulatedParameter.audioParameter.audioParam);
      this.onModulatedParameterAttach();
    } else { // Detach
      this.onModulatedParameterDetach();
      this._intensityNode.disconnect(this.modulatedParameter.audioParameter.audioParam);
      this.intensity.hlValue = this.intensity.hlDescriptor.defaultValue;
      this.modulatedParameter.audioParameter.endModulationConfig();

      this._modulatedParameter = null;
    }
  }

  protected abstract onModulatedComponentAttach(): void;
  protected abstract onModulatedComponentDetach(): void;
  protected abstract onModulatedParameterAttach(): void;
  protected abstract onModulatedParameterDetach(): void;

  public constructor(contextManager: AudioContextManagerService) {
    this._intensityNode = contextManager.audioContext.createGain();
  }

  public intensityChange(newValue: number): void {
    // eventual checks
    this.intensity.hlValue = Number(newValue);
  }
}
