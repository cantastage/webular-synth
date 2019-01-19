import { Component, OnInit, Input } from '@angular/core';
import { ModulableComponent } from 'src/app/synth-modules/IModulable';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { ModulableUIAudioParameter, AudioParamDescriptor } from '../AudioParamWrapper';
import { ModuleComponent } from 'src/app/interfaces/module.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../app.component.scss']
})
export class FilterComponent extends ModulableComponent implements OnInit, ModuleComponent {
  @Input() data: Object;
  private _filterNode: BiquadFilterNode;
  private _filterTypes: BiquadFilterType[]; // readonly
  private _modulableParameters: ModulableUIAudioParameter[];

  public get filterTypes(): string[] {
    return this._filterTypes;
  }

  public get innerNode(): AudioNode {
    return this._filterNode;
  }
  public get modulableParameters(): ModulableUIAudioParameter[] {
    return this._modulableParameters;
  }

  public constructor(private contextManager: AudioContextManagerService) {
    super();
    this._filterNode = this.contextManager.audioContext.createBiquadFilter();
    // how to extract a string[] from BiquadFilterType?!?!?! O.O
    this._filterTypes = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];
    this._modulableParameters = [
      new ModulableUIAudioParameter('frequency',
        new AudioParamDescriptor(0, 5500, 22000, 'Hz'),
        this._filterNode.frequency,
        null
      ),
      new ModulableUIAudioParameter('resonance',
        new AudioParamDescriptor(0, 5, 100, ''),
        this._filterNode.Q,
        null
      )
    ];
  }

  public ngOnInit() {
  }

  public typeChange(eventArg: any): void {
    this._filterNode.type = eventArg.target.value;
  }
}
