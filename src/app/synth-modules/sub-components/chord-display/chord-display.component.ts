import { Component, OnInit, Input } from '@angular/core';
import { ChordDisplayService } from 'src/app/services/chord-display.service';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.scss']
})
export class ChordDisplayComponent implements OnInit {
  @Input() chord_voicings;
  @Input() substituted_chord_index;

  public VF; // Vexflow
  public div: any;
  public renderer: any;
  public context: any;
  private staves: Array<any>; // array of measures (4 measures)
  private stave_length = 200; // stave length in pixels
  private displayChords: Array<any>; // display chords array of StaveNotes of length 8
  private displayVoicings: Array<Array<any>>; // 4 measures with 2 chords each one
  private vf_groups: Array<any>; // Array of vexflow groups where to put notes and to erase old measures notes

  constructor(private chordDisplayService: ChordDisplayService) {
    this.staves = new Array<any>(4); // assume 4 staves (4 chords)
  }

  ngOnInit() {
    this.chordDisplayService.subject.subscribe((indexToSubstitute) => {
      this.updateMeasure(indexToSubstitute);
    });
    this.chordDisplayService.chordNotifier.subscribe((newChords) => {
      this.chord_voicings = newChords;
      this.reinitSheet();
    });
    this.displayVoicings = [];
    this.vf_groups = [null, null, null, null];
    this.div = document.getElementById('score');
    this.VF = Vex.Flow;
    this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(900, 200);
    this.context = this.renderer.getContext();
    this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    // Creates all measures to put chords into
    for (let i = 0, x = 10, y = 40, w = this.stave_length; i < this.staves.length; i++ , x += w) {
      if (i === 0) {
        this.staves[i] = new this.VF.Stave(x, y, w);
        this.staves[i].addClef('treble').addTimeSignature('4/4');
        this.staves[i].setContext(this.context).draw();
      } else {
        this.staves[i] = new this.VF.Stave(x, y, w);
        this.staves[i].setContext(this.context).draw();
      }
    }
    this.initSheet();

  }


  // re-renders notes in the sheet.
  private initSheet() {
    this.displayChords = this.chordDisplayService.buildChordsForDisplay(this.chord_voicings);
    let index = 0;
    for (let i = 0; i < this.displayChords.length; i += 2) {
      this.displayVoicings[index] = new Array<any>(this.displayChords[i], this.displayChords[i + 1]);
      index++;
    }
    this.renderSheet();
  }

  private renderSheet(): void {
    for (let i = 0; i < this.staves.length; i++) {
      this.vf_groups[i] = this.context.openGroup();
      this.VF.Formatter.FormatAndDraw(this.context, this.staves[i], this.displayVoicings[i]);
      this.context.closeGroup();
    }
  }

  private updateMeasure(index: number): void {
    // deletes notes in previous measure, creates svg group, draw and close
    this.context.svg.removeChild(this.vf_groups[index]);
    this.vf_groups[index] = this.context.openGroup();
    const substitutedChords = [];
    for (let i = (index * 2); i < (index * 2 + 2); i++) {
      substitutedChords.push(this.chordDisplayService.createDisplayChord(this.chord_voicings[i]));
    }
    this.displayVoicings[index] = substitutedChords;
    this.VF.Formatter.FormatAndDraw(this.context, this.staves[index], this.displayVoicings[index]);
    this.context.closeGroup();
  }


  private reinitSheet(): void {
    for (let i = 0; i < this.staves.length; i++) {
      this.context.svg.removeChild(this.vf_groups[i]);
    }
    this.vf_groups = [null, null, null, null];
    this.initSheet();
  }

}
