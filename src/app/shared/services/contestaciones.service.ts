import { Injectable } from '@angular/core';
import { DataContestaciones, RespContestaciones } from '../models/otros.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class ContestacionesService {

  constructor(private http: AuthService,
              private funcSer: FuncionesComunesService) { }

  getContestaciones = async (id: string) => {
    return new Promise< RespContestaciones[] >((resolve, reject) => {
      try {
        const E$1 = this.http.getContestaciones(id).subscribe((res : RespContestaciones[]) => {
          resolve(res);
          E$1.unsubscribe();
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  enviarContestaciones = async (id: string, data: DataContestaciones) => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const E$2 = this.http.postContestaciones(id, data).subscribe((res) => {
          if (res['id']) {
            this.funcSer.showSweetSuccess('Guardado','Guardado correcto', 1300);
            resolve(true);
          }
          E$2.unsubscribe();
        }, err => {
          this.funcSer.showSweetWarning('Alerta!','No se generaron Cambios',2000);
          E$2.unsubscribe();
          reject(err);
        })
      } catch (err) {
        reject(err);
      }
    })
  }

  actContestaciones = async (id_doc: string, data: DataContestaciones) => {
    return new Promise((resolve, reject) => {
      try {
        const E$2 = this.http.patchContestaciones(id_doc, data).subscribe((res) => {
          this.funcSer.showSweetSuccess('OK!','Datos Actualizados', 1300);
          resolve(res);
          E$2.unsubscribe();
        }, err => {
          this.funcSer.showSweetWarning('Alerta!','No se generaron Cambios',2000);
          E$2.unsubscribe();
          reject(err);
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  eliminarContestaciones = async (id_doc: string) => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const E$2 = this.http.delContestaciones(id_doc).subscribe((res) => {
          if (res) {
            this.funcSer.showSweetSuccess('OK!','Registro Eliminado', 1300);
            resolve(true);
          }
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          reject(err);
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}
