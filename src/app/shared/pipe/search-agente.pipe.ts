import { Pipe, PipeTransform } from '@angular/core';
import { AgentModel } from '../models/otros.model';

@Pipe({
  name: 'searchAgente'
})
export class SearchAgentePipe implements PipeTransform {

  transform(value: string, agentes: AgentModel[]): string {
    let nombre: string;

    if ( value && value != '0' ) {
      agentes.forEach(e => {
        if ( e.id_user == value ) {
          nombre = `${e.nombres.slice(0,15)}`;
        }
      });

      return nombre ? nombre : 'Desconectado' ;

    } else {
      return 'No Asignado';
    }
  }

}
