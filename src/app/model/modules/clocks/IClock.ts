import { IModule } from '../IModule';
import { IObservable } from '../../../system2/patterns/observer/IObservable';

export interface IClock extends IModule, IObservable {
  bpm: number;
  BEATS_MIN(): number;
  BEATS_MAX(): number;
}
