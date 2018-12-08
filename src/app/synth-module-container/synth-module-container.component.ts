import { Component, OnInit } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';

@Component({
  selector: 'app-synth-module-container',
  templateUrl: './synth-module-container.component.html',
  styleUrls: ['./synth-module-container.component.scss']
})
export class SynthModuleContainerComponent implements OnInit {

  // private proc: MyWorkletNode;

  constructor(private ctxManager: AudioContextManagerService) { }

  ngOnInit() {
  }



}

// export class MyWorkletNode extends AudioWorkletNode {
//   constructor(context) {
//     super(context, 'moog-ladder-filter');
//   }
// }

