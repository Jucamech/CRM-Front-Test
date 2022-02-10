import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secToMin'
})
export class SecToMinPipe implements PipeTransform {

  /***
   * Transforma segundos a tiempo de hora:min:segundos
   */
  transform(value: string): string {

    let resultado: string;

    if (value) {
      let d = Number(value);
      let h = Math.floor(d / 3600);
      let m = Math.floor(d % 3600 / 60);
      let s = Math.floor(d % 3600 % 60);

      let hD = h > 9 ? `${h}`: `${h}`;
      let mD = m > 9 ? `${m}`: `0${m}`;
      let sD = s > 9 ? `${s}`: `0${s}`;
      resultado = h ? `${hD}:${mD}:${sD}` : `${mD}:${sD}`
    }
    return resultado
  }

}
