import { Component, OnInit } from '@angular/core';
import { IClock } from '../../model/modules/clocks/IClock';
import { ClockProvider } from '../../model/modules/clocks/ClockProvider';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  private _clock: IClock;

  constructor() { }

  ngOnInit() {
    this._clock = ClockProvider.retrieveInstance();
    this._clock.start();
  }

}
