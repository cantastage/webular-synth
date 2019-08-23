import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { MoogLadderFilterComponent } from '../synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { FilterComponent } from '../synth-modules/filter/filter.component';
import { SequencerComponent } from '../synth-modules/sequencer/sequencer.component';
import { ProgSequencerComponent } from '../synth-modules/prog-sequencer/prog-sequencer.component';
import { OscillatorComponent } from '../synth-modules/oscillator/oscillator.component';
import { Sequencer } from '../model/modules/sequencer/basic/Sequencer';
import { ProgSequencer } from '../model/modules/sequencer/prog/ProgSequencer';
import { PitchClassesProvider } from '../model/modules/sequencer/PitchClassesProvider';
import { HarmonizationsProvider } from '../model/modules/sequencer/HarmonizationsProvider';
import { Measure } from '../model/modules/sequencer/basic/Measure';
import { AmplifierComponent } from '../synth-modules/amplifier/amplifier.component';
import { Progression } from '../model/modules/sequencer/prog/Progression';
import { Chord } from '../model/modules/sequencer/prog/Chord';
import { ChordQualitiesProvider } from '../model/modules/chord-substitution/ChordQualitiesProvider';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {

  private modules: ModuleItem[];

  constructor() { }

  // a fly-weight factory could be used to generate the default modules
  private get sequencerDefaultState(): any {
    return new Sequencer(
      PitchClassesProvider.retrieveInstance('C'),
      HarmonizationsProvider.retrieveInstance('M'),
      Measure.METRIC_MIN,
      16
    );
  }
  private get progSequencerDefaultState(): any {
    return new ProgSequencer(
      new Progression([
        new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
        new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')),
        new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
        new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
      ]),
    3, 16);
  }
  private get oscillatorDefaultState(): any {
    return { waveForm: 'sine', maxVelocity: 100, addSemitone: 0, finePitch: 0, active: 0 };
  }
  private get mlFilterDefaultState(): any {
    return { filterType: 'lowpass', hlFrequency: 5500, hlResonance: 0.2 };
  }
  private get filterDefaultState(): any {
    return { filterType: 'lowpass', hlFrequency: 5500, hlResonance: 5, modulatedParameter: 'FREQUENCY' };
  }
  private get amplifierDefaultState(): any {
    return { hlLevel: 10, hlBalance: 0, modulatedParameter: 'LEVEL' };
  }

  public getModules(): ModuleItem[] {
    return [
      // new ModuleItem(SequencerComponent, { name: 'SEQUENCER', state: this.sequencerDefaultState }),
      // new ModuleItem(ProgSequencerComponent, { name: 'SEQUENCER', state: this.progSequencerDefaultState }),
      new ModuleItem(OscillatorComponent, { name: 'OSCILLATOR', state: this.oscillatorDefaultState }),
      new ModuleItem(MoogLadderFilterComponent, { name: 'MOOG LADDER FILTER', state: this.mlFilterDefaultState }),
      new ModuleItem(FilterComponent, { name: 'BIQUADRATIC FILTER', state: this.filterDefaultState }),
      new ModuleItem(AmplifierComponent, { name: 'AMPLIFIER', state:  this.amplifierDefaultState }),
    ];
  }
}
