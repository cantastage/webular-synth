import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { KnobComponent } from 'ng2-knob';

@Component({
  selector: 'app-knob-big-ext',
  templateUrl: './knob-big-ext.component.html',
  styleUrls: ['./knob-big-ext.component.scss']
})
export class KnobBigExtComponent extends KnobComponent implements OnInit {
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
