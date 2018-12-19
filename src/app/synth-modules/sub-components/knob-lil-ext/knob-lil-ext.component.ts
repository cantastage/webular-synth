import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { KnobComponent } from 'ng2-knob';

@Component({
  selector: 'app-knob-lil-ext',
  templateUrl: './knob-lil-ext.component.html',
  styleUrls: ['./knob-lil-ext.component.scss']
})
export class KnobLilExtComponent extends KnobComponent implements OnInit {
  @Input()
  _min: number;
  @Input()
  _max: number;
  @Input()
  private _value: number;
  @Input()
  _change: any;
  @Input()
  _measurementUnit: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
