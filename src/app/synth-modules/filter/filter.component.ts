import { Component, OnInit } from '@angular/core';
import { ModulableParameter, ModulableComponent } from 'src/app/synth-modules/IModulable';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends ModulableComponent implements OnInit {
  private _filterNode: BiquadFilterNode;
  // how to extract a string[] from BiquadFilterType?!?!?! O.O
  private _filterTypes: string[];
  private _modulableParameters: ModulableParameter[];

  public innerNode(): AudioNode {
    return this._filterNode;
  }
  constructor(private contextManager: AudioContextManagerService) {
    super();
    this._filterNode = this.contextManager.audioContext.createBiquadFilter();
    this._filterTypes = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];
    this._modulableParameters = [new ModulableParameter('frequency', this._filterNode.frequency, 1, 22000, 'Hz'),
      new ModulableParameter('resonance', this._filterNode.Q, 1, 10, '')];
  }

  ngOnInit() {
  }
  public modulableParameters(): ModulableParameter[] {
    return this._modulableParameters;
  }

  public typeChange(eventArg: any): void {
    this._filterNode.type = eventArg.target.value;
  }
}
