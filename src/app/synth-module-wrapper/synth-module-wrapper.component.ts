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
export class SynthModuleWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() synthModuleData: ModuleItem;
  @Input() index: number; // index in the array of created modules
  private isViewInitialized = false;
  private cmpRef: ComponentRef<any>;


  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

  constructor(
    private contextManager: AudioContextManagerService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('Data provided to synth wrapper: ', this.synthModuleData);
    this.contextManager.subject.subscribe((index) => {
      if (index === this.index) {
        console.log('saving patch!');
        this.savePatch();
        console.log('saved patch parameters: ', this.synthModuleData.data);
      }
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log('module wrapper is being destroyed');
  }


  /**
   * Necessary to be certain that the reference injected by "ViewChild" is present.
   */
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
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
    this.cdRef.detectChanges();  // NB non rimuovere altrimenti la onInit del child view non viene chiamata.
  }

  /**
   * Returns the parameters of the wrapped synth module for save purposes.
   */
  public savePatch(): void {
    console.log('enters save patch');
    this.synthModuleData.data = this.cmpRef.instance.savePatch();
  }
}
