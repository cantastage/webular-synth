import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SynthModuleContainerComponent } from './synth-module-container/synth-module-container.component';
import { AudioContext, AudioContextModule } from 'angular-audio-context';


@NgModule({
  declarations: [
    AppComponent,
    SynthModuleContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AudioContextModule.forRoot('balanced')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
