import { Pipe, PipeTransform } from '@angular/core';
import { ClienteModelGen } from '../models/usuario.model';

@Pipe({
  name: 'searchCliID'
})
export class SearchCliIDPipe implements PipeTransform {

  transform(value: number | string, clientes: ClienteModelGen[]): string {
    let name: string;
    value = String(value);
    if (value && clientes ) {
      clientes.forEach(e => {
        if ( e.id == value ) { name = `${e.nombres || 'LLamada'} ${e.apellidos || 'Perdida'}`;  }
      });
      return name
    } else {
      return null;
    }
  }

}
/*
   transform(value: string, clientes: ClienteModelGen[], n:number = 0): string {
    let id: string[];

    if (value && value.length == 5) {
      clientes.forEach(e => {
        if ( e.telmovil == value ) {
          id.push(`${e.id}`);
        } else if ( e.telcasa == value ) {
          id.push(`${e.id}`);
        } else if ( e.teltrabajo == value ) {
          id.push(`${e.id}`);
        } else if ( e.telotro == value ) {
          id.push(`${e.id}`);
        }
      });

      return id[1];

    } else {
      return null;
    }
  }

*/
////////////////////////////////////////////////
/*
  transform(value: string, clientes: ClienteModelGen[]): string {
    let id: string;

    if (value && value.length == 5) {
      clientes.forEach(e => {
        if ( e.telmovil == value ) {
          id = `${e.id}`;
        } else if ( e.telcasa == value ) {
          id = `${e.id}`;
        } else if ( e.teltrabajo == value ) {
          id = `${e.id}`;
        } else if ( e.telotro == value ) {
          id = `${e.id}`;
        }
      });

      return id ? id : null;

    } else {
      return null;
    }
  }

*/
