import { ISoundGenerator } from '../ISoundGenerator';
import { WaveShapes } from './WaveShapes';

class Oscillator implements ISoundGenerator {
  private _waveShape: WaveShapes; // wave shape from the enum
  private _level: number; // volume level as percentage
  // private _level: IModulableParameterFromGen;

  // addition of octave?
  // the modulable ones should be NumericalParameter (or more generic ModulableParameter)
  private _coarseTune: number; // transpose in half-tones (+-11?)
  // private _coarseTune: IModulableParameterFromGen;
  private _fineTune: number; // tune as percentage of half-tone
  // private _fineTune: IModulableParameterFromGen;



  public start(): void {
    throw new Error('Method not implemented.');
  }
  public stop(): void {
    throw new Error('Method not implemented.');
  }
}
