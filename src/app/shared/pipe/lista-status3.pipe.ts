import { Pipe, PipeTransform } from '@angular/core';
import { RespPago } from '../models/usuario.model';

@Pipe({
  name: 'listaStatus3'
})
export class ListaStatus3Pipe implements PipeTransform {
  /** @param  /→ Id   /→ Nombre */
  transform( cobros: RespPago[][], value:string, opc: string, page: number = 0 ): RespPago[][]{
    let data : RespPago[][] = [];
    if (value) {
      cobros.forEach( c => {
        switch (opc) {
          case 'Id':
            if (String(c[0].id_cliente) == value) {
              data.push(c);
            }
            break;
          case 'Nombre':
            if ((c[0].nombres.toLowerCase()).includes(value) ) {
              data.push(c);
            }
            break;

          default:
            if ((c[0].nombres.toLowerCase()).includes(value) ) {
              data.push(c);
            }
            break;
        }
      });
    } else {
      data = cobros;
    }
    return data = data.slice(page , page + 20 );
  }

}
