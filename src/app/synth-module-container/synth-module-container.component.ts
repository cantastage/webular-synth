import {
  Component, OnInit, ComponentFactoryResolver
} from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModuleItem } from '../model/module-item';
import { ModuleManagerService } from '../services/module-manager.service';
import { Pair } from '../model/pair';


@Component({
  selector: 'app-synth-module-container',
  templateUrl: './synth-module-container.component.html',
  styleUrls: ['./synth-module-container.component.scss'],
})
/**
 * This component contains all synth modules
 */
export class SynthModuleContainerComponent implements OnInit {
  private _soundChain: Array<ModuleItem> = new Array<ModuleItem>(0);
  private _unconnectedModules: Array<ModuleItem> = new Array<ModuleItem>(0);
  private _modules: ModuleItem[];
  private _trainerChain: ModuleItem[];

  public get modules(): ModuleItem[] {
    return this._modules;
  }
  public get soundChain(): Array<ModuleItem> {
    return this._soundChain;
  }
  public get unconnectedModules(): Array<ModuleItem> {
    return this._unconnectedModules;
  }
  constructor(
    private contextManager: AudioContextManagerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private moduleManager: ModuleManagerService) { }

  ngOnInit() {
    this._modules = this.moduleManager.getModules();
    this._soundChain = new Array();
    this._unconnectedModules = new Array();
  }

  /**
   * Method called when an element is dropped
   * @param event the drop event
   *
   */
  drop(event: CdkDragDrop<Array<ModuleItem>>): void {
    if (event.previousContainer === event.container) {

      if (event.previousIndex !== event.currentIndex) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        // move the correspondant SynthModule in context manager service ONLY IF IN SOUND CHAIN
        if (event.container.id === 'soundChain') {
          // update position, index of the synthmodule and update connections.
          this.contextManager.moveSynthModuleInSoundChain(event.previousIndex, event.currentIndex);
        }
      } else {
        return;
      }
    } else {
      // save the status only when going from unconnected to new modules, else the module will be destroyed.
      if (event.previousContainer.id === 'unconnectedModules') {
        this.contextManager.subject.next(new Pair<string, number>(event.previousContainer.id, event.previousIndex));
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        return;
      } else {
        // transfer from soundchain to unconnected, then destroy the component.
        this.contextManager.deleteSynthModule(event.previousIndex);
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          if (event.container.id === 'unconnectedModules') {
            this.unconnectedModules.splice(event.currentIndex, 1);
          }
      }
    }
  }

  // Adds a module into the array of unconnectedModules
  loadComponent(index: number): void {
    this._modules = this.moduleManager.getModules(); // refresh modules
    const adItem = this.modules[index];
    this.unconnectedModules.push(adItem);
  }

}
