import { Component, OnInit } from '@angular/core';
import { ModulatorComponent } from '../IModulator';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { ParameterDescriptor, AudioParameter2 } from '../IModulable';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent extends ModulatorComponent implements OnInit {
  private _testGeneratorNode: OscillatorNode;
  private _lfoNode: OscillatorNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private _waveShapes: OscillatorType[]; // readonly
  // THINK CAREFULLY ABOUT THE TYPE BELOW
  private _rate: AudioParameter2; // readonly

  public get waveShapes(): OscillatorType[] {
    return this._waveShapes;
  }
  public get rate(): AudioParameter2 {
    return this._rate;
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
    super(contextManager); // creates the intensityNode

    this._waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];

    this._lfoNode = this.contextManager.audioContext.createOscillator();
    this._rate = new AudioParameter2(new ParameterDescriptor('rate', 1, 20, 'Hz'), this._lfoNode.frequency);
    this._lfoNode.frequency.value = this.rate.parameterDescriptor.minUIValue;
    this._lfoNode.start();
    this._lfoNode.connect(this._intensityNode);

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

  public rateChange(ctx: LfoComponent, newValue: number): void {
    // eventual checks
    ctx.rate.uiValue = Number(newValue);
    ctx.rate.audioParameter.value = Number(newValue);
  }
}
