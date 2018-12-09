import { Injectable } from '@angular/core';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */

@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  private _ctx: AudioContext;
  private soundChain: Array<AudioNode> = new Array<AudioNode>(0); // stores all the nodes in the audiochain
  private disconnectedNodes: Array<AudioNode> = new Array<AudioNode>(0);

  constructor() {
    this._ctx = new AudioContext();
   }

  /**
   * Getter for the audio context.
   */
  public get audioContext(): AudioContext {
    return this._ctx;
  }

  public getSoundChain(): void {
  }

  /**
   * Updates connections when moving a synth module inside the chain
   * maybe can return a boolean or a number
   * @TODO establish if needs parameters (index of the moved element)
   */
  public updateConnections(): void {

  }


}
