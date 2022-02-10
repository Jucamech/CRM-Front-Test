import { Pipe, PipeTransform } from '@angular/core';
import { RespUser } from '../models/usuario.model';

@Pipe({
  name: 'searchAgente2'
})
export class SearchAgente2Pipe implements PipeTransform {

  transform(value: string | number, agentes: RespUser[]): string {
    let nombre: string;
    value = String(value);

    if ( value && value != '0' && agentes ) {
      agentes.forEach(e => {
        if ( String(e.id) == value ) {
          nombre = `${e.nombre.slice(0,15)} ${e.apellido.slice(0, 20)}`;
        }
      });

      return nombre;

    } else {
      return 'No Asignado';
    }
  }

}
