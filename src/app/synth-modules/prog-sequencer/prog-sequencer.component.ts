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

  private _substitutedChords: Array<Chord>;
  private _currentSubstitutedIndex: number; // better than chordPlaying or chordNext

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
  public get substitutedChords(): Array<Chord> {
    return this._substitutedChords;
  }
  public get chordPlaying(): Chord {
    return this.substitutedChords[this._currentSubstitutedIndex];
  }
  public get chordNext(): Chord {
    return this.substitutedChords[
      (this._currentSubstitutedIndex + 1) % this.substitutedChords.length
    ];
  }

  public constructor(private clockManager: ClockManagerService, private midiManager: MidiContextManagerService,
    private contextManager: AudioContextManagerService, private substitutionManager: SubstitutionManagerService,
    private messageService: MessageService) {
    // init observers
    this._clockObserver = {
      next: (value) => { this.onTick(value); },
      error: (error) => { return; },
      complete: () => { return; }
    };
    this._midiObserver = {
      next: (value) => { this.onMessage(value); },
      error: (error) => { return; },
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
    this._substitutedChords = new Array<Chord>();
    this.resetDefaultSubstituted();

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

  private resetDefaultSubstituted(): void {
    this._currentSubstitutedIndex = 0;
    this.substitutedChords.splice(0, this.substitutedChords.length);
    for (let i = 0; i < this.progSequencer.progression.chords.length; i++) {
      this._substitutedChords.push(this.progSequencer.progression.chords[i]);
      this._substitutedChords.push(this.progSequencer.progression.chords[i]);
    }
  }

  private onTick(beatNumber: number): void {
    // if first beat or reset, I refill the substituted chords with defaults
    if (beatNumber === 0) {
      // --> here only once over bpm
      this.resetDefaultSubstituted();
      // otherwise, AT EACH TURNAROUND (modular condition below),
      // apart from the first one,
      // I substitute a chord of the progression starting from the last one
    } else if (beatNumber % this.progSequencer.progression.chords.length === 0) {
      // eg. for prog of 4 chords, --> here only once over 4/4 beats (once per measure)
      // here beatNumber is like [4, 8, 12, 16, 20, 24, 28...]
      const which = (this.progSequencer.progression.chords.length - 1) -
        (((beatNumber - this.progSequencer.progression.chords.length) /
        this.progSequencer.progression.chords.length) %
        this.progSequencer.progression.chords.length);
      // while which is 3 - [0, 1, 2, 3, 0, 1, 2, 3...] = [3, 2, 1, 0, 3, 2, 1, 0...]

      // TODO IMPLEMENT THE FOLLOWING FUNCTION substituteChord
      // SO THAT IT RETURNS THE 2 CHORDS

      // const tmp = SubstitutionManagerService.substituteChord(
      //   this.progSequencer.progression.chords[which], this.progSequencer.difficulty
      // );
      // this.substitutedChords[which * 2] = tmp[0];
      // this.substitutedChords[which * 2 + 1] = tmp[1];
    }

    // then, I exploit the substituted chords each 2*2/4 for 4 measures
    // and I play them
    if (beatNumber % 2 === 0) { // each substituted chord has duration 2/4
      // --> here only once over 2/4 beats (once per half-measure)
      // here beatNumber is like [0, 2, 4, 6, 8, 10, 12, 14, 16...]
      this._currentSubstitutedIndex = (beatNumber / 2) % this.substitutedChords.length;
      // while _currentSubstitutedIndex is [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7...]

      // TODO IMPROVE CHORDS LEGATO, HOW?
      this.midiManager.sendChord(15, this.substitutedChords[this._currentSubstitutedIndex],
        this.clockManager.bms * 2, 127); // 2 for twice a 1/4
    }
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
