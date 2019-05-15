import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chordQualityFormat'
})
export class ChordQualityPipe implements PipeTransform {

  transform(chordQualityName: string): any {
    let formatted_quality = '';
    switch (chordQualityName) {
      case ('maj'):
        formatted_quality = '';
        break;
      case ('min'):
        formatted_quality = 'm';
        break;
      case ('dim'):
        formatted_quality = 'ᵒ';
        break;
      case ('aug'):
        formatted_quality = '⁺';
        break;
        case ('maj7'):
        formatted_quality = 'ᵐᵃʲ⁷';
        break;
        case ('min7'):
        formatted_quality = 'm⁷';
        break;
        case ('halfDim7'):
        formatted_quality = 'ø⁷';
        break;
        case ('aug7'):
        formatted_quality = '⁺⁷';
        break;
        case ('min9'):
        formatted_quality = 'ᵐ⁹';
        break;
        case ('dim9'):
        formatted_quality = 'ᵒ⁹';
        break;
        case ('dim7'):
        formatted_quality = 'ᵒ⁷';
        break;
        case ('aug9'):
        formatted_quality = '⁺⁹';
        break;
        case ('maj9'):
        formatted_quality = 'ᵐᵃʲ⁹';
        break;
        case ('dom7'):
        formatted_quality = '⁷';
        break;
        case ('dom13'):
        formatted_quality = '¹³';
        break;
    }
    return formatted_quality;
  }

}
