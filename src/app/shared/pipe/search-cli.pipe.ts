import { Pipe, PipeTransform } from '@angular/core';
import { ClienteModelGen } from '../models/usuario.model';

@Pipe({
  name: 'searchCli'
})
export class SearchCliPipe implements PipeTransform {

  transform(value: string, clientes: ClienteModelGen[]): string {
    let nombre: string;

    if ( value && value.length == 7 ) {

      clientes.forEach(e => {
        if ( e.telmovil == value ) {
          nombre = `${e.nombres.slice(0,15)} ${e.apellidos.slice(0,10)}`;
        }
      });
      return nombre ? nombre : 'Desconocido';
    } else {
      return 'No reconocido';
    }
  }

}
