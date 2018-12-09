import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModuleItem } from '../model/module-item';
import { AddModuleDirective } from '../directives/add-module.directive';
import { ModuleComponent } from '../interfaces/module.component';
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
  // @Input() modules: ModuleItem[]; // synth modules injected by the contextManagerService
  @ViewChild(AddModuleDirective) appAddModule: AddModuleDirective;
  private modules: ModuleItem[];


  // private proc: MyWorkletNode;
  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  // done = [
  //   'Get up',
  //   'Brush teeth',
  //   'Take a shower',
  //   'Check e-mail',
  //   'Walk dog'
  // ];


  constructor(
    private contextManager: AudioContextManagerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private moduleManager: ModuleManagerService) { }

  ngOnInit() {
    this.modules = this.moduleManager.getModules();
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }

  loadComponent(): void {
    const adItem = this.modules[0]; // chooses first element to load
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.appAddModule.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ModuleComponent>componentRef.instance).data = adItem.data;

  }

}
