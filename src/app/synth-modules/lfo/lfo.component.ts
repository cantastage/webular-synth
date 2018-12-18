import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lfo',
  templateUrl: './lfo.component.html',
  styleUrls: ['./lfo.component.scss']
})
export class LfoComponent implements OnInit {
  private _frequency: number;
  private readonly _waveShapes = ['sin', 'tri', 'saw', 'sqare'];

  constructor() { }

  ngOnInit() {
  }

}
// https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-audio-and-midi-api-amplitude-modulation/
