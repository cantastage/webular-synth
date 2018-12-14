import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAddModule]'
})
export class AddModuleDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
