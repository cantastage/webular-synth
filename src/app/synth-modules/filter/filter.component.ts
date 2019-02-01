import { Component, OnInit, Input } from '@angular/core';
import { IModulableComponent } from 'src/app/synth-modules/IModulableComponent';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

import {
  IUIAudioParameter, UIAudioParameter, IModulableAudioParameter, ModulableAudioParameter, AudioParameterDescriptor
} from '../AudioParameter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../app.component.scss']
})
export class FilterComponent implements OnInit, IModulableComponent {
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;

// private _testnode: OscillatorNode;

  private _filterNode: BiquadFilterNode;
  private _filterTypes: BiquadFilterType[]; // readonly

  private _modulableParameters: IModulableAudioParameter[];
  private _uiModulableParameters: IUIAudioParameter<IModulableAudioParameter>[];
  selectedModulableParameter: IModulableAudioParameter;

  public get filterTypes(): string[] {
    return this._filterTypes;
  }

  public get modulableParameters(): IModulableAudioParameter[] {
    return this._modulableParameters;
  }
  public get uiModulableParameters(): IUIAudioParameter<IModulableAudioParameter>[] {
    return this._uiModulableParameters;
  }

  public constructor(private contextManager: AudioContextManagerService) { }

  public loadPatch(): void {
    this._filterNode.type = this.data.state.filterType;
    this._modulableParameters = [
      new ModulableAudioParameter(
        'frequency',
        new AudioParameterDescriptor(0, 5500, 22000, 'Hz'),
        this._filterNode.frequency
      ),
      new ModulableAudioParameter(
        'resonance',
        new AudioParameterDescriptor(0, 5, 30, ''),
        this._filterNode.Q
      )
    ];
    this.selectedModulableParameter = this.data.state.modulatedParameter === 'frequency' ?
      this.modulableParameters[0] : this.modulableParameters[1];
    this._uiModulableParameters = [
      new UIAudioParameter<IModulableAudioParameter>(
        this.modulableParameters[0],
        new AudioParameterDescriptor(0, this.data.state.hlFrequency, 22000, 'Hz')
      ),
      // ambiguous acceptation of Q as resonance/quality depending on the filter type
      new UIAudioParameter<IModulableAudioParameter>(
        this.modulableParameters[1],
        new AudioParameterDescriptor(0, this.data.state.hlResonance, 30, '')
      )
    ];
  }

  public ngOnInit() {
    this._filterNode = this.contextManager.audioContext.createBiquadFilter();
    // how to extract a string[] from BiquadFilterType?!?!?! O.O
    this._filterTypes = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];
    this.loadPatch();

// this._testnode = this.contextManager.audioContext.createOscillator();
// this._testnode.start();
// this._testnode.connect(this.getInput());

    if (this.isInSoundChain) {
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

  public savePatch(): any {
    this.data.state.filterType = this._filterNode.type;
    this.data.state.hlFrequency = this.uiModulableParameters[0].hlValue;
    this.data.state.hlResonance = this.uiModulableParameters[1].hlValue;
    this.data.state.modulatedParameter = this.selectedModulableParameter.name;
    return this.data;
  }

  public getInput(): AudioNode {
    return this._filterNode;
  }
  public getOutput(): AudioNode {
    return this._filterNode;
  }

  public connectToSynthNode(node: AudioNode) {
    node.connect(this._filterNode);
  }

  public disconnectSynthModule() {
    this._filterNode.disconnect();
  }
}
