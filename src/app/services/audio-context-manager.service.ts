import { Injectable } from '@angular/core';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */

@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {

  constructor(private ctx: AudioContext) { }

  /**
   * Getter for the audio context.
   */
  get audioContext(): AudioContext {
    return this.ctx;
  }
}
