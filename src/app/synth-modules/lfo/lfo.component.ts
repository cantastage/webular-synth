import { Component, OnInit, Input } from '@angular/core';
import { IModulatorComponent, AttachableComponent } from '../Modulator';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { SynthModule } from 'src/app/interfaces/module.component';
import {
  IUIAudioParameter, IAudioParameter,
  AudioParameterDescriptor, UIAudioParameter, ModulableAudioParameter, AudioParameter
} from '../Modulation';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss', '../../app.component.scss']
})
export class LfoComponent extends AttachableComponent
  implements OnInit, IModulatorComponent {
  @Input() data: any;
  private _modulatedParameter: ModulableAudioParameter;

  private _lfoNode: OscillatorNode;
  private _lfoProcessor: ScriptProcessorNode;
  private _processorAmplifier: GainNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private _waveShapes: OscillatorType[]; // readonly
  private _intensity: IUIAudioParameter<IAudioParameter<AudioParam>>; // readonly
  private _rate: IUIAudioParameter<IAudioParameter<AudioParam>>; // readonly

  public get waveShapes(): OscillatorType[] {
    return this._waveShapes;
  }
  public get intensity(): IUIAudioParameter<IAudioParameter<AudioParam>> {
    return this._intensity;
  }
  public get rate(): IUIAudioParameter<IAudioParameter<AudioParam>> {
    return this._rate;
  }

  public get modulatedParameter(): ModulableAudioParameter {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: ModulableAudioParameter) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;
    } else { // Detach
      this._modulatedParameter = null;
    }
  }
  private modulatingWaveShapeConfig(ape: AudioProcessingEvent): void {
    const I: number = this.intensity.audioParameter.llValue;
    const max: number = this.modulatedParameter.llDescriptor.maxValue;
    const uiVal: number = this.modulatedParameter.llValue;
    const posAmp: number = (max - uiVal) / max;
    const negAmp: number = uiVal / max;
    const shift = negAmp / I;
    let tmpI: number, tmpO: number;

    for (let chi = 0; chi < ape.inputBuffer.numberOfChannels; chi++) {
      const inputSamples = ape.inputBuffer.getChannelData(chi);
      const outputSamples = ape.outputBuffer.getChannelData(chi);
      for (let sampi = 0; sampi < inputSamples.length; sampi++) {
        tmpI = inputSamples[sampi];
        tmpO = tmpI * (tmpI > 0 ? posAmp : negAmp);
        tmpO = tmpO + shift;
        outputSamples[sampi] = tmpO;
      }
    }
  }

  public constructor(private contextManager: AudioContextManagerService) {
    super();
  }

  public loadPatch(): void {
    this._lfoNode.type = 'sine'/*this.data.state.waveShape*/;

    this._intensity = new UIAudioParameter<IAudioParameter<AudioParam>>(
      new AudioParameter<AudioParam>(
        'intensity',
        new AudioParameterDescriptor(
          this.modulatedParameter.llDescriptor.minValue,
          this.modulatedParameter.llDescriptor.defaultValue,
          this.modulatedParameter.llDescriptor.maxValue,
          'Hz'
        ),
        this._processorAmplifier.gain
      ),
      new AudioParameterDescriptor(0, 100/*this.data.state.hlIntensity*/, 100, '%')
    );
    this._rate = new UIAudioParameter<IAudioParameter<AudioParam>>(
      new AudioParameter<AudioParam>(
        'rate',
        new AudioParameterDescriptor(0, 1, 20, 'Hz'),
        this._lfoNode.frequency
      ),
      new AudioParameterDescriptor(0, 10/*this.data.state.hlRate*/, 200, 'dHz')
    );
  }

  public ngOnInit() {
    this._waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];

    this._lfoNode = this.contextManager.audioContext.createOscillator();
    this._lfoProcessor = this.contextManager.audioContext.createScriptProcessor(2 ** 11);
    this._lfoProcessor.onaudioprocess = (arg: AudioProcessingEvent) => {
      this.modulatingWaveShapeConfig(arg);
    }
    this._processorAmplifier = this.contextManager.audioContext.createGain();

    this._lfoNode.connect(this._lfoProcessor);
    this._lfoProcessor.connect(this._processorAmplifier);
    this._lfoNode.start();

    this.loadPatch();

    if (this.modulatedParameter.beginModulationConfig()) {
      this._processorAmplifier.connect(this.modulatedParameter.audioParam);
    }
  }

  public savePatch(): any {
    this.data.state.waveShape = this._lfoNode.type;
    this.data.state.hlIntensity = this.intensity.hlValue;
    this.data.state.hlRate = this.rate.hlValue;
    return this.data;
  }
}
