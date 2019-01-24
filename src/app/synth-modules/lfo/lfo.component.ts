import { Component, OnInit, Input } from '@angular/core';
import { IModulatorComponent, AttachableComponent } from '../Modulator';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { ModuleComponent } from 'src/app/interfaces/module.component';
import { IUIAudioParameter, IAudioParameter, AudioParameterDescriptor, UIAudioParameter, ModulableAudioParameter, IValuable, AudioParameter, Valuable } from '../Modulation';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss', '../../app.component.scss']
})
export class LfoComponent extends AttachableComponent
  implements OnInit, ModuleComponent, IModulatorComponent {
  @Input() data: any;
  private _modulatedParameter: IUIAudioParameter<ModulableAudioParameter>;

  private _lfoNode: OscillatorNode;
  private _lfoProcessor: ScriptProcessorNode;
  // how to extract a string[] from OscillatorType?!?!?! O.O
  private _waveShapes: OscillatorType[]; // readonly
  private _intensity: IUIAudioParameter<IAudioParameter<IValuable>>; // readonly
  private _rate: IUIAudioParameter<IAudioParameter<AudioParam>>; // readonly

  public get waveShapes(): OscillatorType[] {
    return this._waveShapes;
  }
  public get intensity(): IUIAudioParameter<IAudioParameter<IValuable>> {
    return this._intensity;
  }
  public get rate(): IUIAudioParameter<IAudioParameter<IValuable>> {
    return this._rate;
  }

  public get modulatedParameter(): IUIAudioParameter<ModulableAudioParameter> {
    return this._modulatedParameter;
  }
  @Input()
  // CHECK: think of all the combo modulatedParameter x mp
  public set modulatedParameter(mp: IUIAudioParameter<ModulableAudioParameter>) {
    if (mp && mp != null) { // Attach
      this._modulatedParameter = mp;
    } else { // Detach
      this._modulatedParameter = null;
    }
  }
  private modulatingWaveShapeConfig(ape: AudioProcessingEvent): void {
    const shift = this.modulatedParameter.audioParameter.llValue;
    const posAmp: number = this.modulatedParameter.audioParameter.llDescriptor.maxValue -
      shift;
    const negAmp: number = shift -
      this.modulatedParameter.audioParameter.llDescriptor.minValue;
    const scaleFactor = this.intensity.audioParameter.llValue;
    let tmpI: number, tmpO: number;
    
    for(let chi = 0; chi < ape.inputBuffer.numberOfChannels; chi++) {
      const inputSamples = ape.inputBuffer.getChannelData(chi);
      const outputSamples = ape.outputBuffer.getChannelData(chi);
      for(let sampi = 0; sampi < inputSamples.length; sampi++) {
        tmpI = inputSamples[sampi];
        tmpO = tmpI * (tmpI > 0 ? posAmp : negAmp);
        tmpO = scaleFactor * tmpO + shift;
        outputSamples[sampi] = tmpO;
      }
    }
  }

  public constructor(private contextManager: AudioContextManagerService) {
    super();
  }

  public loadPatch(): void {
    this._lfoNode.type = 'sine'/*this.data.state.waveShape*/;

    this._intensity = new UIAudioParameter<IAudioParameter<IValuable>>(
      new AudioParameter<IValuable>(
        'intensity',
        new AudioParameterDescriptor(0, 1, 1, ''),
        new Valuable(1)
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
    this._lfoNode.connect(this._lfoProcessor);
    this._lfoNode.start();

    this.loadPatch();

    if (this.modulatedParameter.audioParameter.beginModulationConfig()) {
      this._lfoProcessor.connect(this.modulatedParameter.audioParameter.audioParam);
    }
  }

  public savePatch(): any {
    this.data.state.waveShape = this._lfoNode.type;
    this.data.state.hlIntensity = this.intensity.hlValue;
    this.data.state.hlRate = this.rate.hlValue;
    return this.data;
  }
}
