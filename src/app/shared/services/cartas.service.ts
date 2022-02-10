import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import { FirebaseService } from './firebase.service';
import { environment } from 'src/environments/environment';

export interface DataCarta {
  ronda: string,
  id_user?: string,
  id?: string,
  fecha_envio: string,
  cuentas?: string,
  num_tracking: string,
  buro?: string,
  tracking: string,/// doc
  carta: string, /// doc
}

export interface RespCartaFire {
  id: string;
  data: DataCarta;
  index: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  coll = environment.fireColecc;

  constructor(private httpSer: AuthService,
              private fire: FirebaseService,
              private funcSer: FuncionesComunesService) { }

  crearRegistro = async (id: string, data: DataCarta) =>
  new Promise((resolve, reject) => {
    try {
      const E$1 = this.httpSer.postCartas(id, data).subscribe(
        res => {
          if (res['id']) {
            this.funcSer.showSweetSuccess('Guardado','Guardado correcto', 1300);
          }
          E$1.unsubscribe();
          resolve(res['id']);
        },err => {
          reject (err);
        });
    } catch (err) {
      reject (err);
    }
  })

  crearRegistroF = async (id: string, data: DataCarta) =>
  new Promise((resolve, reject) => {
    try {
      let col = `${this.coll}carta-${id}`;
      this.fire.sendCarta(data, col).then((res) => {
        this.funcSer.showSweetSuccess('Guardado','Cambios Guardados',1300);
        resolve(res);
      });
    } catch (err) {
      reject (err);
    }
  })

  editarRegistro = async (id: string, data: DataCarta) =>
  new Promise((resolve, reject) => {
    try {
      const E$1 = this.httpSer.patchCarta(id, data).subscribe(r => {
        if (r['rows'] == 1) {
          this.funcSer.showSweetSuccess('Guardado','Cambios Guardados',1300);
          E$1.unsubscribe();
          resolve('ok')
        }
        else{
          this.funcSer.showSweetWarning('Alerta!','No se generaron Cambios',2000);
        }
      });
    } catch (err) {
      reject (err)
    }
  })

  eliminarCartaFire(id: string, colle: string) {
    this.fire.delCarta(id, colle).then(() => {
      this.funcSer.showSweetSuccess('Eliminado!','Cambios Guardados',1300);
    });
  }

  getRegistros = async (id: string) =>
  new Promise((resolve, reject ) => {
    try {
      let cartas: DataCarta[] = [];
      const E$1 = this.httpSer.getCartas(id).subscribe((res : DataCarta) => {
        for (const k in res) {
          const el = res[k];
          cartas.push(el);
        }
        E$1.unsubscribe();
        resolve(cartas);
      });
    } catch (err) {
      reject (err);
    }
  })

  deleteRegistros = async (id: string) =>
  new Promise<boolean>((resolve, reject ) => {
    try {
      const E$1 = this.httpSer.delCartas(id).subscribe(() => {
        this.funcSer.showSweetSuccess('Ok', 'Registro Eliminado', 1500);
        E$1.unsubscribe();
        resolve(true);
      });
    } catch (err) {
      reject (err);
    }
  })


  getRegistrosF = async (id: string) =>
  new Promise((resolve, reject ) => {
    try {

    } catch (err) {
      reject (err);
    }
  })

}
