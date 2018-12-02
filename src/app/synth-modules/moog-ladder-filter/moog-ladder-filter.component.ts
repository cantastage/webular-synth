import { Component, OnInit } from '@angular/core';
import { extend } from 'webdriver-js-extender';

@Component({
  selector: 'app-moog-ladder-filter',
  templateUrl: './moog-ladder-filter.component.html',
  styleUrls: ['./moog-ladder-filter.component.scss']
})
export class MoogLadderFilterComponent extends AudioWorkletNode implements OnInit {

  constructor(context: AudioContext) {
    super(context, 'moog-ladder-filter');
  }

  ngOnInit() {
  }

}
