import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { AudioContextModule } from 'angular-audio-context';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MoogLadderFilterComponent } from './synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { AudioContextManagerService } from './services/audio-context-manager.service';
@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent,
    MoogLadderFilterComponent,
    AudioContextManagerService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AudioContextModule.forRoot('balanced'),
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
