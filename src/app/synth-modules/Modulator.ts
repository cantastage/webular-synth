import { Input } from '@angular/core';
import { ModulableAudioParameter } from './Modulation';

export interface IAttachableComponent {
  attachedComponent: IAttachableComponent;
}

export abstract class AttachableComponent {
  protected _attachedComponent: IAttachableComponent;
  public get attachedComponent(): IAttachableComponent {
    return this._attachedComponent;
  }
  @Input()
  public set attachedComponent(c: IAttachableComponent) {
    if (c && c != null) { // Attach
      this._attachedComponent = c;
      // this.onComponentAttach();
    } else { // Detach
      // this.onComponentDetach();
      this._attachedComponent = null;
    }
  }
  // protected abstract onComponentAttach(): void;
  // protected abstract onComponentDetach(): void;

  public constructor() { }
}

export interface IModulatorComponent extends IAttachableComponent {
  modulatedParameter: ModulableAudioParameter;
}
