import { Component, OnInit } from '@angular/core';
import { ClockManagerService } from 'src/app/services/clock-manager.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  constructor(private clockManager: ClockManagerService) { }

  ngOnInit() {
    this.clockManager.start();
  }

  bpmChange(sender: any): void {
    // eventual checks
    this.clockManager.bpm = sender.target.value;
  }
}
