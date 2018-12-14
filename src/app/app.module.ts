import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
// import { AudioContextModule } from 'angular-audio-context';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoogLadderFilterComponent } from './synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { OscillatorComponent } from './synth-modules/oscillator/oscillator.component';
import { KnobComponent } from './synth-module/sub-components/knob/knob.component';
@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    MoogLadderFilterComponent,
    OscillatorComponent,
    KnobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AudioContextModule.forRoot('balanced'),
    DragDropModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
