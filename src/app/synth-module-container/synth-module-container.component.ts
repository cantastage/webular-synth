import {
  Component, OnInit, ComponentFactoryResolver, ComponentRef, ViewChildren,
} from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModuleItem } from '../model/module-item';
import { ModuleManagerService } from '../services/module-manager.service';

@Component({
  selector: 'app-synth-module-container',
  templateUrl: './synth-module-container.component.html',
  styleUrls: ['./synth-module-container.component.scss']
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
   */
  drop(event: CdkDragDrop<Array<ModuleItem>>): void {
    if (event.previousContainer === event.container) {
      // console.log('Reordering modules');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // move the correspondant audio node
    } else {
      this.contextManager.subject.next(event.currentIndex);
      console.log('moduleItem being passed: ', event.previousContainer.data[event.currentIndex]);
      // Component will be destroyed, so I need to save the state of the synth module
      // tipo: audiocontextmanager
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // update connections in audiocontextservice
      // this.contextManager.
    }
  }

  // Adds a module into the array of unconnectedModules
  loadComponent(index: number): void {
    // const adItem = this.modules[0]; // chooses first element to load
    const adItem = this.modules[index];
    this.unconnectedModules.push(adItem);
  }

}
