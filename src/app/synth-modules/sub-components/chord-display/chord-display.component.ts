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
  public div: any;
  public renderer: any;
  public context: any;
  // public stave: any;
  private staves: Array<any>;

  constructor() {
    this.staves = new Array<any>(4); // assume 4 staves (4 chords)
    // this.staves.forEach(s => {
    //   s = new this.VF.Stave(10, 40, 400);
    //   // s.addClef('treble').addTimeSignature('4/4');
    // });
  }

  ngOnInit() {
    this.div = document.getElementById('score');
    this.VF = Vex.Flow;
    // this.stave = new this.VF.Stave(10, 40, 400);
    this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(500, 500);
    this.context = this.renderer.getContext();
    this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    // this.stave.addClef('treble').addTimeSignature('4/4');
    // this.stave.setContext(this.context).draw();
    for (let i = 0, x = 10, y = 40, w = 400; i < this.staves.length; i++ , x += 400) {
      if (i === 0) {
        this.staves[i] = new this.VF.Stave(x, y, w);
        this.staves[i].addClef('treble').addTimeSignature('4/4');
        this.staves[i].setContext(this.context).draw();
      } else {
        this.staves[i] = new this.VF.Stave(x, y, w);
        this.staves[i].setContext(this.context).draw();
      }

    }
    // this.staves.forEach(s => {
    //   s = new this.VF.Stave(10, 40, 400);
    //   s.addClef('treble').addTimeSignature('4/4');
    //   s.setContext(this.context).draw();
    // });
  }

}
