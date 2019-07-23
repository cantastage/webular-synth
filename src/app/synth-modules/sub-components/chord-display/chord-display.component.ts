import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ReadVarExpr, rendererTypeName } from '@angular/compiler';
import { ViewFlags } from '@angular/core/src/view';
import { Chord } from 'src/app/model/modules/sequencer/prog/Chord';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.scss']
})
export class ChordDisplayComponent implements OnInit, OnChanges {
  @Input() rythmic_subdivision; // 4/4, 3/4 ecc...
  @Input() active_chord;  // current playing chord, TODO decide if it is an index or actual chord. 
  // @Input() set chord_voicings(chord_voicings: Array<Chord>) {
  //   this.chord_voicings = chord_voicings;
  //   this.updateSheet();
  // }
  @Input() chord_voicings;
  // @Input() set stocazzo(val: string) {
  //   this.stocazzo = val;
  //   console.log(this.stocazzo);
  // }

  public VF; // Vexflow 
  public div: any;
  public renderer: any;
  public context: any;
  // public stave: any;
  private staves: Array<any>;
  // private chord_voicings: Array<any>;
  private vf_formatter; // Vexflow formatter
  private vf_voice; // vexflow voice (sequence of notes/chords) can be changed to an array if there are more voices
  private vf_notes: Array<any>; // array of stave notes

  constructor() {
    this.staves = new Array<any>(4); // assume 4 staves (4 chords)
  }

  ngOnInit() {
    this.div = document.getElementById('score');
    this.VF = Vex.Flow;
    this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(500, 500);
    this.context = this.renderer.getContext();
    this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    for (let i = 0, x = 10, y = 40, w = 100; i < this.staves.length; i++ , x += w) {
      if (i === 0) {
        this.staves[i] = new this.VF.Stave(x, y, w);
        this.staves[i].addClef('treble').addTimeSignature('4/4');
        this.staves[i].setContext(this.context).draw();
      } else {
        this.staves[i] = new this.VF.Stave(x, y, w);
        this.staves[i].setContext(this.context).draw();
      }
    }
    this.updateSheet();
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.item;
    if (currentItem) {
      console.log('prev value', currentItem.previousValue);
      console.log('new value', currentItem.currentValue);
    } else {
      console.log('Non arriva una sega');
    }
  }


  // re-renders notes in the sheet. TODO check if it is good to render again all notes.
  private updateSheet() {
    // let i = 0; i < this.chord_voicings.length; i++
    for (let i = 0; i < 4; i++) {
      // for (let j = 0; j < this.chord_voicings[i].chordNotes.length; j++) {
      //   // TODO need to know and convert note names into vexflow format

      // }
      this.vf_notes = new Array<any>(1);
      for (let k = 0; k < 1; k++) {
        this.vf_notes[k] = new this.VF.StaveNote({clef: 'treble', keys: ['c/4'], duration: 'q'});
      }
      this.vf_voice = new this.VF.Voice({num_beats: 4, beat_value: 4});
      this.vf_voice.addTickables(this.vf_notes);
      this.vf_formatter = new this.VF.Formatter().joinVoices([this.vf_voice]).format([this.vf_voice], 400);
      this.vf_voice.draw(this.context, this.staves[0]);
    }
  }

}
