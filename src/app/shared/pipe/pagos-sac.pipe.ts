import { Pipe, PipeTransform } from '@angular/core';
import { RespPago } from '../models/usuario.model';

@Pipe({
  name: 'pagosSac'
})
export class PagosSacPipe implements PipeTransform {

  transform(data: RespPago[], page:number = 0 ): RespPago[] {
    let newData: RespPago[] = [];
    if (data) {
      newData = data.slice( page, page + 100 );
    }
    return newData;
  }

}
