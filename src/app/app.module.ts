import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KnobModule } from 'ng2-knob';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoogLadderFilterComponent } from './synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { PolyphonicOscComponent } from './synth-modules/polyphonic-osc/polyphonic-osc.component';
import { AddModuleDirective } from './directives/add-module.directive';
import { KnobComponent } from './synth-modules/sub-components/knob/knob.component';
import { FormsModule } from '@angular/forms';
import { SynthModuleWrapperComponent } from './synth-module-wrapper/synth-module-wrapper.component';
import { FilterComponent } from './synth-modules/filter/filter.component';
import { LfoComponent } from './synth-modules/lfo/lfo.component';
import { ClockComponent } from './synth-modules/clock/clock.component';
import { SequencerComponent } from './synth-modules/sequencer/sequencer.component';
import { ADSRComponent } from './synth-modules/adsr/adsr.component';
import { OscillatorComponent } from './synth-modules/oscillator/oscillator.component';
@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    MoogLadderFilterComponent,
    PolyphonicOscComponent,
    AddModuleDirective,
    KnobComponent,
    SynthModuleWrapperComponent,
    FilterComponent,
    LfoComponent,
    ClockComponent,
    SequencerComponent,
    ADSRComponent,
    OscillatorComponent,
  ],
  entryComponents: [MoogLadderFilterComponent, FilterComponent,
    LfoComponent, ClockComponent, SequencerComponent, ADSRComponent, OscillatorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AudioContextModule.forRoot('balanced'),
    DragDropModule,
    FormsModule,
    KnobModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
