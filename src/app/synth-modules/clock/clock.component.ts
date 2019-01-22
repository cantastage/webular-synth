import { Component, OnInit } from '@angular/core';
import { ClockManagerService } from 'src/app/services/clock-manager.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss', '../../app.component.scss']
})
export class ClockComponent implements OnInit {
  public constructor(private clockManager: ClockManagerService) { }

  public ngOnInit() {
  }

  public onChange(eventArg: any): void {
    this.clockManager.bpm = Number(eventArg);
  }
}
