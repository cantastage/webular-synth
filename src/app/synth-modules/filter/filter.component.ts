import { Component, OnInit } from '@angular/core';
import { ModulableParameter, ModulableComponent } from 'src/app/synth-modules/IModulable';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends ModulableComponent implements OnInit {
  private _filter: BiquadFilterNode;
  // how to extract a string[] from BiquadFilterType?!?!?! O.O
  private _filterTypes: string[];
  private _modulableParameters: ModulableParameter[];

  constructor(private contextManager: AudioContextManagerService) {
    super();
  }

  ngOnInit() {
    this._filter = this.contextManager.audioContext.createBiquadFilter();
    this._filterTypes = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];
    this._modulableParameters = [new ModulableParameter('frequency', this._filter.frequency, 'Hz'),
      new ModulableParameter('resonance', this._filter.Q, '')];
  }
  public modulableParameters(): ModulableParameter[] {
    return this._modulableParameters;
  }

  public typeChange(eventArg: any): void {
    this._filter.type = eventArg.target.value;
  }
}
