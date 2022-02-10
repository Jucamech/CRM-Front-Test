import { Pipe, PipeTransform } from '@angular/core';
import { LlamadasResp } from '../models/otros.model';

@Pipe({
  name: 'paging'
})


export class PagingPipe implements PipeTransform {
  /**
   * Crea la paginacion del registro de la llamadas
   * @param llamadas
   * @param page el numero base de la paginacion
   * @param search busca coincidencias dependiendo el argumento
   * @param arg argumento de la busqueda en llamadas
   * @param ord orden en q se posicionan las llamadas
   * @returns
   */
  transform(llamadas: LlamadasResp[],
            page: number = 0,
            search: string = '',
            arg: string = '',
            ord: string = ''): LlamadasResp[]
  {
    let llamadasCopia: LlamadasResp[] = llamadas;

    if (ord == 'Asc') {
      llamadas.sort(function (a, b) {
        if ( a.origen < b.origen ) return -1;
        if ( a.origen > b.origen ) return 1;
        return 0;
      });
    }

    if (ord == 'Des') {
      llamadas.sort(function (a, b) {
        if ( a.origen < b.origen ) return 1;
        if ( a.origen > b.origen ) return -1;
        return 0;
      });
    }

    if (ord == '') {
      if (llamadas && llamadas.length > 0) {
        llamadas.sort(function (a, b) {
          if ( a.fecha < b.fecha ) return 1;
          if ( a.fecha > b.fecha ) return -1;
          return 0;
        });
      }
    }

    if (ord == 'Inv') {
      llamadas.sort(function (a, b) {
        if ( a.fecha < b.fecha ) return -1;
        if ( a.fecha > b.fecha ) return 1;
        return 0;
      });
    }

    let vacio:LlamadasResp[] = []
    if (search.length == 0 && llamadas)  return llamadas.slice( page, page + 50 );

    if (arg == 'todo' && llamadas) {

      let llamadasFilt2:LlamadasResp[] = [];
      llamadas.forEach(llamada => {
        if (llamada.origen.includes( search )  || llamada.destino.includes( search )) {
          llamadasFilt2.push(llamada);
        }

      })
      return llamadasFilt2? llamadasFilt2.slice( page, page + 50 ): llamadasFilt2;

    } else {

      const llamadasFilt = llamadas? llamadas.filter(llamada => llamada[arg].includes( search ) ): vacio;
      return llamadasFilt.slice( page, page + 50 );

    }

  }

}
