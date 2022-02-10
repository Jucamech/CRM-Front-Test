import { Pipe, PipeTransform } from '@angular/core';
import { RespPago } from '../models/usuario.model';

@Pipe({
  name: 'listaStatus1'
})
export class ListaStatus1Pipe implements PipeTransform {
  /** @param  /→ Id /→ Nombre /→ Fecha */
  transform( cobros: RespPago[], value:string, opc: string): RespPago[]{
    let data : RespPago[] = [];
    if (value) {
      cobros.forEach(c => {
        switch (opc) {
          case 'Id':
            if (String(c.id_cliente) == value) {
              data.push(c);
            }
            break;
          case 'Nombre':
            if (c.nombres.toLowerCase().includes( value.toLowerCase() )) {
              data.push(c);
            }
            break;
          case 'Fecha':
            if (c.fecha_pago == value) {
              data.push(c);
            }
            break;
          default:
            if (c.nombres.toLowerCase().includes( value.toLowerCase() )) {
              data.push(c);
            }
            break;
        }
      });
    } else {
      data = cobros;
    }
    return data;
  }

}
