import { Component, OnInit, Input, TemplateRef, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { SynthModule } from 'src/app/interfaces/module.component';

@Component({
  selector: 'app-moog-ladder-filter',
  templateUrl: './moog-ladder-filter.component.html',
  styleUrls: ['./moog-ladder-filter.component.scss']
})
export class MoogLadderFilterComponent implements OnInit, SynthModule, OnDestroy, OnChanges {
  @Input() data: any;
  private _oscTest: OscillatorNode;
  private _scriptNode: ScriptProcessorNode;
  public cutoff_freq: number;
  public Q: number;

  private out: number;
  private stage = Array(4).fill(0);
  private old_smp = Array(4).fill(0);

  constructor(public contextManager: AudioContextManagerService) {
  }

  ngOnInit() {
    this._oscTest = this.contextManager.audioContext.createOscillator();
    this._oscTest.type = 'square';

    this._scriptNode = this.contextManager.audioContext.createScriptProcessor(1024, 1, 1);
    this._scriptNode.onaudioprocess = ($event) => {
      this.process($event);
    };
    this.cutoff_freq = this.data.state.hlFrequency;
    this.Q = this.data.state.hlResonance;

    console.log('Provided data in input: ', this.data);
    this.contextManager.addSynthModule(this); // Adds the module to the audio context manager service
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    console.log('Changes: ', changes);
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

    // filter parameters
    // set cutoff
    const cOff = 2 * this.cutoff_freq / this.contextManager.audioContext.sampleRate;
    const p = cOff * (1.8 - 0.8 * cOff);
    const k = 2 * Math.sin(cOff * Math.PI * 0.5) - 1;
    const t1 = (1 - p) * 1.386249;
    const t2 = 12 + t1 * t1;

    // set resonance
    const res = this.Q * (t2 + 6 * t1) / (t2 - 6 * t1);

    for (let sample = 0; sample < input.length; sample++) {

      // MOOG LADDER FILTER IMPLEMENTATION DSP
      this.out = input[sample] - res * this.stage[3];

      this.stage[0] =  this.out * p + this.old_smp[1] * p - k * this.stage[1];
      this.stage[1] = this.stage[0] * p + this.old_smp[1] * p - k * this.stage[1];
      this.stage[2] = this.stage[1] * p + this.old_smp[2] * p - k * this.stage[2];
      this.stage[3] = this.stage[2] * p + this.old_smp[3] * p - k * this.stage[3];

      this.stage[3] = this.stage[3] - (this.stage[3] * this.stage[3] * this.stage[3]) / 6;

      this.old_smp[0] = this.out;
      this.old_smp[1] = this.stage[0];
      this.old_smp[2] = this.stage[1];
      this.old_smp[3] = this.stage[2];

      output[sample] = this.stage[3];
    }
  }

  play(): void {
    this._oscTest.start();
    this._oscTest.connect(this._scriptNode);
  }

  stop(): void {
    this._oscTest.stop();
    this._oscTest.disconnect(this._scriptNode);
  }

  deleteNode(): void {
    this._oscTest.disconnect(this._scriptNode);
  }

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

  public getOutput(): AudioNode {
    return this._scriptNode;
  }

  public connectToSynthNode(node: AudioNode) {
    node.connect(this._scriptNode);
  }

  public disconnectSynthModule() {
    this._scriptNode.disconnect();
  }

  public savePatch() {
    this.data.state.hlFrequency = this.cutoff_freq;
    this.data.state.hlResonance = this.Q;
    return this.data;
  }
}
