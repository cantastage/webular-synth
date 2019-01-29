import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { MoogLadderFilterComponent } from '../synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { FilterComponent } from '../synth-modules/filter/filter.component';
import { LfoComponent } from '../synth-modules/lfo/lfo.component';
import { ClockComponent } from '../synth-modules/clock/clock.component';
import { SequencerComponent } from '../synth-modules/sequencer/sequencer.component';
import { ADSRComponent } from '../synth-modules/adsr/adsr.component';
import { OscillatorComponent } from '../synth-modules/oscillator/oscillator.component';
import { ClockProvider } from '../model/modules/clock/ClockProvider';
import { Sequencer } from '../model/modules/sequencer/Sequencer';
import { Scale } from '../model/modules/sequencer/Scale';
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
  private get mlFilterDefaultState(): any {
    return { filterType: 'lowpass', hlFrequency: 5500, hlResonance: 0.2 };
  }
  private get filterDefaultState(): any {
    return { filterType: 'lowpass', hlFrequency: 5500, hlResonance: 1 };
  }
  private get lfoDefaultState(): any {
    return { waveShape: 'sine', hlIntensity: 100, hlRate: 10 };
  }
  private get clockDefaultState(): any {
    return { bpm: ClockProvider.BEATS_DEFAULT };
  }
  private get sequencerDefaultState(): any {
    return new Sequencer(
      PitchClassesProvider.retrieveInstance('C'),
      HarmonizationsProvider.retrieveInstance('M'),
      Measure.METRIC_MIN
    );
  }
  private get amplifierDefaultState(): any {
    return { hlLevel: 10, hlBalance: 0 };
  }

  private get adsrDefaultState(): any {
    return { attackTime: 50, attackValue: 10, sustainValue: 80, releaseTime: 180 };
  }

  private get oscillatorDefaultState(): any {
    return { waveForm: 'sine', maxVelocity: 100, addSemitone: 0, finePitch: 0, active: 0 };
  }

  public getModules(): ModuleItem[] {
    // return this.modules;
    return [
      new ModuleItem(MoogLadderFilterComponent, { name: 'filter', state: this.mlFilterDefaultState }),
      new ModuleItem(FilterComponent, { name: 'pesteneraFilter', state: this.filterDefaultState }),
      new ModuleItem(LfoComponent, { name: 'lfo', state: this.lfoDefaultState }),
      new ModuleItem(ClockComponent, { name: 'clock', state: this.clockDefaultState }),
      new ModuleItem(SequencerComponent, { name: 'sequencer', state: this.sequencerDefaultState }),
      new ModuleItem(ADSRComponent, { name: 'ADSR', state: this.adsrDefaultState }),
      new ModuleItem(OscillatorComponent, { name: 'poly-oscillator', state: this.oscillatorDefaultState }),
      new ModuleItem(AmplifierComponent, { name: 'final', state:  this.amplifierDefaultState })
    ];
  }
}
