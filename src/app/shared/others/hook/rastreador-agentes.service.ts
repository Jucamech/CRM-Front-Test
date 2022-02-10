import { Injectable } from '@angular/core';
import { DataStatusAgent, FechasPostParam, RespStatusAgent } from '../../models/otros.model';
import { AuthService } from '../../services/auth.service';
import { FuncionesComunesService } from '../../services/funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class RastreadorAgentesService {
  userColl: string;
  key_l: string;
  id: string;

  constructor(private http: AuthService,
              private funcSer: FuncionesComunesService)
  {
    this.id = localStorage.getItem('id_agente');
  }

  generarKey(): string{
    return Math.random().toString(36).substr(2, 18);
  }

  crearRegistro  = async (data: DataStatusAgent) => {
    return new Promise<RespStatusAgent>((resolve, reject) => {
      try {
        const E$1 = this.http.postStalker(data).subscribe((res :RespStatusAgent ) => {
          resolve(res);
          E$1.unsubscribe();
        }, err => {
          this.funcSer.logWarn('Error post Stalker', err);
          reject(err);
          E$1.unsubscribe();
        })
      } catch (err) {
        this.funcSer.logWarn('ERROR Stalker', err);
        reject(err);
      }
    })
  }

  actualizarDataStalker(id: string, data: DataStatusAgent){
    try {
      const E$2 = this.http.patchStalker(id, data).subscribe((r) => {
        E$2.unsubscribe();
      }, () => {
        E$2.unsubscribe();
      });
    } catch (err) {
      this.funcSer.logWarn('ERROR Stalker', err);
    }
  }

  getDataStalker = async (id: string, data: FechasPostParam ) => {
    return new Promise<RespStatusAgent[]>((resolve, reject) => {
      try {
        let dat:RespStatusAgent[] = [];
        const E$1 = this.http.getPostStalker(id, data).subscribe((res :RespStatusAgent[] ) => {
          for (const k in res) {
            const el = res[k];
            dat.push(el);
          }
          this.ordenar(dat);
          resolve(dat);
          E$1.unsubscribe();
        }, err => {
          this.funcSer.logWarn('Error get post Stalker', err);
          reject(err);
          E$1.unsubscribe();
        })
      } catch (err) {
        this.funcSer.logWarn('ERROR get Stalker Catch', err);
        reject(err);
      }
    });
  }


  ordenar(data: RespStatusAgent[]){
    data.sort(function (a, b) {
      if (a.hora_final < b.hora_final) {
        return 1;
      }
      if (a.hora_final > b.hora_final) {
        return -1;
      }
      return 0;
    });
  }

}
