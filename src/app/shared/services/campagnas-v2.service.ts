import { Injectable } from '@angular/core';
import { DataPachCampaV2, DataPostCampaV2, ErrorHttp, ResCampañaV2, RespDataCampaV2 } from '../models/otros.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class CampagnasV2Service {

  constructor(private http: AuthService,
              private funcSer: FuncionesComunesService) { }

  getCampagnas = async () => {
    return new Promise<ResCampañaV2[]>((resolve, reject) => {
      try {
        let data = []
        const E$1 = this.http.getCampagnas().subscribe((res: ResCampañaV2[]) => {
          for (const k in res) {
            const el = res[k];
            data.push(el);
          }
          resolve(data);
          E$1.unsubscribe();
        }, err => {
          this.funcSer.logWarn('Error getcampañas', err);
          E$1.unsubscribe();
        });
      } catch (err) {
        this.funcSer.logWarn('Error getcampañas catch', err);
        reject(err);
      }
    })
  }

  async postCampa(data: ResCampañaV2) {
    return new Promise(resolve => {
      const E$5 = this.http.postCampagnas( data).subscribe(r => {
        resolve(r);
        E$5.unsubscribe();
      }, err => {
        this.funcSer.logWarn('Error crear Campaña()', err);
        E$5.unsubscribe();
      });
    })
  }

  async patchCampa(id:string ,data: ResCampañaV2) {
    return new Promise(resolve => {
      const E$6 = this.http.patchCampagnas(id, data).subscribe(r => {
        resolve(r);
        E$6.unsubscribe();
      }, err => {
        this.funcSer.logWarn('Error Mod Campaña()', err);
        E$6.unsubscribe();
      });
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////

  getDataCampagnas = async (id: string) => {
    return new Promise<RespDataCampaV2[]>((resolve, reject) => {
      try {
        let data = []
        const E$2 = this.http.getDataCampagnas(id).subscribe((res: RespDataCampaV2[]) => {
          for (const k in res) {
            const el = res[k];
            data.push(el);
          }
          resolve(data);
          E$2.unsubscribe();
        }, err => {
          this.funcSer.showToast('No se Obtuvieron datos', 'Atención!', 2500, 1);
          this.funcSer.logWarn('Error getDataCampañas', err);
          E$2.unsubscribe();
        });
      } catch (err) {
        this.funcSer.logWarn('Error getDataCampañas catch', err);
        reject(err);
      }
    })
  }

  async enviarClientCamp(data: DataPostCampaV2) {
    return new Promise(resolve => {
      const E$3 = this.http.postDataCampagnas(data).subscribe(r => {
        resolve(r);
        E$3.unsubscribe();
      }, (err: ErrorHttp) => {
        if (err.status == 409 ) {
          this.funcSer.showToast('El Cliente ya Existe en esta Campaña!', 'Error!', 2000, 0 );
        }
        this.funcSer.logWarn('Error enviarClientCamp()', err);
        E$3.unsubscribe();
      });
    });
  }

  async actualizarClientCamp(id: string, data: DataPachCampaV2) {
    this.funcSer.log('data act llamada 2', data);
    return new Promise(resolve => {
      const E$4 = this.http.patchDataCampagnas(id, data).subscribe(r => {
        resolve(r);
        E$4.unsubscribe();
      }, err => {
        this.funcSer.logWarn('Error enviarClientCamp()', err);
        E$4.unsubscribe();
      });
    })
  }




}
