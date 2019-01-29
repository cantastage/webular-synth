import { Component, OnInit, Input } from '@angular/core';
import { IModulatorComponent } from '../IModulatorComponent';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

import {
  IUIAudioParameter, IAudioParameter,
  AudioParameterDescriptor, UIAudioParameter, IModulableAudioParameter, AudioParameter
} from '../AudioParameter';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss', '../../app.component.scss']
})
// STRICT ASSUMPTION, I'M ALWAYS ATTACHED TO SOME OTHER MODULABLE COMPONENT
export class LfoComponent implements OnInit, IModulatorComponent {
  private _modulatedParameter: IModulableAudioParameter;

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

  public get modulatedParameter(): IModulableAudioParameter {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: IModulableAudioParameter) {
    if (this.modulatedParameter !== undefined && this.modulatedParameter.endModulationConfig()) {
      this._processorAmplifier.disconnect(this.modulatedParameter.audioParam);
    }
    if(mp !== undefined) {
      this._modulatedParameter = mp;
      this.loadPatch();
      if (this.modulatedParameter.beginModulationConfig()) {
        this._processorAmplifier.connect(this.modulatedParameter.audioParam);
      }
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
    this._waveShapes = ['sine', 'square', 'sawtooth', 'triangle'];

    this._lfoNode = this.contextManager.audioContext.createOscillator();
    this._lfoNode.type = 'sine';
    this._lfoProcessor = this.contextManager.audioContext.createScriptProcessor(2 ** 11);
    this._lfoProcessor.onaudioprocess = (arg: AudioProcessingEvent) => {
      this.modulatingWaveShapeConfig(arg);
    }
    this._processorAmplifier = this.contextManager.audioContext.createGain();

    this._lfoNode.connect(this._lfoProcessor);
    this._lfoProcessor.connect(this._processorAmplifier);
    this._lfoNode.start();
  }

  public loadPatch(): void {
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
      new AudioParameterDescriptor(0, 0, 100, '%')
    );
    this._rate = new UIAudioParameter<IAudioParameter<AudioParam>>(
      new AudioParameter<AudioParam>(
        'rate',
        new AudioParameterDescriptor(0, 1, 20, 'Hz'),
        this._lfoNode.frequency
      ),
      new AudioParameterDescriptor(0, 10, 200, 'dHz')
    );
  }

  public ngOnInit() {
  }
}
