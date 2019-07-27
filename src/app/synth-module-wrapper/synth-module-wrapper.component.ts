import {
  Component, OnInit, ViewChild, AfterViewInit, Input, ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef, Compiler, ComponentRef, OnDestroy
} from '@angular/core';
import { ModuleItem } from '../model/module-item';
import { AudioContextManagerService } from '../services/audio-context-manager.service';
import { SynthModule } from '../interfaces/module.component';


/**
 * This component is a wrapper that contains a synth module inside.
 * The contained synth module is passed with a componentRef and is assigned to ViewChild.
 */
@Component({
  selector: 'app-synth-module-wrapper',
  templateUrl: './synth-module-wrapper.component.html',
  styleUrls: ['./synth-module-wrapper.component.scss']
})
export class SynthModuleWrapperComponent implements OnInit, AfterViewInit {
  @Input() synthModuleData: ModuleItem;
  @Input() index: number; // index in the array of created modules
  @Input() listName: string; // name of the list where the wrapper is located
  @Input() isInSoundChain: boolean;
  private isViewInitialized = false;
  private cmpRef: ComponentRef<any>;


  @ViewChild('target', { static: false, read: ViewContainerRef }) target: ViewContainerRef;

  constructor(
    private contextManager: AudioContextManagerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.contextManager.subject.subscribe((moduleInfo) => {
      if ((moduleInfo.x === 'unconnectedModules' && moduleInfo.y === this.index)
      || moduleInfo.x === 'soundChain' && moduleInfo.y === this.index) {
        this.savePatch();
      }
    });
  }

  /**
   * Necessary to be certain that the reference injected by "ViewChild" is present.
   */
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    this.isViewInitialized = true;
    this.updateComponent();
  }

  updateComponent(): void {
    if (!this.isViewInitialized) {
      return;
    }
    if (this.cmpRef) {
      this.cmpRef.destroy();
      console.log('component ref not present!');
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.synthModuleData.component);
    this.cmpRef = this.target.createComponent(factory);
    (<SynthModule>this.cmpRef.instance).data = this.synthModuleData.data;
    (<SynthModule>this.cmpRef.instance).isInSoundChain = this.isInSoundChain;
    (<SynthModule>this.cmpRef.instance).position = this.index;
    this.cdRef.detectChanges();  // NB non rimuovere altrimenti la onInit del child view non viene chiamata.
  }

  /**
   * Returns the parameters of the wrapped synth module for save purposes.
   */
  public savePatch(): void {
    this.synthModuleData.data = this.cmpRef.instance.savePatch();
  }
}
