import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { Subject } from 'rxjs';
import { ModuleComponent } from '../interfaces/module.component';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */
@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  // private master_volume: GainNode;
  private _ctx: AudioContext;
  private soundChain: Array<ModuleComponent> = new Array<ModuleComponent>(0); // stores all the nodes in the audiochain
  private disconnectedNodes: Array<ModuleComponent> = new Array<ModuleComponent>(0);
  public subject: Subject<number>;

  constructor() {
    this._ctx = new AudioContext();
    this.subject = new Subject();
    // this.modules = [new ModuleItem(MoogLadderFilterComponent, { name: 'filter' })];
    // this._ctx.createGain();
  }

  /**
   * Getter for the audio context.
   */
  public get audioContext(): AudioContext {
    return this._ctx;
  }

  /**
   * Creates a polyphonic oscillator node
   */
  public createPolyphonicOscillator(): void {
    // return this.createPoly
  }

  // public createFilter(): BiquadFilterNode {
  //   const filter = this._ctx.createBiquadFilter();
  //   this.soundChain.push(filter);
  //   filter.connect(this._ctx.destination);
  //   return filter;
  // }

  /**
   * Adds a new audioNode without connecting it to the soundChain
   * @param module module that has to be created
   */
  public addSynthModule<T extends ModuleComponent>(module: T) {

  }

  /**
   * Adds an audionode in the desired position
   * @param node the node to be added
   * @param list_name the list where the node has to be added
   * @param position index of the position
   */
  public addSynthNode(node: AudioNode, list_name: string, position: number): void {
    // if (list_name === 'soundChain') {
    //   this.soundChain[]
    // } else if (list_name === 'unconnectedList') {

    // }
  }

  /**
   * Updates connections when moving a synth module inside the chain
   * maybe can return a boolean or a number
   * @TODO establish if needs parameters (index of the moved element)
   */
  private updateConnections(): void {
    // The last element needs to be connected to the audio destination
    let i = 0;
    while (i < this.soundChain.length - 1) {
      this.soundChain[i].connect(this.soundChain[i + 1]);
      i++;
    }
    // connects the last element to audio destination
    this.soundChain[i].connect(this._ctx.destination);
  }
}
