import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ReadVarExpr, rendererTypeName } from '@angular/compiler';
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
  private stave_length = 400; // stave length in pixels

  constructor() {
    this.staves = new Array<any>(4); // assume 4 staves (4 chords)
  }

  ngOnInit() {
    this.div = document.getElementById('score');
    this.VF = Vex.Flow;
    this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(1000, 1000);
    this.context = this.renderer.getContext();
    this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
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
    // this.updateSheet();
    const notes = [
      // A quarter-note C.
      new this.VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' }),

      // A quarter-note D.
      new this.VF.StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new this.VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),

      // A C-Major chord.
      new this.VF.StaveNote({ clef: 'treble', keys: ['c/4', 'e/4', 'g/4'], duration: 'q' })];

      // NOTA diesis e bemolli se non in chiave vanno renderizzati esplicitamente con la chiamata addAccidental
    let notes2 = [new this.VF.StaveNote({ clef: 'treble', keys: ['d/4', 'f#/4', 'a/4'], duration: 'w' })
    .addAccidental(1, new this.VF.Accidental('#'))];

    let voice = new this.VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes2);

    let formatter = new this.VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(this.context, this.staves[0]);
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
        this.vf_notes[k] = new this.VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' });
        this.vf_voice = new this.VF.Voice({ num_beats: 4, beat_value: 4 });
        this.vf_voice.addTickables(this.vf_notes);
        this.vf_formatter = new this.VF.Formatter().joinVoices([this.vf_voice]).format([this.vf_voice], 400);
        this.vf_voice.draw(this.context, this.staves[0]);
      }

    }
  }

}
