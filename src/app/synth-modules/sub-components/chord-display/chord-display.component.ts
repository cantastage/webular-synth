import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ReadVarExpr, rendererTypeName } from '@angular/compiler';
import { Chord } from 'src/app/model/modules/sequencer/Chord';
import { ChordDisplayService } from 'src/app/services/chord-display.service';

@Component({
  selector: 'app-chord-display',
  templateUrl: './chord-display.component.html',
  styleUrls: ['./chord-display.component.scss']
})
export class ChordDisplayComponent implements OnInit, OnChanges {
  // @Input() rythmic_subdivision; // 4/4, 3/4 ecc...
  @Input() active_chord_index;  // current playing chord, TODO decide if it is an index or actual chord. MEGLIO index
  @Input() chord_voicings;
  @Input() substituted_chord_index;
  @Input() rollback;

  public VF; // Vexflow
  public div: any;
  public renderer: any;
  public context: any;
  private staves: Array<any>; // array di battute, sono 4
  private vf_formatter; // Vexflow formatter
  private vf_voice; // vexflow voice (sequence of notes/chords) can be changed to an array if there are more voices
  private vf_notes: Array<any>; // array of stave notes
  private stave_length = 200; // stave length in pixels
  private displayChords: Array<any>; // display chords array of StaveNotes of length 8
  private displayVoicings: Array<Array<any>>; // 4 measures with 2 chords each one
  private vf_groups: Array<any>; // Array of vexflow groups where to put notes and to erase old measures notes
  // private group: any; // gruppo svg


  constructor(private chordDisplayService: ChordDisplayService) {
    this.staves = new Array<any>(4); // assume 4 staves (4 chords)
  }

  ngOnInit() {
    this.chordDisplayService.subject.subscribe((indexToSubstitute) => {
      this.updateMeasure(indexToSubstitute);
    });
    // init local variables
    this.displayVoicings = [];
    this.vf_groups = [null, null, null, null];
    this.div = document.getElementById('score');
    this.VF = Vex.Flow;
    this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(1000, 300);
    this.context = this.renderer.getContext();
    this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed');
    // Creo tutte le misure in cui mettere i voicing degli accordi
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
    this.initSheet(); // TODO spostare nella onchange

  }

  ngOnChanges(changes: SimpleChanges) {
    // const currentItem: SimpleChange = changes.active_chord_index;
    // if (currentItem.currentValue && currentItem.currentValue !== currentItem.previousValue) {
    //   // const newActiveIndex = currentItem.currentValue;
    //   // chiamata al metodo di aggiornamento 
    //   this.setActiveChordStyle(currentItem.previousValue, currentItem.currentValue);
    // } else {
    //   console.log('Non cambia una sega');
    // }
  }


  // re-renders notes in the sheet. TODO check if it is good to render again all notes.
  private initSheet() {
    this.displayChords = this.chordDisplayService.buildChordsForDisplay(this.chord_voicings);
    let index = 0;
    for (let i = 0; i < this.displayChords.length; i += 2) {
      this.displayVoicings[index] = new Array<any>(this.displayChords[i], this.displayChords[i + 1]);
      index++;
    }
    this.renderSheet();
  }

  // TODO debuggare funzionamento
  private setActiveChordStyle(previousIndex: number, currentIndex: number): void {
    this.displayChords[previousIndex].setStyle({ fillStyle: 'black', strokeStyle: 'black' });
    this.displayChords[currentIndex].setStyle({ fillStyle: 'tomato', strokeStyle: 'tomato' });
    // aggiornamento della view con formatanddraw
    this.renderSheet();
  }

  private renderSheet(): void {
    // this.group = this.context.openGroup();
    for (let i = 0; i < this.staves.length; i++) {
      this.vf_groups[i] = this.context.openGroup();
      this.VF.Formatter.FormatAndDraw(this.context, this.staves[i], this.displayVoicings[i]);
      this.context.closeGroup();
    }
    // this.context.closeGroup();
  }

  private updateMeasure(index: number): void {
    console.log('index in update measure: ', index);
    // cancellazione delle note della battuta precedente, creazione del gruppo, draw e chiusura
    this.context.svg.removeChild(this.vf_groups[index]);
    this.vf_groups[index] = this.context.openGroup();
    const substitutedChords = [];
    for (let i = (index * 2); i < (index * 2 + 2); i++) {
      substitutedChords.push(this.chordDisplayService.createDisplayChord(this.chord_voicings[i]));
    }
    this.displayVoicings[index] = substitutedChords;
    // this.updateSheet();
    // this.vf_groups[index] = this.context.svg.openGroup();
    this.VF.Formatter.FormatAndDraw(this.context, this.staves[index], this.displayVoicings[index]);
    this.context.closeGroup();
  }

  private updateSheet(): void {
    // this.context.svg.removeChild(this.group);
    // this.group = null;
    this.renderSheet();
  }

}
