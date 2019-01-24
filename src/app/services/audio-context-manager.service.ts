import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { Subject } from 'rxjs';
import { SynthModule } from '../interfaces/module.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PercentPipe } from '@angular/common';

/**
 * This service provides access to a common audio context shared by all synth modules.
 */
@Injectable({
  providedIn: 'root'
})
export class AudioContextManagerService {
  // private master_volume: GainNode;
  private _ctx: AudioContext;
  private soundChain: Array<SynthModule> = new Array<SynthModule>(0); // stores all the nodes in the audiochain
  private unconnectedModules: Array<SynthModule> = new Array<SynthModule>(0);
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
  public addSynthModule<T extends SynthModule>(module: T) {
    // if (listName === 'unconnectedModules') {
    //   this.unconnectedModules.push(module);
    // } else if (listName === 'soundChain') {
    //   this.soundChain.push(module);
    // }
    this.unconnectedModules.push(module);
  }

  /**
   * Transfer a synth module from list to list.
   * 
   * @param previousListName 
   * @param currentListName 
   * @param previousIndex 
   * @param currentIndex 
   */
  public moveSynthModule(previousListName: string, currentListName: string, previousIndex: number, currentIndex: number) {
    if (previousListName === 'soundChain') {
      transferArrayItem(this.soundChain, this.unconnectedModules, previousIndex, currentIndex);
    } else {
      transferArrayItem(this.unconnectedModules, this.soundChain, previousIndex, currentIndex);
    }
    this.updateConnections();
  }

  /**
   * Reorder elements in the synth modules lists.
   * @param listName 
   * @param previousIndex 
   * @param currentIndex 
   */
  public reorderModule(listName: string, previousIndex: number, currentIndex: number) {
    if (listName === 'unconnectedModules') {
      this.reorderSynthModule(this.unconnectedModules, previousIndex, currentIndex);
    } else if (listName === 'soundChain') {
      this.reorderSynthModule(this.soundChain, previousIndex, currentIndex);
    }
    this.updateConnections();
  }

  private reorderSynthModule(list: Array<SynthModule>, previousIndex: number, currentIndex: number) {
    moveItemInArray(list, previousIndex, currentIndex);
  }

  // /**
  //  * Adds an audionode in the desired position
  //  * @param node the node to be added
  //  * @param list_name the list where the node has to be added
  //  * @param position index of the position
  //  */
  // public addSynthNode(node: AudioNode, list_name: string, position: number): void {
  //   // if (list_name === 'soundChain') {
  //   //   this.soundChain[]
  //   // } else if (list_name === 'unconnectedList') {

  //   // }
  // }


  // private disconnectAllModules(): void {
  //   for (let i = 0; i < this.soundChain.lengt)
  // }

  // private updateModuleListConnections(list: Array<SynthModule>): void {
  //   for (let i = 0; i < list.length; i++) {
  //     list[i].
  //   }
  // }

  /**
   * Updates connections when moving a synth module inside the chain
   * maybe can return a boolean or a number
   * @TODO establish if needs parameters (index of the moved element)
   */
  private updateConnections(): void {
    // The last element needs to be connected to the audio destination
    let i = 0;
    // while (i < this.soundChain.length - 1) {
    //   this.soundChain[i].connect(this.soundChain[i + 1]);
    //   i++;
    // }
    // // connects the last element to audio destination
    // this.soundChain[i].connect(this._ctx.destination);
  }
}
