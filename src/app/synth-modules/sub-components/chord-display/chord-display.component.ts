import { Component, OnInit } from '@angular/core';
import { ReadVarExpr, rendererTypeName } from '@angular/compiler';
import { ViewFlags } from '@angular/core/src/view';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.scss']
})
export class ChordDisplayComponent implements OnInit {
  public VF;
  // private static vf: any = Vex.Flow;
  // // private score: any;
  // // private system: any;
  // private div: any;
  // private renderer: any;
  // private context: any;
  // private stave: any;

  constructor() {
    // this.vf = Vex.Flow;
    // this.score = this.vf.EasyScore();
    // this.system = this.vf.System();
    // this.div = document.getElementById('boo');
    // this.renderer = new ChordDisplayComponent.vf.Renderer(this.div, ChordDisplayComponent.vf.Renderer.Backends.SVG);
    // this.renderer.resize(500, 500);
    // this.context = this.renderer.getContext();
    // this.stave = new ChordDisplayComponent.vf.Stave(10, 40, 400);
    // this.stave.addClef('treble').addTimeSignature('4/4');
  }

  ngOnInit() {
    // this.stave.setContext(this.context).draw();
    const div = document.getElementById('boo');
    this.VF = Vex.Flow;
    const renderer = new this.VF.Renderer(div, this.VF.Renderer.Backends.SVG);
    renderer.resize(500, 500);
    const context = renderer.getContext();
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    const stave = new this.VF.Stave(10, 40, 400);
    stave.addClef('treble').addTimeSignature('4/4');
    stave.setContext(context).draw();
  }

}
