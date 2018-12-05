import { Component, OnInit } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';

@Component({
  selector: 'app-moog-ladder-filter',
  templateUrl: './moog-ladder-filter.component.html',
  styleUrls: ['./moog-ladder-filter.component.scss']
})
export class MoogLadderFilterComponent implements OnInit {
  
  private _osc: any;
  private _scriptNode: any;
  public cutoff_freq: number;
  public Q: number;

  private in0: any;
  private in1: any;
  private out0: any;
  private out1: any;

  constructor(private contextManager: AudioContextManagerService) {
  }

  ngOnInit() {
    this._osc = this.contextManager.audioContext.createOscillator();
    this._osc.type = 'square';

    this._scriptNode = this.contextManager.audioContext.createScriptProcessor(2048, 1, 1);
    this._scriptNode.onaudioprocess = this.process;
    this.cutoff_freq = 5500;
    this.Q = 0.5;

    this._osc.connect(this._scriptNode);
    this._scriptNode.connect(this.contextManager.audioContext.destination);
    this._osc.start();
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

    for (let sample = 0; sample < input.length; sample++) {
      // BIQUAD IMPLEMENTATION
      const outnow = b0 / a0 * input[sample] + b1 / a0 * this.in0 + b2 / a0 * this.in1 - a1 / a0 * this.out0 - a2 / a0 * this.out1;
      this.out1 = this.out0;
      this.out0 = outnow;
      this.in1 = this.in0;
      this.in0 = input[sample];
      output[sample] = outnow;
    }
  }
}
