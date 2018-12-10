import {IModule} from './IModule';
import { sealed } from '../../system2/utilities/ClassDecorators';

export interface ISoundGenerator extends IModule {}

// all the following generics?!?! would say no...
// field of any concrete SoundGenerator (eg. Oscillator)
export interface IModulableParameterFromGen {
  value: number; // must implement: public get value(), public set value(val: number)
  readonly modulatedValue: number; // must implement: public get modulatedValue()
}
// field of any concrete Modulator (eg. LFO)
export interface IModulableParameterFromMod {
  modulateBy(factor: number): void; // must implement: public modulateBy(factor: number): void
}

@sealed
export class ModulableParameter implements IModulableParameterFromGen, IModulableParameterFromMod {
  private _value: number;
  private readonly _checkDelegate: Predicate<number>;
  private _lastModulationFactor: number;

  public get value() {
    return this._value;
  }
  public set value(val: number) {
    if (this._checkDelegate(val) || this._checkDelegate == null) { // if no check is present assign however
      this._value = val;
    } else {
      throw new Error('error while assigning the numerical value');
    }
  }

  public get modulatedValue(): number {
    return this._value * this._lastModulationFactor;
  }

  constructor(val: number, checkDelegate: Predicate<number>) {
    this._checkDelegate = checkDelegate;
    this.value = val;
    this._lastModulationFactor = 1;
  }

  public modulateBy(factor: number): void {
    // constraints on the factor?
    this._lastModulationFactor = factor;
  }
}
