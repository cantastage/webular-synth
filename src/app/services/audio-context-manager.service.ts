import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SynthModule } from '../interfaces/module.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Pair } from '../model/pair';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */
@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  private _ctx: AudioContext;
  private soundChain: Array<SynthModule> = new Array<SynthModule>(0); // stores all the nodes in the audiochain
  // private _progSeqSoundChain: Array<SynthModule>;

  public subject: Subject<Pair<string, number>>;

  constructor() {
    this._ctx = new AudioContext();
    this.subject = new Subject();
    // this._progSeqSoundChain = new Array<AudioNode>(0);
    // this._progSeqSoundChain = [null, null];
  }

  /**
   * Getter for the audio context.
   */
  public get audioContext(): AudioContext {
    return this._ctx;
  }

  /**
   * Insert a synth module in the soundchain
   * @param module module that has to be created
   */
  public addSynthModule(module: SynthModule, position: number): void {
    // empty soundchain case
    const chainLength = this.soundChain.length;
    this.soundChain.splice(position, 0, module); // posiziono il synthmodule nell'array, poi update connessioni
    if (chainLength === 0) {
      this.soundChain[0].connectSynthModule(null);
      return;
    } else if (chainLength > 0) {
      if (position === (chainLength)) {
        // tail insert
        const prev = this.soundChain[(position - 1)];
        prev.disconnectSynthModule();
        module.connectSynthModule(prev);
        return;
      } else if (position === 0) {
        // head insert
        const next = this.soundChain[1];
        next.connectSynthModule(module);
        return;
      } else {
        // general case
        const prev = this.soundChain[(position - 1)];
        const next = this.soundChain[(position + 1)];
        prev.disconnectSynthModule();
        next.connectSynthModule(module);
        module.connectSynthModule(prev);
      }
    }
  }

  /**
   * Moves a synth module in the soundchain, then updates audio connections.
   * @param previousIndex 
   * @param currentIndex 
   */
  public moveSynthModuleInSoundChain(previousIndex: number, currentIndex: number) {
    let soundChainLength = this.soundChain.length;
    // disconnect module from previous position
    // head disconnect
    if (previousIndex === 0) {
      this.soundChain[previousIndex].disconnectSynthModule();
    } else if (previousIndex === (soundChainLength - 1)) {
      const prev = this.soundChain[previousIndex - 1];
      prev.disconnectSynthModule();
    } else {
      const prev = this.soundChain[previousIndex - 1];
      const next = this.soundChain[previousIndex + 1];
      prev.disconnectSynthModule();
      this.soundChain[previousIndex].disconnectSynthModule();
      next.connectSynthModule(prev);
    }
    moveItemInArray(this.soundChain, previousIndex, currentIndex); // moves element in the soundchain array
    // reconnect the element in the chain
    soundChainLength = this.soundChain.length;
    if (currentIndex === 0) {
      const next = this.soundChain[currentIndex + 1];
      next.connectSynthModule(this.soundChain[currentIndex]);
    } else if (currentIndex === (soundChainLength - 1)) {
      const prev = this.soundChain[previousIndex - 1];
      this.soundChain[currentIndex].connectSynthModule(prev);
    } else {
      const prev = this.soundChain[currentIndex - 1];
      const next = this.soundChain[currentIndex + 1];
      prev.disconnectSynthModule();
      this.soundChain[currentIndex].connectSynthModule(prev);
      next.connectSynthModule(this.soundChain[currentIndex]);
    }
    // update dell'indice del componente
    this.soundChain[currentIndex].position = currentIndex;
  }

  /**
   * Deletes a synth module.
   * 
   * @param position 
   */
  public deleteSynthModule(position: number): void {
    const soundChainLength = this.soundChain.length;
    // disconnessione del modulo dalla previous position
    if (position === 0 && soundChainLength === 1) {
      // caso in cui sia l'unico elemento nella lista
      this.soundChain[position].disconnectSynthModule();
      this.soundChain.splice(position, 1);
      return;
    }
    if (position === (soundChainLength - 1)) {
      const prev = this.soundChain[position - 1];
      prev.disconnectSynthModule();
      this.soundChain[position].disconnectSynthModule();
    } else if (position === 0) {
      this.soundChain[position].disconnectSynthModule();
    } else {
      this.soundChain[position].disconnectSynthModule();
      const prev = this.soundChain[position - 1];
      prev.disconnectSynthModule();
      const next = this.soundChain[position + 1];
      next.connectSynthModule(prev);
    }
    // delete module.
    this.soundChain.splice(position, 1);
  }

  /**
   * 
   * @param module Connects prog sequencer to the final output
   * @param position 
   */
  public connectProgSequencer(progSequencerModule: SynthModule): void {
    progSequencerModule.getOutput().connect(this._ctx.destination);
  }
}
