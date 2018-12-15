import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KnobModule } from 'ng2-knob';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoogLadderFilterComponent } from './synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { ClockComponent } from './synth-modules/clock/clock.component';
import { SequencerComponent } from './synth-modules/sequencer/sequencer.component';
import { PolyphonicOscComponent } from './synth-modules/polyphonic-osc/polyphonic-osc.component';
import { AddModuleDirective } from './directives/add-module.directive';
import { KnobComponent } from './synth-modules/sub-components/knob/knob.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    MoogLadderFilterComponent,
    ClockComponent,
    SequencerComponent,
    PolyphonicOscComponent,
    AddModuleDirective,
    KnobComponent,
  ],
  entryComponents: [MoogLadderFilterComponent],
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
