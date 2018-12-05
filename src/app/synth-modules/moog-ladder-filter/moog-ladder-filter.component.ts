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

  constructor(private contextManager: AudioContextManagerService) {
  }

  ngOnInit() {
    this._osc = this.contextManager.audioContext.createOscillator();
    this._osc.type = 'square';

    this._scriptNode = this.contextManager.audioContext.createScriptProcessor(2048, 1, 1);
    this.cutoff_freq = 5500;
  }

  public onCutoffChange(arg: any): void {
    // this.cutoff_freq = arg; // something similar
    console.log(arg);
  }

}


/*
cutoff = document.querySelector("#cutoff");
cutoff.oninput = function(){
  console.log(cutoff_freq);

}

var Q = 0.5;
resonance = document.querySelector("#resonance");
resonance.oninput = function(){
  Q = this.value;
}


var out0, out1, in0, in1;
out0 = out1 = in0 = in1 = 0;
scriptNode.onaudioprocess = function(audioData){
  var input = audioData.inputBuffer.getChannelData(0);
  var output = audioData.outputBuffer.getChannelData(0);
  
  var cutoff_omega = 2 * Math.PI * cutoff_freq / context.sampleRate;
  //Ts = 1/(context.sampleRate);
  alpha = Math.sin(cutoff_omega) / (2*Q);
  
  //filter coefficients
  b0 = (1 - Math.cos(cutoff_omega))/2;
  b1 = 1 - Math.cos(cutoff_omega);
  b2 = b0;
  a0 = 1 + alpha;
  a1 = -2 * Math.cos(cutoff_omega);
  a2 = 1 - alpha;
  
  for(var sample = 0; sample<input.length; sample++){
    //BIQUAD IMPLEMENTATION
    
    outnow = b0/a0 *input[sample] + b1/a0 * in0 + b2/a0 *in1 - a1/a0 * out0 -a2/a0 *out1;
    out1=out0;
    out0 = outnow;
    in1=in0;
    in0 = input[sample];
    output[sample] = outnow;
    
  }
}

*/