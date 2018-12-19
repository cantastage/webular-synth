import { Component, OnInit } from '@angular/core';
import { IModulatorComponent } from '../IModulator';
import { IModulableComponent } from '../IModulable';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit, IModulatorComponent {
  private _oscillator: OscillatorNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private readonly _waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];
  private _modulatedModule: IModulableComponent;
  private _modulatedParameter: AudioParam;

  constructor(private contextManager: AudioContextManagerService) { }

  ngOnInit() {
    this._oscillator = this.contextManager.audioContext.createOscillator();
    this._oscillator.start();
  }

  public waveShapeChange(eventArg: any) {
    this._oscillator.type = eventArg.target.value;
  }

  public frequencyChange(ctx: LfoComponent, newValue: number): void {
    // eventual checks
    ctx._oscillator.frequency.value = Number(newValue);
  }
  // IModulatorComponent members
  // CONSTRAINT CHECKS & HYPOTHETICAL FUNCTIONS REMOVAL
  public onModulatedModuleAttach(modulableModule: IModulableComponent) {
    this._modulatedModule = modulableModule; // ONLY FOR REDUNDANCY AND STATE FULLNESS
  }
  public onModulatedParameterAttach(modulableParameter: AudioParam) {
    this._modulatedParameter = modulableParameter;
    this._oscillator.connect(this._modulatedParameter);
  }
  public onModulatedParameterDetach() {
    this._oscillator.disconnect(this._modulatedParameter);
    this._modulatedParameter = null;
  }
  public onModulatedModuleDetach() {
    this._modulatedModule = null;
  }
}
