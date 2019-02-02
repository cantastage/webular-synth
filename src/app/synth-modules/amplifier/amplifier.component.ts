import { Component, OnInit, Input } from '@angular/core';
import { IModulableComponent } from '../IModulableComponent';
import {
  IUIAudioParameter, IModulableAudioParameter, ModulableAudioParameter, UIAudioParameter, AudioParameterDescriptor
} from '../AudioParameter';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { SynthModule } from 'src/app/interfaces/module.component';

@Component({
  selector: 'app-amplifier',
  templateUrl: './amplifier.component.html',
  styleUrls: ['./amplifier.component.scss',
    '../../app.component.scss', '../filter/filter.component.scss']
})
export class AmplifierComponent implements OnInit, IModulableComponent {
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;

  private _gainNode: GainNode;
  private _panNode: StereoPannerNode;

// private _testnode: OscillatorNode;

  private _modulableParameters: IModulableAudioParameter[];
  private _uiModulableParameters: IUIAudioParameter<IModulableAudioParameter>[];
  selectedModulableParameter: IModulableAudioParameter;

  public get modulableParameters(): IModulableAudioParameter[] {
    return this._modulableParameters;
  }
  public get uiModulableParameters(): IUIAudioParameter<IModulableAudioParameter>[] {
    return this._uiModulableParameters;
  }

  public constructor(private contextManager: AudioContextManagerService) { }

  public loadPatch(): void {
    this._modulableParameters = [
      new ModulableAudioParameter(
        'level',
        new AudioParameterDescriptor(0, 1, 1, ''),
        this._gainNode.gain
      ),
      new ModulableAudioParameter(
        'balance',
        new AudioParameterDescriptor(-1, 0, 1, ''),
        this._panNode.pan
      )
    ];
    this.selectedModulableParameter = this.data.state.modulatedParameter === 'level' ?
      this.modulableParameters[0] : this.modulableParameters[1];
    this._uiModulableParameters = [
      new UIAudioParameter<IModulableAudioParameter>(
        this.modulableParameters[0],
        new AudioParameterDescriptor(0, this.data.state.hlLevel, 10, ''),
      ),
      new UIAudioParameter<IModulableAudioParameter>(
        this.modulableParameters[1],
        new AudioParameterDescriptor(-10, this.data.state.hlBalance, 10, ''),
      )
    ];
  }

  public ngOnInit() {
    this._gainNode = this.contextManager.audioContext.createGain();
    this._panNode = this.contextManager.audioContext.createStereoPanner();
    this.getInput().connect(this.getOutput());
    this.loadPatch();

// this._testnode = this.contextManager.audioContext.createOscillator();
// this._testnode.start();
// this._testnode.connect(this.getInput());

    if (this.isInSoundChain) {
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

  public savePatch(): any {
    this.data.state.hlLevel = this.uiModulableParameters[0].hlValue;
    this.data.state.hlBalance = this.uiModulableParameters[1].hlValue;
    this.data.state.modulatedParameter = this.selectedModulableParameter.name;
    return this.data;
  }

  public getInput(): AudioNode {
    return this._gainNode;
  }
  public getOutput(): AudioNode {
    return this._panNode;
  }

  public connectSynthModule(inputModule: SynthModule) {
    inputModule.getOutput().connect(this.getInput());
  }

  public disconnectSynthModule() {
    this.getInput().disconnect();
    this.getOutput().disconnect();
  }
}
