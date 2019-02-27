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

  // OnInit lifecycle
  public ngOnInit() {
    this._pitchClasses = PitchClassesProvider.retrieveInstances();
    this._chordQualities = ChordQualitiesProvider.retrieveInstances();

    this.loadPatch();
    if (this.isInSoundChain) {
      this.clockManager.attach(this._clockObserver);
      this.midiManager.attach(this._midiObserver);
      this.contextManager.addSynthModule(this, this.position); // Adds the module to the audio context manager service
    }
  }

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
    console.log(this);
    console.log(beatNumber);
    // const aeiou = SubstitutionManagerService.buildSubstitutionSequence(
    //   SubstitutionManagerService.funny(this.progSequencer.progression, 3)
    // );
    // console.log(this.progSequencer.progression.chords[0].toString());
    // console.log('subst with ' + aeiou[1].toString());
    // for (let i = 0; i < aeiou[1].chordNotes.length; i++) {
    //   this.midiManager.sendRawNote(15, aeiou[1].chordNotes[i].frequency,
    //     60 / this.clockManager.bpm * 1000,
    //     127);
    // }
  }
  private onMessage(message: [number, boolean, number, number]) {
    console.log('received things!');
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
