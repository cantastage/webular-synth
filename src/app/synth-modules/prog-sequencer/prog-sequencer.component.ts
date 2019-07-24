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
import { BasicProgressions } from 'src/app/model/modules/sequencer/prog/BasicProgressions';
import { Progression } from 'src/app/model/modules/sequencer/prog/Progression';
import { ProgSequencer } from 'src/app/model/modules/sequencer/prog/ProgSequencer';

@Component({
  selector: 'app-prog-sequencer',
  templateUrl: './prog-sequencer.component.html',
  styleUrls: ['./prog-sequencer.component.scss']
})
export class ProgSequencerComponent implements OnInit, OnDestroy {
  @Input() data: any;
  // @Input() isInSoundChain: boolean;
  // @Input() position: number;

  // UI selections
  private _channels: number[];
  private _pitchClasses: IPitchClass[]; //?
  private _chordQualities: IChordQuality[]; //?
  private _difficulties: number[];
  private _difficultyNames: string[]; 
  private _progSequencer: IProgSequencer; // model of prog sequencer?
  private _progressionList: Array<string>;
  private _activeProgression: any;  // current sequence of chords

  private _substitutedIndex: number;
  private _substitutingChords: Array<Chord>;
  private _substitutingIndex: number;
  private _rollback: boolean;
  private _firstTurnaround: boolean;

  private _clockObserver: Observer<number>;
  private _midiObserver: Observer<[number, boolean, number, number]>;
  public stocazzo = 'STOCAZZO';

  public get channels(): number[] {
    return this._channels;
  }
  public get pitchClasses(): IPitchClass[] {
    return this._pitchClasses;
  }
  public get chordQualities(): IChordQuality[] {
    return this._chordQualities;
  }
  public get difficulties(): number[] {
    return this._difficulties;
  }
  public get difficultyNames(): string[] { // not wonderful, but useful
    return this._difficultyNames;
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

  /**
   * Component constructor
   * @param clockManager 
   * @param midiManager 
   * @param contextManager 
   * @param substitutionManager 
   * @param messageService 
   */
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

  /**
   * This method loads a patch, in this case a chord progression
   * TODO connect to db to load patches.
   */
  public loadPatch(): void {
    this._progSequencer = new ProgSequencer(
      new Progression([
        new Chord(PitchClassesProvider.retrieveInstance('D'), ChordQualitiesProvider.retrieveInstance('min7')),
        new Chord(PitchClassesProvider.retrieveInstance('A'), ChordQualitiesProvider.retrieveInstance('min7')),
        new Chord(PitchClassesProvider.retrieveInstance('G'), ChordQualitiesProvider.retrieveInstance('dom7')),
        new Chord(PitchClassesProvider.retrieveInstance('C'), ChordQualitiesProvider.retrieveInstance('maj7'))
      ]),
      3, 16);
  }

  /**
   *  OnInit lifecycle
   */
  public ngOnInit() {
    this._progressionList = this.retrieveProgressionNames(BasicProgressions);
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._chordQualities = ChordQualitiesProvider.retrieveInstances();
    this._difficulties = [1, 2, 3];
    this._difficultyNames = ['easy', 'mid', 'pro'];
    this._activeProgression = BasicProgressions[0].name;
    // this._activeProgression = BasicProgressions[0];
    this._channels = MidiContextManagerService.generateMIDIChannelVector(); // midi channels

    this.loadPatch();
    // at the beginning the substituted chords are a replica of the ones introduced by the user
    // each chord is repeated twice
    this._substitutingChords = new Array<Chord>(2 * this.progSequencer.progression.chords.length);
    this.resetWholeState();
    console.log('I cazzo di accordi sono: ', this.substitutingChords);

    // mettere la condizione if (this.play)
    this.clockManager.attach(this._clockObserver);
    this.midiManager.attach(this._midiObserver);
    // this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
  }

  public ngOnDestroy() {
    this.clockManager.detach(this._clockObserver);
    this.midiManager.detach(this._midiObserver);
  }

  public savePatch(): any {
    this.data.state = this._progSequencer;
    return this.data;
  }

  private resetithSubstituting(i: number): void {
    this.substitutingChords[2 * i] = this.progSequencer.progression.chords[i];
    this.substitutingChords[2 * i + 1] = this.progSequencer.progression.chords[i];
  }
  private resetDefaultSubstituting(): void {
    this.resetSubstitutingIndex();
    for (let i = 0; i < this.progSequencer.progression.chords.length; i++) {
      this.resetithSubstituting(i);
    }
  }
  private resetRollback(): void {
    this._rollback = false;
  }
  private toggleRollback(): void {
    this._rollback = !this._rollback;
  }
  private resetSubstitutedIndex(): void {
    this._substitutedIndex = this.progSequencer.progression.chords.length - 1;
  }
  private updateSubstitutedIndex(): void {
    if (!this._rollback) {
      if (this._substitutedIndex > 1) { // we decide not to substitute the first chord
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
  private resetSubstitutingIndex(): void {
    this._substitutingIndex = 0;
  }
  private updateSubstitutingIndex(): void {
    this._substitutingIndex = (this._substitutingIndex + 1) % this.substitutingChords.length;
  }
  private resetFirstTurnaround(): void {
    this._firstTurnaround = true;
  }
  private resetWholeState(): void {
    this.resetSubstitutedIndex();
    this.resetRollback();
    this.resetDefaultSubstituting();
    this.resetFirstTurnaround();
  }

  private isFirstTurnaround(bn: number): boolean {
    const ret = bn === 0 && this._firstTurnaround;
    if (this._firstTurnaround) { this._firstTurnaround = false; }
    return ret;
  }
  private is2on4(bn: number): boolean {
    return bn % 2 === 0;
  }
  private is4on4(bn: number): boolean {
    return bn % 4 === 0;
  }
  private isTurnaround(bn: number): boolean {
    return bn % (4 * this.progSequencer.progression.chords.length) === 0;
  }
  private onTick(beatNumber: number): void {
    beatNumber--;
    // TODO need to highlight the substituted chord?!

    if (!this.isFirstTurnaround(beatNumber) &&
      this.isTurnaround(beatNumber)) { // apart from the first, til infty
      // usage of the substituted index [3,2,1,1,2,3...]
      // changed at each turnaround

      if (!this._rollback) { // substitution
        const tmp = SubstitutionManagerService.substituteChord(
          this.progSequencer.progression.chords[this._substitutedIndex],
          this.progSequencer.difficulty
        );
        this.substitutingChords[2 * this._substitutedIndex] = tmp[0];
        this.substitutingChords[2 * this._substitutedIndex + 1] = tmp[1];
      } else { // rollback
        this.resetithSubstituting(this._substitutedIndex);
      }

      // update the substituted index
      this.updateSubstitutedIndex();
    }

    // let's play the substituting chords!
    if (this.is2on4(beatNumber)) { // each substituted chord has duration 2/4
      // --> here only once over 2/4 beats (once per half-measure)
      // TODO IMPROVE CHORDS SUCCESSION, HOW?
      this.midiManager.sendChord(this.progSequencer.channel,
        this.substitutingChords[this._substitutingIndex],
        this.clockManager.bms * 2, 127); // 2 for twice a 1/4

      // TODO THINK OF BETTER APPROACHES
      setTimeout(this.doWhenWaited, this.clockManager.bms * 2 - 50, this);
    }
  }
  private doWhenWaited(ctx: ProgSequencerComponent): void {
    ctx.updateSubstitutingIndex();
  }
  public morethanChordChange(): void {
    // TODO
    this.resetWholeState();
    this.clockManager.restart();
  }
  // TODO classification of [] into MidiExtract{channel, isOn, midiNote, velocity}
  private onMessage(arg: [number, boolean, number, number]) {
    // HERE remember to check that the channel is not my own!
    if (arg[0] !== this.progSequencer.channel) {
      console.log(arg);
    }
  }

  private retrieveProgressionNames(progression: { name: string, progression: Progression }[]) {

    const progressionNames = [];
    for (let i = 0; i < progression.length; i++) {
      progressionNames[i] = progression[i].name;
    }
    return progressionNames;

    /*
    const progressionNames = new Array<string>(progression.length).fill('');
    for (let j = 0; j < progression.length; j++) {
      for (let i = 0; i < progression[j].chords.length; i++) {
        progressionNames[j] += progression[j].chords[i].root.pitchClassName + progression[j].chords[i].quality.chordQualityName;
        if (i < progression[j].chords.length - 1) {
          progressionNames[j] += ' - ';
        }
      }
    }
    return progressionNames;
    */
  }

  private chooseProgression() {
    for (let i = 0; i < BasicProgressions.length; i++) {
      if (BasicProgressions[i].name === this._activeProgression) {
        for (let j = 0; j < BasicProgressions[i].progression.chords.length; j++) {
          this.progSequencer.progression.chords[j] = BasicProgressions[i].progression.chords[j];
        }
      }
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
