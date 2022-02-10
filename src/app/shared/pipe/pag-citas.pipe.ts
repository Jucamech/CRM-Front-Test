import { Pipe, PipeTransform } from '@angular/core';
import { RespCitas, RespCitasM } from '../models/usuario.model';

@Pipe({
  name: 'pagCitas'
})
export class PagCitasPipe implements PipeTransform {

  transform(citas: RespCitasM[],
            id_user: string | number): RespCitas[] | RespCitasM[] {

    let CitasM: RespCitasM[] = [];
    if (id_user && citas){
      citas.forEach(cita => {
        if (String(cita.id_asignado) == String(id_user)) {
          CitasM.push(cita);
        }
      });
    }
    return CitasM.length > 0 ? CitasM: citas;
  }

}
