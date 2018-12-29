import {
  Component, OnInit, ViewChild, AfterViewInit, Input, ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef, Compiler, ComponentRef
} from '@angular/core';
import { ModuleComponent } from '../interfaces/module.component';
import { ModuleItem } from '../model/module-item';

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
  private isViewInitialized = false;
  private cmpRef: ComponentRef<any>;

  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
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
    (<ModuleComponent>this.cmpRef.instance).data = this.synthModuleData.data;
    this.cdRef.detectChanges();  // TODO check se serve davvero
  }
}
