import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModuleItem } from '../model/module-item';
import { AddModuleDirective } from '../directives/add-module.directive';
import { ModuleComponent } from '../interfaces/module.component';
import { ModuleManagerService } from '../services/module-manager.service';
import { ComponentRef } from '@angular/core/src/render3';

@Component({
  selector: 'app-synth-module-container',
  templateUrl: './synth-module-container.component.html',
  styleUrls: ['./synth-module-container.component.scss']
})
/**
 * This component contains all synth modules
 */
export class SynthModuleContainerComponent implements OnInit {
  private soundChain: Array<ComponentRef<any>> = new Array<ComponentRef<any>>(0);
  private unconnectedModules: Array<ComponentRef<any>> = new Array<ComponentRef<any>>(0);
  @ViewChild(AddModuleDirective) appAddModule: AddModuleDirective;
  private modules: ModuleItem[];
  private isNewComponentCreated: boolean;

  constructor(
    private contextManager: AudioContextManagerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private moduleManager: ModuleManagerService) { }

  ngOnInit() {
    this.isNewComponentCreated = false;
    this.modules = this.moduleManager.getModules();
  }

  /**
   * Method called when an element is dropped
   * @param event the drop event
   */
  drop(event: CdkDragDrop<Array<ComponentRef<any>>>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  loadComponent(): void {
    const adItem = this.modules[0]; // chooses first element to load
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.appAddModule.viewContainerRef;
    // viewContainerRef.clear();  // NB uncomment to have only one component at a time

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModuleComponent>componentRef.instance).data = adItem.data;

  }

}
