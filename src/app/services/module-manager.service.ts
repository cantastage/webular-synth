import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { MoogLadderFilterComponent } from '../synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { FilterComponent } from '../synth-modules/filter/filter.component';
import { SequencerComponent } from '../synth-modules/sequencer/sequencer.component';
import { OscillatorComponent } from '../synth-modules/oscillator/oscillator.component';
import { Sequencer } from '../model/modules/sequencer/Sequencer';
import { PitchClassesProvider } from '../model/modules/sequencer/PitchClassesProvider';
import { HarmonizationsProvider } from '../model/modules/sequencer/HarmonizationsProvider';
import { Measure } from '../model/modules/sequencer/Measure';
import { AmplifierComponent } from '../synth-modules/amplifier/amplifier.component';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {

  private modules: ModuleItem[];

  constructor() { }

  // a fly-weight factory could be used
  private get sequencerDefaultState(): any {
    return new Sequencer(
      PitchClassesProvider.retrieveInstance('C'),
      HarmonizationsProvider.retrieveInstance('M'),
      Measure.METRIC_MIN
    );
  }
  private get oscillatorDefaultState(): any {
    return { waveForm: 'sine', maxVelocity: 100, addSemitone: 0, finePitch: 0, active: 0 };
  }
  private get mlFilterDefaultState(): any {
    return { filterType: 'lowpass', hlFrequency: 5500, hlResonance: 1 };
  }
  private get filterDefaultState(): any {
    return { filterType: 'lowpass', hlFrequency: 5500, hlResonance: 5, modulatedParameter: 'frequency' };
  }
  private get amplifierDefaultState(): any {
    return { hlLevel: 10, hlBalance: 0, modulatedParameter: 'level' };
  }

  public getModules(): ModuleItem[] {
    return [
      new ModuleItem(SequencerComponent, { name: 'Sequencer', state: this.sequencerDefaultState }),
      new ModuleItem(OscillatorComponent, { name: 'Oscillator', state: this.oscillatorDefaultState }),
      new ModuleItem(MoogLadderFilterComponent, { name: 'Moog Ladder Filter', state: this.mlFilterDefaultState }),
      new ModuleItem(FilterComponent, { name: 'Biquadratic Filter', state: this.filterDefaultState }),
      new ModuleItem(AmplifierComponent, { name: 'Amplifier', state:  this.amplifierDefaultState })
    ];
  }
}
