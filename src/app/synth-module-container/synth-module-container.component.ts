import { Component, OnInit } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';

@Component({
  selector: 'app-synth-module-container',
  templateUrl: './synth-module-container.component.html',
  styleUrls: ['./synth-module-container.component.scss']
})
export class SynthModuleContainerComponent implements OnInit {

  private proc: MyWorkletNode;

  constructor(private ctxManager: AudioContextManagerService) { }

  ngOnInit() {
    this.ctxManager.audioContext.audioWorklet.addModule('../audio-processors/moog-ladder-filter.ts')
    .then(() => console.log('module added!'));
    // this.proc.
    // this.ctxManager.audioContext.createsc
  }



}

export class MyWorkletNode extends AudioWorkletNode {
  constructor(context) {
    super(context, 'prova');
  }
}

