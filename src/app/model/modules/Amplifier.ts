import {IModule} from './IModule';
// SINGLETON - LOOK AT CLOCK
class Amplifier implements IModule {
  private _pan: number; // from -100%(L) to 100%(R)
  private _level: number; // volume level as percentage

  start(): void {
    throw new Error('Method not implemented.');
  }
  stop(): void {
    throw new Error('Method not implemented.');
  }

}
