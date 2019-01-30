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
  private soundChain: Array<ModuleItem> = new Array<ModuleItem>(0);
  private unconnectedModules: Array<ModuleItem> = new Array<ModuleItem>(0);
  private modules: ModuleItem[];

  constructor(
    private contextManager: AudioContextManagerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private moduleManager: ModuleManagerService) { }

  ngOnInit() {
    this.modules = this.moduleManager.getModules();
    this.soundChain = new Array();
    this.unconnectedModules = new Array();
  }

  /**
   * Method called when an element is dropped
   * @param event the drop event
   *
   */
  drop(event: CdkDragDrop<Array<ModuleItem>>): void {
    // caso in cui mi trovo a riordinare gli elementi nello stesso container
    if (event.previousContainer === event.container) {

      if (event.previousIndex !== event.currentIndex) {
        // console.log('Reordering modules');
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
      // TODO can be optimized without instantiating a new pair everytim
      // save the status only when going from unconnected to new modules, else the module will be destroyed.
      if (event.previousContainer.id === 'unconnectedModules') {
        this.contextManager.subject.next(new Pair<string, number>(event.previousContainer.id, event.previousIndex));
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      } else {
        // trasferisco da soundchain ad unconnected e distruggo il componente
      }
    }
  }

  // Adds a module into the array of unconnectedModules
  loadComponent(index: number): void {
    const adItem = this.modules[index];
    this.unconnectedModules.push(adItem);
  }

}
