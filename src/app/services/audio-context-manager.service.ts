import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { Subject } from 'rxjs';
import { SynthModule } from '../interfaces/module.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PercentPipe } from '@angular/common';
import { timingSafeEqual } from 'crypto';
import { Pair } from '../model/pair';
import { nextContext } from '@angular/core/src/render3';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */
@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  private _ctx: AudioContext;
  private soundChain: Array<SynthModule> = new Array<SynthModule>(0); // stores all the nodes in the audiochain
  // private unconnectedModules: Array<SynthModule> = new Array<SynthModule>(0);
  public subject: Subject<Pair<string, number>>;

  constructor() {
    this._ctx = new AudioContext();
    this.subject = new Subject();
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
    // this.unconnectedModules.push(module);
    /**
     * gestione 4 casi:
     * inserimento in lista vuota
     * inserimento in coda
     * inserimento in testa
     * inserimento in mezzo
     */

    // empty soundchain case
    const chainLength = this.soundChain.length;
    this.soundChain.splice(position, 0, module); // posiziono il synthmodule nell'array, poi update connessioni
    if (chainLength === 0) {
      this.soundChain[0].getOutput().connect(this._ctx.destination);
      return;
    } else if (chainLength > 0) {
      // NB la condizione è così perchè chainLength viene prima dell'inserimento
      if (position === (chainLength)) {
        // caso inserimento in coda
        const prev = this.soundChain[(position - 1)];
        prev.disconnectSynthModule();
        module.connectToSynthNode(prev);
        this.soundChain[position].getOutput().connect(this._ctx.destination);
        return;
      } else if (position === 0) {
        // caso inserimento in testa
        const next = this.soundChain[1];
        next.connectToSynthNode(module);
        return;
      } else {
        // inserimento in mezzo
        const prev = this.soundChain[(position - 1)];
        const next = this.soundChain[(position + 1)];
        prev.disconnectSynthModule();
        next.connectToSynthNode(module);
        module.connectToSynthNode(prev);
      }
    }
  }

  /**
   * Moves a synth module in the soundchain, then updates audio connections.
   * @param previousIndex 
   * @param currentIndex 
   */
  public moveSynthModuleInSoundChain(previousIndex: number, currentIndex: number) {
    const soundChainLength = this.soundChain.length;
    /**
     * update delle connessioni
     * 3 casi:
     * spostamento in testa
     * spostamento in coda
     * spostamento in mezzo
     *
     */
    // disconnessione del modulo dalla previous position
    if (previousIndex === (soundChainLength - 1)) {
      const prev = this.soundChain[previousIndex - 1];
      prev.disconnectSynthModule();
      prev.getOutput().connect(this._ctx.destination); // collego l'output dell'ultimo modulo a destination.
      this.soundChain[previousIndex].disconnectSynthModule();
    } else if (previousIndex === 0) {
      this.soundChain[previousIndex].disconnectSynthModule();
    } else {
      // caso di scollegamento in mezzo alla lista
      this.soundChain[previousIndex].disconnectSynthModule();
      const prev = this.soundChain[previousIndex - 1];
      prev.disconnectSynthModule();
      const next = this.soundChain[previousIndex + 1];
      next.connectToSynthNode(prev);
    }
    moveItemInArray(this.soundChain, previousIndex, currentIndex); // sposto l'elemento nella soundchain
    // ricollego l'elemento nella catena
    if (currentIndex === 0) {
      // collega in testa
      const next = this.soundChain[currentIndex + 1];
      next.connectToSynthNode(this.soundChain[currentIndex]);
    } else if (currentIndex === (soundChainLength - 1)) {
      const prev = this.soundChain[currentIndex - 1];
      prev.disconnectSynthModule();
      this.soundChain[currentIndex].connectToSynthNode(prev);
      this.soundChain[currentIndex].getOutput().connect(this._ctx.destination);
    } else {
      // inserimento in mezzo
      const prev = this.soundChain[currentIndex - 1];
      const next = this.soundChain[currentIndex + 1];
      prev.disconnectSynthModule();
      this.soundChain[currentIndex].connectToSynthNode(prev);
      next.connectToSynthNode(this.soundChain[currentIndex]);
    }

    // update dell'indice del componente
    this.soundChain[currentIndex].position = currentIndex;
  }
  public deleteSynthModule(position: number): void {
    const soundChainLength = this.soundChain.length;
    // disconnessione del modulo dalla previous position
    if (position === 0 && soundChainLength === 1) {
      // caso in cui sia l'unico elemento nella lista
      this.soundChain[position].disconnectSynthModule();
      return;
    }
    if (position === (soundChainLength - 1)) {
      const prev = this.soundChain[position - 1];
      prev.disconnectSynthModule();
      prev.getOutput().connect(this._ctx.destination); // collego l'output dell'ultimo modulo a destination.
      this.soundChain[position].disconnectSynthModule();
    } else if (position === 0) {
      this.soundChain[position].disconnectSynthModule();
    } else {
      // caso di scollegamento in mezzo alla lista
      this.soundChain[position].disconnectSynthModule();
      const prev = this.soundChain[position - 1];
      prev.disconnectSynthModule();
      const next = this.soundChain[position + 1];
      next.connectToSynthNode(prev);
    }
    // cancellazione del modulo
    this.soundChain.splice(position, 1);
  }
}
