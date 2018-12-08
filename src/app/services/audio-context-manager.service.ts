import { Injectable } from '@angular/core';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */

@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  private _ctx: AudioContext;

  constructor() { this._ctx = new AudioContext(); }

  /**
   * Getter for the audio context.
   */
  public get audioContext(): AudioContext {
    return this._ctx;
  }

  public getSoundChain(): void {
  }

}
