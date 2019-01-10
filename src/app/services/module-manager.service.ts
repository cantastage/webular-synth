import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { MoogLadderFilterComponent } from '../synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { FilterComponent } from '../synth-modules/filter/filter.component';
import { LfoComponent } from '../synth-modules/lfo/lfo.component';
import { ClockComponent } from '../synth-modules/clock/clock.component';
import { SequencerComponent } from '../synth-modules/sequencer/sequencer.component';
import { ADSRComponent } from '../synth-modules/adsr/adsr.component';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {

  private modules: ModuleItem[];

  constructor() { }

  public getModules(): ModuleItem[] {
    // return this.modules;
    return [new ModuleItem(MoogLadderFilterComponent, { name: 'filter' }),
    new ModuleItem(FilterComponent, { name: 'pesteneraFilter' }),
    new ModuleItem(LfoComponent, { name: 'lfo' }),
    new ModuleItem(ClockComponent, { name: 'clock' }),
    new ModuleItem(SequencerComponent, { name: 'sequencer' }),
    new ModuleItem(ADSRComponent, { name: 'ADSR' })];
  }
}
