import { Component, OnInit, Input } from '@angular/core';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { IObserver } from 'src/app/system2/patterns/observer/IObserver';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss', '../../app.component.scss']
})
export class ClockComponent implements OnInit, IObserver<number> {
  @Input() data: any;
  private _on: boolean;

  public constructor(private clockManager: ClockManagerService) { }

  public loadPatch(): void {
    this.clockManager.bpm = this.data.state.bpm;
    this.clockManager.attach(this);
  }

  public ngOnInit() {
    this._on = false;
    this.loadPatch();
  }

  public savePatch(): any {
    this.clockManager.detach(this);
    this.data.state.bpm = this.clockManager.bpm;
    return this.data;
  }

  public update(arg: number): void {
    this._on = true;
    setTimeout((ctx: ClockComponent) => { ctx._on = false; },
      60 / this.clockManager.bpm * 0.2 * 1000, this);
  }
}
