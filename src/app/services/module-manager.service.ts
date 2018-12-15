import { Injectable } from '@angular/core';
import { ModuleItem } from '../model/module-item';
// import { MoogLadderFilterComponent } from '../synth-modules/moog-ladder-filter/moog-ladder-filter.component';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {

  private modules: ModuleItem[];

  constructor() { }

  public getModules(): ModuleItem[] {
    return this.modules;
    // return [new ModuleItem(MoogLadderFilterComponent, { name: 'filter' })];
  }
}
