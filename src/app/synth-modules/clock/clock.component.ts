import { Component, OnInit, Input } from '@angular/core';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { ClockProvider } from 'src/app/model/modules/clock/ClockProvider';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss', '../../app.component.scss']
})
export class ClockComponent implements OnInit {
  private _clockObserver: Observer<number>;
  private _on: boolean;
  public get on(): boolean {
    return this._on;
  }
  public constructor(public clockManager: ClockManagerService) {
    this._clockObserver = {
      next: (value) => { this.onTick(value); },
      error: (error) => { return; },
      complete: () => { return; }
    };
  }

  public ngOnInit() {
    this._on = false;
    this.clockManager.bpm = ClockProvider.BEATS_DEFAULT;
    this.clockManager.attach(this._clockObserver);
  }

  private onTick(arg: number): void {
    this._on = true;
    setTimeout((ctx: ClockComponent) => { ctx._on = false; },
      60 / this.clockManager.bpm * 0.2 * 1000, this);
  }
}
