import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora24'
})
export class Hora24Pipe implements PipeTransform {

  transform(val: string): string {
    let value: string;
    if (val) {
      let x = val.split(':');
      let h = Number(x[0]);
      let ap: string;
      if (h > 12) {
        ap = 'P.M.'
        h = h - 12;
      }else {
        ap = 'A.M.';
      }

      value = `${h}:${x[1]} ${ap}`;
    }
    return value;
  }

}
