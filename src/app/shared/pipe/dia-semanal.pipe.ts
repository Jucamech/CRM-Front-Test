import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSemanal'
})
export class DiaSemanalPipe implements PipeTransform {

  transform(val: string ): string {
    let dia: string = '';
    if (val) {
      if (val == '0') dia = 'Domingo';
      else if (val == '1') dia = 'Lunes';
      else if (val == '2') dia = 'Martes';
      else if (val == '3') dia = 'Miercoles';
      else if (val == '4') dia = 'Jueves';
      else if (val == '5') dia = 'Viernes';
      else if (val == '6') dia = 'Sábado';
      else if (val == '7') dia = 'Domingo';
    }
    return dia? dia: '';
  }

}
