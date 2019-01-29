import { Component, OnInit, Input } from '@angular/core';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';
import { ClockProvider } from 'src/app/model/modules/clock/ClockProvider';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss', '../../app.component.scss']
})
export class ClockComponent implements OnInit, IObserver<number> {
  private _on: boolean;

  public constructor(private clockManager: ClockManagerService) { }

  public ngOnInit() {
    this._on = false;
    this.clockManager.bpm = ClockProvider.BEATS_DEFAULT;
    this.clockManager.attach(this);
  }

  public update(arg: number): void {
    this._on = true;
    setTimeout((ctx: ClockComponent) => { ctx._on = false; },
      60 / this.clockManager.bpm * 0.2 * 1000, this);
  }
}
