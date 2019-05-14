import { Pipe, PipeTransform } from '@angular/core';
import { Chord } from '../model/modules/sequencer/prog/Chord';

/**
 * This pipe formats the chord names in a musician friendly fashion.
 */
@Pipe({
  name: 'chordNameFormatter'
})
export class ChordNamePipePipe implements PipeTransform {

  transform(chord: Chord): String {
    return null;
  }

}
