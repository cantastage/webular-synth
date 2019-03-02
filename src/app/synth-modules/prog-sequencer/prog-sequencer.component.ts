import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SubstitutionManagerService } from 'src/app/services/substitution-manager.service';
import { MessageService } from 'src/app/services/message.service';
import { IProgSequencer } from '../../model/modules/sequencer/prog/IProgSequencer';
import { PitchClassesProvider } from '../../model/modules/sequencer/PitchClassesProvider';
import { IPitchClass } from '../../model/modules/sequencer/IPitchClass';
import { ClockManagerService } from 'src/app/services/clock-manager.service';
import { MidiContextManagerService } from 'src/app/services/midi-context-manager.service';
import { SynthModule } from 'src/app/interfaces/module.component';
import { AudioContextManagerService } from 'src/app/services/audio-context-manager.service';
import { IChordQuality } from 'src/app/model/modules/chord-substitution/IChordQuality';
import { ChordQualitiesProvider } from 'src/app/model/modules/chord-substitution/ChordQualitiesProvider';
import { Observer } from 'rxjs';
import { Chord } from 'src/app/model/modules/sequencer/prog/Chord';

@Component({
  selector: 'app-sequencer',
  templateUrl: './prog-sequencer.component.html',
  styleUrls: ['./prog-sequencer.component.scss']
})
export class ProgSequencerComponent implements OnInit, OnDestroy, SynthModule {
  @Input() data: any;
  @Input() isInSoundChain: boolean;
  @Input() position: number;

  // UI selections
  private _pitchClasses: IPitchClass[];
  private _chordQualities: IChordQuality[];
  private _progSequencer: IProgSequencer;

  private _substitutedIndex: number;
  private _substitutingChords: Array<Chord>;
  private _substitutingIndex: number;
  private _rollback: boolean;

  private _clockObserver: Observer<number>;
  private _midiObserver: Observer<[number, boolean, number, number]>;

  public get pitchClasses(): IPitchClass[] {
    return this._pitchClasses;
  }
  public get chordQualities(): IChordQuality[] {
    return this._chordQualities;
  }
  public get progSequencer(): IProgSequencer {
    return this._progSequencer;
  }
  public get substitutingChords(): Array<Chord> {
    return this._substitutingChords;
  }
  public get chordPlaying(): Chord {
    return this.substitutingChords[this._substitutingIndex];
  }
  public get chordNext(): Chord {
    return this.substitutingChords[
      (this._substitutingIndex + 1) % this.substitutingChords.length
    ];
  }
  private static isFirstTurnaround(bn: number): boolean {
    return bn === 0;
  }
  private static is2on4(bn: number): boolean {
    return bn % 2 === 0;
  }
  private static is4on4(bn: number): boolean {
    return bn % 4 === 0;
  }
  private static isTurnaround(bn: number): boolean {
    return bn % 16 === 0;
  }

  public constructor(private clockManager: ClockManagerService, private midiManager: MidiContextManagerService,
    private contextManager: AudioContextManagerService, private substitutionManager: SubstitutionManagerService,
    private messageService: MessageService) {
    // init observers
    this._clockObserver = {
      next: (value) => { this.onTick(value); },
      error: () => { return; },
      complete: () => { return; }
    };
    this._midiObserver = {
      next: (value) => { this.onMessage(value); },
      error: () => { return; },
      complete: () => { return; }
    };
  }

  public loadPatch(): void {
    this._progSequencer = this.data.state;
  }

  // OnInit lifecycle
  public ngOnInit() {
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._chordQualities = ChordQualitiesProvider.retrieveInstances();

    this.loadPatch();
    // at the beginning the substituted chords are a replica of the ones introduced by the user
    // each chord is repeated twice
    this._substitutedIndex = this.progSequencer.progression.chords.length - 1;
    this._rollback = false;
    this._substitutingChords = new Array<Chord>(2 * this.progSequencer.progression.chords.length);
    this.resetDefaultSubstituting();

    if (this.isInSoundChain) {
      this.clockManager.attach(this._clockObserver);
      this.midiManager.attach(this._midiObserver);
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

  // TODO decide whether to delete the attach and detach functions
  // leaving the sole subscription on the observable and maintaining
  // a subscription here which can be "discarded" onDestroy
  public ngOnDestroy() {
    if (this.isInSoundChain) {
      this.clockManager.detach(this._clockObserver);
      this.midiManager.detach(this._midiObserver);
    }
  }

  public savePatch(): any {
    this.data.state = this._progSequencer;
    return this.data;
  }

  private resetithSubstituting(i: number): void {
    this.substitutingChords[2 * i]  = this.progSequencer.progression.chords[i];
    this.substitutingChords[2 * i + 1] = this.progSequencer.progression.chords[i];
  }
  private resetDefaultSubstituting(): void {
    this._substitutingIndex = 0;
    for (let i = 0; i < this.progSequencer.progression.chords.length; i++) {
      this.resetithSubstituting(i);
    }
  }
  private toggleRollback(): void {
    this._rollback = !this._rollback;
  }
  private updateSubstitutedIndex(): void {
    if (!this._rollback) {
      if (this._substitutedIndex > 0) {
        this._substitutedIndex--;
      } else {
        this.toggleRollback();
      }
    } else {
      if (this._substitutedIndex < this.progSequencer.progression.chords.length - 1) {
        this._substitutedIndex++;
      } else {
        this.toggleRollback();
      }
    }
  }
  private updateSubstitutingIndex(): void {
    this._substitutingIndex = (this._substitutingIndex + 1) % this.substitutingChords.length;
  }

  private onTick(beatNumber: number): void {
    beatNumber--;

    if (ProgSequencerComponent.isFirstTurnaround(beatNumber)) { // first turnaround
      this.resetDefaultSubstituting();
    } else if (ProgSequencerComponent.isTurnaround(beatNumber)) { // next ones til infty
      // usage of the substituted index [3,2,1,0,0,1,2,3...]
      // changed at each turnaround
      // console.log('subed: ' + this._substitutedIndex + '\trollback: ' + this._rollback);

// UNCOMMENT BELOW
      // if (!this._rollback) { // substitution
      //   const tmp = SubstitutionManagerService.substituteChord(
      //     this.progSequencer.progression.chords[this._substitutedIndex],
      //     this.progSequencer.difficulty
      //   );
      //   this.substitutingChords[2 * this._substitutedIndex] = tmp[0];
      //   this.substitutingChords[2 * this._substitutedIndex + 1] = tmp[1];
      // } else { // rollback
      //   this.resetithSubstituting(this._substitutedIndex);
      // }
// TIL HERE

      // update the substituted index
      this.updateSubstitutedIndex();
    }

    // let's play the substituting chords!
    if (ProgSequencerComponent.is2on4(beatNumber)) { // each substituted chord has duration 2/4
      // --> here only once over 2/4 beats (once per half-measure)
      console.log('bn: ' + beatNumber + '\tsubing: ' + this._substitutingIndex);
      // TODO IMPROVE CHORDS SUCCESSION, HOW?
      this.midiManager.sendChord(15, this.substitutingChords[this._substitutingIndex],
        this.clockManager.bms * 2, 127); // 2 for twice a 1/4

      // TODO THINK OF BETTER APPROACHES
      setTimeout(this.doWhenWaited, this.clockManager.bms * 2 - 50, this);
    }
  }
  private doWhenWaited(ctx: ProgSequencerComponent): void {
    ctx.updateSubstitutingIndex();
  }
  // TODO classification of [] into MidiExtract{channel, isOn, midiNote, velocity}
  private onMessage(arg: [number, boolean, number, number]) {
    // HERE remember to check that the channel is not 15, the one of this same sequencer!
    if (arg[0] !== 15) {
      console.log(arg);
    }
  }

  getInput(): AudioNode {
    return null;
  }
  getOutput(): AudioNode {
    return null;
  }

  connectSynthModule(inputModule: SynthModule): void {
    return;
  }

  disconnectSynthModule(): void {
    return;
  }
}
