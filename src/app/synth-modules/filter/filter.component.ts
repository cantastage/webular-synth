import { Component, OnInit, Input } from '@angular/core';
import { IModulableComponent } from 'src/app/synth-modules/Modulable';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

import { ModuleComponent } from 'src/app/interfaces/module.component';
import { IUIAudioParameter, UIAudioParameter, ModulableAudioParameter, AudioParameterDescriptor } from '../Modulation';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../app.component.scss']
})
export class FilterComponent implements OnInit, IModulableComponent, ModuleComponent {
  @Input() data: any;

  private _testGeneratorNode: OscillatorNode;

  private _filterNode: BiquadFilterNode;
  private _filterTypes: BiquadFilterType[]; // readonly
  private _modulableParameters: IUIAudioParameter<ModulableAudioParameter>[];

  public get filterTypes(): string[] {
    return this._filterTypes;
  }

  public get innerNode(): AudioNode {
    return this._filterNode;
  }
  public get modulableParameters(): IUIAudioParameter<ModulableAudioParameter>[] {
    return this._modulableParameters;
  }

  public constructor(private contextManager: AudioContextManagerService) { }

  public loadPatch(): void {
    this._filterNode.type = this.data.state.filterType;
    this._modulableParameters = [
      new UIAudioParameter<ModulableAudioParameter>(
        new ModulableAudioParameter(
          'frequency',
          new AudioParameterDescriptor(0, 5500, 22000, 'Hz'),
          this._filterNode.frequency
        ),
        new AudioParameterDescriptor(0, this.data.state.hlFrequency, 22000, 'Hz')
      ),
      // ambiguous acceptation of Q as resonance/quality depending on the filter type
      new UIAudioParameter<ModulableAudioParameter>(
        new ModulableAudioParameter(
          'Q',
          new AudioParameterDescriptor(0, 5, 30, ''),
          this._filterNode.Q
        ),
        new AudioParameterDescriptor(0, this.data.state.hlResonance, 30, '')
      )
    ];
  }

  public ngOnInit() {
    this._filterNode = this.contextManager.audioContext.createBiquadFilter();
    // how to extract a string[] from BiquadFilterType?!?!?! O.O
    this._filterTypes = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];
    this.loadPatch();

    // remove below after tests...
    this._testGeneratorNode = this.contextManager.audioContext.createOscillator();
    this._testGeneratorNode.type = 'sine';
    this._testGeneratorNode.frequency.value = 5500;
    this._testGeneratorNode.start();

    this._testGeneratorNode.connect(this.innerNode);
    this.innerNode.connect(this.contextManager.audioContext.destination);
    // disconnect both of them after tests...
  }

  public savePatch(): any {
    this.data.state.filterType = this._filterNode.type;
    this.data.state.hlFrequency = this.modulableParameters[0].hlValue;
    this.data.state.hlResonance = this.modulableParameters[1].hlValue;
    return this.data;
  }
}
