import { Component, OnInit, Input } from '@angular/core';
import { ModulatorComponent } from '../IModulator';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent extends ModulatorComponent implements OnInit {
  private _minModulationFrequency: number; // readonly
  private _maxModulationFrequency: number; // readonly
  private _defMeasurementUnit: string; // readonly

  private _testGeneratorNode: OscillatorNode;
  private _lfoNode: OscillatorNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private _waveShapes: OscillatorType[]; // readonly

  public get waveShapes(): OscillatorType[] {
    return this._waveShapes;
  }
  public get minModulationFrequency(): number {
    return this._minModulationFrequency;
  }
  public get maxModulationFrequency(): number {
    return this._maxModulationFrequency;
  }
  public get defMeasurementUnit(): string {
    return this._defMeasurementUnit;
  }

  protected onModulatedComponentAttach(): void {
    // nothing todo
    return;
  }
  protected onModulatedComponentDetach(): void {
    // nothing todo
    return;
  }
  protected onModulatedParameterAttach(): void {
    // this.modulatedParameter is defined: create connections
    this._testGeneratorNode.connect(this.modulatedComponent.innerNode());

    // shouldn't exist:
    this.modulatedComponent.innerNode().connect(this.contextManager.audioContext.destination);
  }
  protected onModulatedParameterDetach(): void {
    // symmetric disconnections: this.modulatedParameter is going to be set to null
    // shouldn't exist:
    this.modulatedComponent.innerNode().disconnect(this.contextManager.audioContext.destination);

    this._testGeneratorNode.disconnect(this.modulatedComponent.innerNode());
  }

  public constructor(private contextManager: AudioContextManagerService) {
    super(contextManager); // creates the _fxAmplifier

    this._waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];
    this._minModulationFrequency = 1;
    this._maxModulationFrequency = 20;
    this._defMeasurementUnit = 'Hz';

    this._lfoNode = this.contextManager.audioContext.createOscillator();
    this._lfoNode.frequency.value = this.minModulationFrequency;
    this._lfoNode.start();
    this._lfoNode.connect(this._fxAmplifier);

    // remove below after tests...
    this._testGeneratorNode = this.contextManager.audioContext.createOscillator();
    this._testGeneratorNode.type = 'square';
    this._testGeneratorNode.frequency.value = 1000;
    this._testGeneratorNode.start();
  }

  public ngOnInit() {
  }

  public waveShapeChange(eventArg: any) {
    this._lfoNode.type = eventArg.target.value;
  }

  public frequencyChange(ctx: LfoComponent, newValue: number): void {
    // eventual checks
    ctx._lfoNode.frequency.value = Number(newValue);
  }
}
