import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { KnobModule } from 'ng2-knob';
// for the initialization see:
// https://www.jqwidgets.com/angular-components-documentation/documentation/angular-cli/angular-cli.htm
// for usage see:
// https://www.jqwidgets.com/angular-components-documentation/documentation/jqxknob/angular-knob-getting-started.htm?search=
import { jqxKnobComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxknob';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClockComponent } from './synth-modules/clock/clock.component';
import { SequencerComponent } from './synth-modules/sequencer/sequencer.component';
import { AddModuleDirective } from './directives/add-module.directive';
// import { KnobBigExtComponent } from './synth-modules/sub-components/knob-big-ext/knob-big-ext.component';
// import { KnobLilExtComponent } from './synth-modules/sub-components/knob-lil-ext/knob-lil-ext.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './synth-modules/filter/filter.component';
import { LfoComponent } from './synth-modules/lfo/lfo.component';

@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    ClockComponent,
    SequencerComponent,
    AddModuleDirective,
    jqxKnobComponent,
    FilterComponent,
    LfoComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
