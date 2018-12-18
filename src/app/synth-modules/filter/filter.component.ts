import { Component, OnInit } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  private _filter: BiquadFilterNode;
  private readonly _filterTypes = ['lowpass', 'highpass', 'bandpass', 'notch'];

  constructor(private contextManager: AudioContextManagerService) { }

  ngOnInit() {
    this._filter = this.contextManager.audioContext.createBiquadFilter();
  }

  typeChange(eventArg: any) {
    this._filter.type = eventArg.target.value;
  }

  frequencyChange(ctx: FilterComponent, newValue: number): void {
    // eventual checks
    ctx._filter.frequency.value = Number(newValue);
  }

  resonanceChange(ctx: FilterComponent, newValue: number): void {
    // eventual checks
    ctx._filter.Q.value = Number(newValue);
  }
}
