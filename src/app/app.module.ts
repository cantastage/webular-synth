import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KnobModule } from 'ng2-knob';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClockComponent } from './synth-modules/clock/clock.component';
import { SequencerComponent } from './synth-modules/sequencer/sequencer.component';
import { AddModuleDirective } from './directives/add-module.directive';
import { KnobBigExtComponent } from './synth-modules/sub-components/knob-big-ext/knob-big-ext.component';
import { KnobLilExtComponent } from './synth-modules/sub-components/knob-lil-ext/knob-lil-ext.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './synth-modules/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    ClockComponent,
    SequencerComponent,
    AddModuleDirective,
    KnobBigExtComponent,
    KnobLilExtComponent,
    FilterComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    KnobModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
