import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KnobModule } from 'ng2-knob';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoogLadderFilterComponent } from './synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { KnobComponent } from './synth-modules/sub-components/knob/knob.component';
import { FormsModule } from '@angular/forms';
import { SynthModuleWrapperComponent } from './synth-module-wrapper/synth-module-wrapper.component';
import { FilterComponent } from './synth-modules/filter/filter.component';
import { LfoComponent } from './synth-modules/lfo/lfo.component';
import { ClockComponent } from './synth-modules/clock/clock.component';
import { SequencerComponent } from './synth-modules/sequencer/sequencer.component';
import { ADSRComponent } from './synth-modules/adsr/adsr.component';
import { OscillatorComponent } from './synth-modules/oscillator/oscillator.component';
import { AmplifierComponent } from './synth-modules/amplifier/amplifier.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ProgSequencerComponent } from './synth-modules/prog-sequencer/prog-sequencer.component';
import { ChordSubstitutionComponent } from './synth-modules/chord-substitution/chord-substitution.component';
@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    MoogLadderFilterComponent,
    KnobComponent,
    SynthModuleWrapperComponent,
    FilterComponent,
    LfoComponent,
    ClockComponent,
    SequencerComponent,
    ADSRComponent,
    OscillatorComponent,
    AmplifierComponent,
    ChordSubstitutionComponent,
    ProgSequencerComponent
  ],
  entryComponents: [MoogLadderFilterComponent, FilterComponent,
    LfoComponent, ClockComponent, SequencerComponent, ADSRComponent, OscillatorComponent, AmplifierComponent,
    ChordSubstitutionComponent, ProgSequencerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    KnobModule,
    MatButtonToggleModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
