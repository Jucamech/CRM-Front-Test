import { Injectable } from '@angular/core';
import { RespCitas } from '../../models/usuario.model';
import { CitasService } from '../../services/citas.service';
import { FirebaseService } from '../../services/firebase.service';
import { FuncionesComunesService } from '../../services/funciones-comunes.service';
import { NotasService } from '../../services/notas.service';

@Injectable({
  providedIn: 'root'
})
export class RastreadorCitasService {
  citasH: RespCitas[];
  regex = /7|8|4/;

  constructor(private fire: FirebaseService,
              private citaSer: CitasService,
              private notaSer: NotasService,
              private funcSer: FuncionesComunesService) { }

  async citasHoy(): Promise<RespCitas[]> {
    this.citasH = [];
    await this.citaSer.callCitasHoySinF().then((res: RespCitas[]) => {
      this.citasH = this.procesar(res);
    });
    return this.citasH;
  }
  /**
   * busca las citas Importantes
   */
  private procesar(citas: RespCitas[]): RespCitas[]{
    citas.forEach(e => {
      if (e.motivo.match(this.regex)) {
        //this.funcSer.log('citas', e);
      }
    })
    return citas;
  }


}

