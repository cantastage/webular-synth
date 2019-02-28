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
  private updateSubstituted(): void {
    this._substitutedChords = // MUST BE UPDATED ON CHANGES
      SubstitutionManagerService.retrieveSubstitutionSequence(this.progSequencer.progression,
        this.progSequencer.difficulty);
  }

  // OnInit lifecycle
  public ngOnInit() {
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._chordQualities = ChordQualitiesProvider.retrieveInstances();

    this.loadPatch();
    this.updateSubstituted();

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

  private onTick(beatNumber: number): void {
    // NECESSARY
    // TODO handle of basic case with chords of duration 4/4 (no substitutions)

    if (beatNumber % 2 === 0) { // each substituted chord has duration 2/4
      const currenti = (beatNumber / 2) %
        (2 * this.progSequencer.progression.chords.length);
        // if (this._substitutedChords[currenti] !==
        //   this._substitutedChords[currenti === 0 ?
        //     this._substitutedChords.length - 1 : currenti - 1]) { // current != previous in circular array
          // this.midiManager.sendChord(15, this._substitutedChords[currenti],
          //   this.clockManager.bms * 2, 127);
        // }
        this.midiManager.sendChord(15, this.progSequencer.progression.chords[currenti % 4],
          this.clockManager.bms * 2, 127);
    }
  }
  // TODO: classification of [] into MidiExtract{channel, isOn, midiNote, velocity}
  private onMessage(arg: [number, boolean, number, number]) {
    // HERE remember to check that the channel is not 15, the one of this same sequencer!
    if (arg[0] !== 15) {
      console.log(arg);
    }
  }

  // MORE TODO: the state is automatically updated in the model,
  // the rievaluation of the substituted chords vector must be done only on changes
  // in order to improve the performances
  // (hint: exploit this.updateSubstituted())

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
