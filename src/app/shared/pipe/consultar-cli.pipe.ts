import { Pipe, PipeTransform } from '@angular/core';
import { ClienteModelGen } from '../models/usuario.model';

@Pipe({
  name: 'consultarCli'
})
export class ConsultarCliPipe implements PipeTransform {

  transform(value: ClienteModelGen[], page: number, ord: string = ''): ClienteModelGen[] {
    let data: ClienteModelGen[] = [];
    if (value) {
      data = value;
      if (ord == 'id') {
        data.sort(function (a, b) {
          if (Number(a.id) < Number(b.id)) {
            return -1;
          }
          if (Number(a.id) > Number(b.id)) {
            return 1;
          }
          return 0;
        });
      }else if (ord == 'alf' || ord == '' ) {
        data.sort(function (a, b) {
          if (a.nombres < b.nombres) {
            return -1;
          }
          if (a.nombres > b.nombres) {
            return 1;
          }
          return 0;
        });
      }
      data = data.slice( page, page + 100 );
    }

    return data;
  }

}
