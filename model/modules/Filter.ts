class Filter implements IModule {
    private _cutoff: ModulableParameter;
    private _resonance: ModulableParameter;

    start(): void {
      throw new Error('Method not implemented.');
    }
    stop(): void {
      throw new Error('Method not implemented.');
    }
}

/*
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d")


context = new AudioContext();

osc1 = context.createOscillator();
osc1.type = "square"

/*
//BIQUAD FUNCTION

filterBiquad = context.createBiquadFilter();
filterBiquad.type = "lowpass";
filterBiquad.frequency.value = 5000;
filterBiquad.Q.value = 5;
osc1.connect(filterBiquad);
filterBiquad.connect(context.destination);
//osc1.start();
osc1.frequency.value = 440;

cutoff = document.querySelector("#cutoff");
cutoff.oninput = function(){
  console.log(this.value);
  filterBiquad.frequency.value = this.value;
}

//osc1.start();
//------------- COMMENT END HERE -------------



//AUDIO PROCESS IMPLEMENTATION -> CUSTOM FILTER

scriptNode = context.createScriptProcessor(2048,1,1);
let cutoff_freq : number = 5500;
//var cutoff_freq = 5500;
cutoff = document.querySelector("#cutoff");
cutoff.oninput = function(){
  cutoff_freq = this.value;
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

//ANALYSER NODE
var analyser = context.createAnalyser();
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

function drawSamples()
{
  analyser.getByteTimeDomainData(dataArray);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.beginPath();
  for(var i=0; i<canvas.width;i++) {
      ctx.lineTo(i, dataArray[i]);
  }
  ctx.stroke();
  requestAnimationFrame(drawSamples);
}

drawSamples();

osc1.connect(scriptNode);
scriptNode.connect(analyser);
analyser.connect(context.destination);
osc1.start();

*/

