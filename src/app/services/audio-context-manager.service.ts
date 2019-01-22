import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { Subject } from 'rxjs';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */
@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  private g: GainNode;
  private _ctx: AudioContext;
  private soundChain: Array<AudioNode> = new Array<AudioNode>(0); // stores all the nodes in the audiochain
  private disconnectedNodes: Array<AudioNode> = new Array<AudioNode>(0);
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
   * Adds a new audioNode without connecting it to the soundChain
   * @param module module that has to be created
   */
  public createSynthModule<T extends AudioNode>(module: T) {

  }

  /**
   * Updates connections when moving a synth module inside the chain
   * maybe can return a boolean or a number
   * @TODO establish if needs parameters (index of the moved element)
   */
  public updateConnections(): void {

  }
}
