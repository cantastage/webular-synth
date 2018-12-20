import {
  Component, OnInit, ViewChild, AfterViewInit, Input, ViewContainerRef,
  ComponentFactoryResolver, ChangeDetectorRef, Compiler, ComponentRef, OnChanges, OnDestroy
} from '@angular/core';
import { MoogLadderFilterComponent } from '../synth-modules/moog-ladder-filter/moog-ladder-filter.component';
import { TargetLocator } from 'selenium-webdriver';

/**
 * This component is a wrapper that contains a synth module inside.
 * The contained synth module is passed with a componentRef and is assigned to ViewChild.
 */
@Component({
  selector: 'app-synth-module-wrapper',
  templateUrl: './synth-module-wrapper.component.html',
  styleUrls: ['./synth-module-wrapper.component.scss']
})
export class SynthModuleWrapperComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() compRef: ComponentRef<any>;  // riferimento al synth module component
  private isViewInitialized = false;

  // @Input() moduleType: any;  // moduleType to pass to the componentFactoryResolver to instantiate the component
  // @Input() moduleRef: ComponentRef<any>;  // used to pass component ref to use as childview
  /**
   * instance of the real synth module.
   * TODO check if the type as to be different from viewContainerRef
   */
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

  constructor(
    private compiler: Compiler,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    this.updateComponent();
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


  ngOnDestroy(): void {
    // if (this.compRef) {
    //   this.compRef.destroy();
    // }
    // NB La component ref non va distrutta perchè va passata.
    this.target.detach();  // TODO check if it really detaches the view from the container
  }

  updateComponent(): void {
    if (!this.isViewInitialized) {
      return;
    }
    if (!this.compRef) {
      // this.compRef.destroy();
      console.log('component ref not present!');
    }
    this.target.insert(this.compRef.hostView);  // Insert the view of the passed component into the container.
    this.cdRef.detectChanges();
  }
}
