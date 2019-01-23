import { Component, OnInit, Input } from '@angular/core';
import { ModulatorComponent } from '../Modulator';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { ModuleComponent } from 'src/app/interfaces/module.component';
import { IUIAudioParameter, AudioParameter, AudioParameterDescriptor, UIAudioParameter } from '../Modulation';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss', '../../app.component.scss']
})
export class LfoComponent extends ModulatorComponent implements OnInit, ModuleComponent {
  @Input() data: any;

  private _testGeneratorNode: OscillatorNode;
  private _lfoNode: OscillatorNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private _waveShapes: OscillatorType[]; // readonly
  private _rate: IUIAudioParameter<AudioParameter>; // readonly

  public get waveShapes(): OscillatorType[] {
    return this._waveShapes;
  }
  public get rate(): IUIAudioParameter<AudioParameter> {
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
    this._testGeneratorNode.connect(this.modulatedComponent.innerNode);

    // shouldn't exist:
    this.modulatedComponent.innerNode.connect(this.contextManager.audioContext.destination);
  }
  protected onModulatedParameterDetach(): void {
    // symmetric disconnections: this.modulatedParameter is going to be set to null
    // shouldn't exist:
    this.modulatedComponent.innerNode.disconnect(this.contextManager.audioContext.destination);

    this._testGeneratorNode.disconnect(this.modulatedComponent.innerNode);
  }

  public constructor(private contextManager: AudioContextManagerService) {
    super(contextManager); // creates the intensityNode

    this._waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];

    this._lfoNode = this.contextManager.audioContext.createOscillator();
    this._rate = new UIAudioParameter<AudioParameter>(
      new AudioParameter(
        'rate',
        new AudioParameterDescriptor(0, 5, 20, 'Hz'),
        this._lfoNode.frequency
      ),
      new AudioParameterDescriptor(0, 50, 200, 'dHz')
    );
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
}
