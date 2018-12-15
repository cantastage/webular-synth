import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { KnobComponent } from 'ng2-knob';

@Component({
  selector: 'app-knob-ext',
  templateUrl: './knob-ext.component.html',
  styleUrls: ['./knob-ext.component.scss']
})
export class KnobExtComponent extends KnobComponent implements OnInit {
  @Input()
  _min: number;
  @Input()
  _max: number;
  @Input()
  _value: number;
  @Input()
  _change: any;
  @Input()
  _measureUnit: string;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
