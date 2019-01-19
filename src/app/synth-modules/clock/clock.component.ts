import { Component, OnInit } from '@angular/core';
import { ClockManagerService } from 'src/app/services/clock-manager.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  style: any =
  {
      stroke: '#dfe3e9',
      strokeWidth: 3,
      fill: { color: '#fefefe', gradientType: 'linear', gradientStops: [[0, 1], [50, 0.9], [100, 1]] }
  };
  marks: any =
  {
      colorRemaining: { color: 'grey', border: 'grey' },
      colorProgress: { color: '#00a4e1', border: '#00a4e1' },
      type: 'line',
      offset: '71%',
      thickness: 3,
      size: '6%',
      majorSize: '9%',
      majorInterval: 10,
      minorInterval: 2
  };
  labels: any =
  {
      offset: '88%',
      step: 10,
      visible: false
  };
  progressBar: any =
  {
      style: { fill: '#00a4e1', stroke: 'grey' },
      size: '9%',
      offset: '60%',
      background: { fill: 'grey', stroke: 'grey' }
  };
  pointer: any =
  {
      type: 'arrow',
      style: { fill: '#00a4e1', stroke: 'grey' },
      size: '59%',
      offset: '49%',
      thickness: 5
  };

  public constructor(private clockManager: ClockManagerService) { }

  public ngOnInit() {
  }

  public start(): void {
    this.clockManager.start();
  }
  public stop(): void {
    this.clockManager.stop();
  }

  public onChange(eventArg: any): void {
    this.clockManager.bpm = Number(eventArg.args.value);
  }
}
