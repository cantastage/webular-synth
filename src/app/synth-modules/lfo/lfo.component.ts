import { Component, OnInit, Input } from '@angular/core';
import { IModulatorComponent } from '../IModulator';
import { IModulableComponent, ModulableParameter } from '../IModulable';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit, IModulatorComponent {
  private readonly _fmin = 1;
  private readonly _fmax = 20;
  private _testGeneratorNode: OscillatorNode;
  private _lfoNode: OscillatorNode;
  private _lfoAmplifier: GainNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private readonly _waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];
  private _modulatedComponent: IModulableComponent;
  private _modulatedParameter: ModulableParameter;

  get modulatedComponent(): IModulableComponent {
    return this._modulatedComponent;
  }
  @Input()
  set modulatedComponent(mm: IModulableComponent) {
    this._modulatedComponent = mm;
  }
  get modulatedParameter(): ModulableParameter {
    return this._modulatedParameter;
  }
  @Input()
  set modulatedParameter(mp: ModulableParameter) {
    this._modulatedParameter = mp;

    this._testGeneratorNode.connect(this.modulatedComponent.innerNode());
    this.modulatedComponent.innerNode().connect(this.contextManager.audioContext.destination);

    this._lfoAmplifier.gain.value = this.modulatedParameter.maxValue;
    this._lfoAmplifier.connect(this.modulatedParameter.audioParameter); // other things todo at the unset...
  }

  constructor(private contextManager: AudioContextManagerService) {
    this._lfoNode = this.contextManager.audioContext.createOscillator();
    this._lfoNode.type = 'sine';
    this._lfoNode.frequency.value = 1;
    this._lfoAmplifier = this.contextManager.audioContext.createGain();
    this._testGeneratorNode = this.contextManager.audioContext.createOscillator();
    this._testGeneratorNode.type = 'square';
    this._testGeneratorNode.frequency.value = 1000;
    this._lfoNode.start();
    this._lfoNode.connect(this._lfoAmplifier);
    this._testGeneratorNode.start();
  }

  ngOnInit() {
  }

  public waveShapeChange(eventArg: any) {
    this._lfoNode.type = eventArg.target.value;
  }

  public frequencyChange(ctx: LfoComponent, newValue: number): void {
    // eventual checks
    ctx._lfoNode.frequency.value = Number(newValue);
  }
  // IModulatorComponent members
  // CONSTRAINT CHECKS & HYPOTHETICAL FUNCTIONS REMOVAL
  // public onModulatedModuleAttach(modulableModule: IModulableComponent) {
  //   this._modulatedComponent = modulableModule; // ONLY FOR REDUNDANCY AND STATE FULLNESS
  // }
  // public onModulatedParameterAttach(modulableParameter: AudioParam) {
  //   this._modulatedParameter = modulableParameter;
  //   this._lfoNode.connect(this._modulatedParameter);
  // }
  // public onModulatedParameterDetach() {
  //   this._lfoNode.disconnect(this._modulatedParameter);
  //   this._modulatedParameter = null;
  // }
  // public onModulatedModuleDetach() {
  //   this._modulatedComponent = null;
  // }
}
