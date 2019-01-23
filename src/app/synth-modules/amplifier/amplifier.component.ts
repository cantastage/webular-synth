import { Component, OnInit, Input } from '@angular/core';
import { IModulableComponent } from '../Modulable';
import { ModuleComponent } from 'src/app/interfaces/module.component';
import { IUIAudioParameter, ModulableAudioParameter, UIAudioParameter, AudioParameterDescriptor } from '../Modulation';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-amplifier',
  templateUrl: './amplifier.component.html',
  styleUrls: ['./amplifier.component.scss', '../../app.component.scss']
})
export class AmplifierComponent implements OnInit, IModulableComponent, ModuleComponent {
  @Input() data: any;

  private _gainNode: GainNode;
  private _panNode: StereoPannerNode;
  private _modulableParameters: IUIAudioParameter<ModulableAudioParameter>[];

  public get innerNode(): AudioNode {
    return this._gainNode;
  }
  public get modulableParameters(): IUIAudioParameter<ModulableAudioParameter>[] {
    return this._modulableParameters;
  }

  public constructor(private contextManager: AudioContextManagerService) { }

  public loadPatch(): void {
    this._modulableParameters = [
      new UIAudioParameter<ModulableAudioParameter>(
        new ModulableAudioParameter(
          'master',
          new AudioParameterDescriptor(0, 1, 1, 'lvl'),
          this._gainNode.gain
        ),
        new AudioParameterDescriptor(0, this.data.state.hlLevel, 10, 'dlvl'),
      ),
      new UIAudioParameter<ModulableAudioParameter>(
        new ModulableAudioParameter(
          'pan',
          new AudioParameterDescriptor(-1, 0, 1, 'balance'),
          this._panNode.pan
        ),
        new AudioParameterDescriptor(-10, this.data.state.hlBalance, 10, 'dbalance'),
      )
    ];
  }

  public ngOnInit() {
    this._gainNode = this.contextManager.audioContext.createGain();
    this._panNode = this.contextManager.audioContext.createStereoPanner();
    this._gainNode.connect(this._panNode);
    this._panNode.connect(this.contextManager.audioContext.destination);
    this.loadPatch();
  }

  public savePatch(): any {
    this.data.state.hlLevel = this.modulableParameters[0].hlValue;
    this.data.state.hlBalance = this.modulableParameters[1].hlValue;
    return this.data;
  }
}
