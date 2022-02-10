import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modTel'
})
export class ModTelPipe implements PipeTransform {
  /**
   * Modifica un numero de telefono añadiendo *****
   * @param value : string de 10 digitos "1234567890"
   * @returns numero de telofono "1234*****0"
   */
  transform(value): string {
    if (value) {

      let val = value.slice(4, 9);
      value = value.replace(val, '*****');
    }
    return value;
  }

}
