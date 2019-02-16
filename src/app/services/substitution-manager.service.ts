import { Injectable } from '@angular/core';
import { Observable} from '../system2/patterns/observer/Observable.js';
import { MessageService} from 'src/app/services/message.service';
import { IPitchClass } from 'src/app/model/modules/sequencer/IPitchClass';
import { IChordQualities } from 'src/app/model/modules/chord-substitution/IChordQualities';
/*
This Service provides support for the chord substitution module
 */

@Injectable({
  providedIn: 'root'
})

export class SubstitutionManagerService extends Observable<number> {

  private message: any;

  constructor(private messageService: MessageService) {
    super();
    this.messageService.getMessage().subscribe(message => { this.message = message;
    // console.log(this.message);
    this.setVariable(this.message);
     });
  }

  private setVariable(variable: number): void {
    this.notify(variable);
  }

}
