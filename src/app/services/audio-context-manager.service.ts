import { Injectable } from '@angular/core';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */

@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  // se lo gestiamo così, per evitare InvalidStateError è necessario che:
  // ASSOLUTAMENTE NESSUN'ALTRA istanza di AudioContext sia previamente creata da qualche parte
  // la crea qualcuno? angular? altro? il suono non esce perchè la seconda istanza
  // (che non dovrebbe comunque potersi creare)
  // vuole inserirsi sulla risorsa speaker occupata dalla prima istanza
  private _ctx: AudioContext;

  constructor() { this._ctx = new AudioContext(); }

  /**
   * Getter for the audio context.
   */
  public get audioContext(): AudioContext {
    return this._ctx;
  }

}
