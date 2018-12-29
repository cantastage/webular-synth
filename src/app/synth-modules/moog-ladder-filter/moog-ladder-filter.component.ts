import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { ModuleComponent } from 'src/app/interfaces/module.component';

@Component({
  selector: 'app-moog-ladder-filter',
  templateUrl: './moog-ladder-filter.component.html',
  styleUrls: ['./moog-ladder-filter.component.scss']
})
export class MoogLadderFilterComponent implements OnInit, ModuleComponent, OnDestroy {
  @Input() data: any;
  private _osc: OscillatorNode;
  private _scriptNode: ScriptProcessorNode;
  public cutoff_freq: number;
  public Q: number;
  // private resonance: any;

  private in0 = 0;
  private in1 = 0;
  private out0 = 0;
  private out1 = 0;

  constructor(public contextManager: AudioContextManagerService) {
  }

  ngOnInit() {
    this._osc = this.contextManager.audioContext.createOscillator();
    this._osc.type = 'square';
    this._osc.start();

    this._scriptNode = this.contextManager.audioContext.createScriptProcessor(2048, 1, 1);
    this._scriptNode.onaudioprocess = ($event) => {
      this.process($event);
    };
    this.cutoff_freq = 5500;
    this.Q = 0.5;


    // this._osc.connect(this._scriptNode);
    this._scriptNode.connect(this.contextManager.audioContext.destination);
    // this._osc.connect(this.contextManager.audioContext.destination);
    // this._osc.start();
  }

  public onCutoffChange(arg: any): void {
    this.cutoff_freq = arg.target.value;
  }

  public onResonanceChange(arg: any): void {
    this.Q = arg.target.value;
  }

  private process(audioData) {
    const input = audioData.inputBuffer.getChannelData(0);
    const output = audioData.outputBuffer.getChannelData(0);

    const cutoff_omega = 2 * Math.PI * this.cutoff_freq / this.contextManager.audioContext.sampleRate;
    // Ts = 1/(context.sampleRate);
    const alpha = Math.sin(cutoff_omega) / (2 * this.Q);

    // filter coefficients
    const b0 = (1 - Math.cos(cutoff_omega)) / 2;
    const b1 = 1 - Math.cos(cutoff_omega);
    const b2 = b0;
    const a0 = 1 + alpha;
    const a1 = -2 * Math.cos(cutoff_omega);
    const a2 = 1 - alpha;

    let outnow = 0; // declared here for optimization
    for (let sample = 0; sample < input.length; sample++) {
      // BIQUAD IMPLEMENTATION
      outnow = b0 / a0 * input[sample] + b1 / a0 * this.in0 + b2 / a0 * this.in1 - a1 / a0 * this.out0 - a2 / a0 * this.out1;
      this.out1 = this.out0;
      this.out0 = outnow;
      this.in1 = this.in0;
      this.in0 = input[sample];
      output[sample] = outnow;
    }
    // console.log(this.cutoff_freq);
  }

  play(): void {
    // this._osc.start();
    this._osc.connect(this._scriptNode);
  }

  stop(): void {
    // this._osc.stop();
    this._osc.disconnect(this._scriptNode);
  }

  // deleteNode(): void {
  //   this._osc.disconnect(this._scriptNode);
  // }

  connectScriptNode(): void {
    this._scriptNode.connect(this.contextManager.audioContext.destination);
  }

  disconnectScriptNode(): void {
    this._scriptNode.disconnect(this.contextManager.audioContext.destination);
  }

  ngOnDestroy(): void {
    console.log('Ladder filter is being destroyed');
    // throw new Error('Method not implemented.');
  }
}
