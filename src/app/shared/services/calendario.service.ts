import { Injectable } from '@angular/core';
import { DataPostHistorial, DiasRespHistorial, FechasPost, RespHistorial } from '../models/otros.model';
import { ClientModel } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  constructor(private funcSer: FuncionesComunesService,
              private httpSer: AuthService) { }


  getDataMes = async (id:string, data: FechasPost, arr: number[] ) =>
  new Promise<RespHistorial[]>((resolve, reject) => {
    try {
      let resp: RespHistorial[] = [];
      const E$1 = this.httpSer.postGetDataCalendario(id, data).subscribe((res: RespHistorial[]) => {
        for (const k in res) {
          const el = res[k];
          if (Number(el.import) > 1) {
            resp.push(el);
          }
        }
        resolve(resp);
        E$1.unsubscribe();
      }, err => {
        this.funcSer.logWarn('Error GetdataCalandario', err);
        reject(err);
        E$1.unsubscribe();
      })
    } catch (err) {
      this.funcSer.logWarn('Error GetdataCalandario Catch', err);
      reject(err);
    }
  });

  generarDiasconData(data: RespHistorial[],
                     arr: number[],
                     client: Partial<ClientModel>,
                     ini_mes: number): DiasRespHistorial[] {
    this.funcSer.log('inicio', ini_mes);
    let dataFull:DiasRespHistorial[] = [];
    let tipoS = client.campos_adicionales.sueldoS_Q;

    let t1 = client.campos_adicionales.dia_pago ? client.campos_adicionales.dia_pago : '55';
    let t2 = client.campos_adicionales.dia_pago2 ? client.campos_adicionales.dia_pago2 : '55';
    let t3 = client.campos_adicionales.dia_pagoS ? client.campos_adicionales.dia_pagoS : '55';

    arr.forEach(d => {
      let z = new Date(this.crearFechas(d + 1)).getDay();
      let x:DiasRespHistorial = { dia: d, data: [], dia_pago: false };

      if (d == (Number(t1) - 1 )) {
        x.dia_pago = true;
      } else if (d == (Number(t2) - 1 )) {
        x.dia_pago = true;
      }else if ( tipoS == '1' && z == (Number(t3) - 1) ) {
        x.dia_pago = true;
      }

      data.forEach(dat => {
        let dia = new Date(dat.fecha).getDate();
        if (d + 1 == dia) {
          x.data.push(dat);
        }
      });
      dataFull.push(x);
    });
    this.funcSer.log('dataFull',dataFull);
    return dataFull;
  }

  postData = async (data: DataPostHistorial) =>
  new Promise<object>((resolve, reject) => {
    try {
      const E$2 = this.httpSer.postDataCalendario(data).subscribe(res => {
        resolve(res);
        E$2.unsubscribe();
      }, err => {
        this.funcSer.logWarn('Error PostdataCalandario', err);
        reject(err);
        E$2.unsubscribe();
      })
    } catch (err) {
      reject(err);
    }
  })


  private crearFechas(n:number):string{
    let d:string;
    if (n < 10) {
      d = `0${n}`;
    } else { d = `${n}`; }
    let b = `${this.funcSer.getFecha().slice(0,8)}`
    return `${b}${d} 10:00:00`;
  }
}



