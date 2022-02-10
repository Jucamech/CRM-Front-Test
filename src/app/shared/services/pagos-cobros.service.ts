import { EventEmitter, Injectable } from '@angular/core';
import { RespPago } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { ErrorHttp, FechasPagos } from '../models/otros.model';
import { FuncionesComunesService } from './funciones-comunes.service';

export interface DataPago {
  id_user: string,
  fecha_pago: string,
  medio: string,
  descripcion: string,
  valor: string,
  tipo_pago: string,
  num_pago: number,
  color: string,
  status: string,
}

export interface DataCobro {
  descripcion: string,
  id_asesor: string,
  status: string,
  tipo_pago: string,
  fecha_pago: string,
  valor: number;
  medio?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})

export class PagosCobrosService {
  cobrosHoy:  RespPago[] = [];
  pagosHoy:  RespPago[] = [];

  cobrosTodos:  RespPago[] = [];
  pagosTodos:  RespPago[] = [];

  pagosClient:  RespPago[] = [];
  cobrosClient:  RespPago[] = [];

  hoy: FechasPagos;

  /**
  * Emite todas los cobros y pagos existentes
  */
  ClientPagosCobros$ = new EventEmitter<RespPago[][] | null>();
  /**
  * Emite todas los cobros y pagos existentes
  */
  AllPagosCobros$ = new EventEmitter<RespPago[][] | null>();
  /**
  * Emite todas los cobros y pagos de hoy
  */
  HoyPagosCobros$ = new EventEmitter<RespPago[][] | null>();

  constructor(private httpSer: AuthService,
              private functC: FuncionesComunesService)
  {
    this.hoy = {
      fecha_inicio: `${this.functC.getHoy().slice(0, 10)}`,
      fecha_final: `${this.functC.getHoy().slice(0, 10)}`
    }
  }

  /* ---------------------------TODAS LOS COBROS Y PAGOS------------------------------ */

  /**
   * Llama todos los cobros
   * @returns
   */
  callAllCobros = async () =>
  new Promise< RespPago[]>((resolve, reject) => {
    try {
      if (this.cobrosTodos) {
        resolve(this.cobrosTodos)
      } else {
        this.cobrosTodos = [];
        const E$1 = this.httpSer.getCobroS().subscribe((res: RespPago[]) => {
          for (const key in res){
            const el = res[key];
            this.cobrosTodos.push(el);
          }
          this.ordenar(this.cobrosTodos);
          resolve(this.cobrosTodos);
          E$1.unsubscribe();
        },(err: ErrorHttp)=> {
          if (err.status == 401) {
            this.functC.showSweetError('Error!','Sesión Vencida',2000);
          }
          E$1.unsubscribe();
        })
      }
    } catch (err) {
      this.functC.showSweetError('ERROR',`Error en COBROS / ${err}`,3000);
      reject(err)
    }
  })


  callAllPagos = async () =>
  new Promise< RespPago[]>((resolve, reject) => {
    try {
      if (this.pagosTodos) {
        resolve(this.pagosTodos)
      } else {
        this.pagosTodos = [];
        const E$2 = this.httpSer.getPagos().subscribe((res: RespPago[]) => {
          for (const key in res){
            const el = res[key];
            this.pagosTodos.push(el);
          }
          this.ordenar(this.pagosTodos);
          resolve(this.pagosTodos);
          E$2.unsubscribe();
        },(err: ErrorHttp)=> {
          if (err.status == 401) {
            this.functC.showSweetError('Error!', 'Sesión Vencida',1500);
          }
          E$2.unsubscribe();
        })
      }
    } catch (err) {
      this.functC.showSweetError('ERROR',`Error en PAGOS / ${err}`,3000);
      reject(err)
    }
  })

  /**
   * emite toda la data de cobros y pagos juntas
   * @returns [ cobros, pagos ]
   */
  emiteAllData = async () =>
  new Promise< RespPago[][]>((resolve, reject) => {
    try {
      let allData: RespPago[][] = [];
      let cobros: RespPago[] = [];
      let pagos: RespPago[] = [];
      this.callAllCobros().then(res => {
        cobros = res;
        return 'ok'
      }).then(() => {
        this.callAllPagos().then(res => {
          pagos = res;
          allData = [cobros, pagos]
          this.AllPagosCobros$.emit( allData )
          resolve(allData)
        },(err: ErrorHttp)=> {
          if (err.status == 401) {
            this.functC.showSweetError('Error!', 'Sesión Vencida',1500);
          }
        })
      })
    } catch (err) {
      reject(err)
    }
  })

  /**
   * Actualiza toda la data.
   */
  refreshDataAll(){
    this.pagosTodos = [];
    this.cobrosTodos = [];
    const E$3 = this.httpSer.getPagos().subscribe((res: RespPago[]) => {
      for (const key in res){
        const el = res[key];
        this.pagosTodos.push(el);
      }
      if (this.pagosTodos && this.cobrosTodos) {
        this.emiteAllData();
      }
      E$3.unsubscribe();
    });
    const E$4 = this.httpSer.getCobroS().subscribe((res: RespPago[]) => {
      this.cobrosTodos = [];
      for (const key in res){
        const el = res[key];
        this.cobrosTodos.push(el);
      }
      if (this.pagosTodos && this.cobrosTodos) {
        this.ordenar(this.cobrosTodos);
        this.ordenar(this.pagosTodos);
        this.emiteAllData();
      }
      E$4.unsubscribe();
    });
  }

  /* ------------------------TODAS LOS COBROS Y PAGOS--------------------------- */
  /* --------------------------------------------------------------------------- */
  /* ---------------------------HOY COBROS Y PAGOS------------------------------ */

  callCobrosHoy = async () =>
  new Promise< RespPago[]>((resolve, reject) => {
    try {
      let cobrosH:RespPago[] = [];
      const E$5 = this.httpSer.getCobrosFechas(this.hoy).subscribe(res => {
        for (const key in res){
          const el = res[key];
          cobrosH.push(el);
        }
        this.ordenar(cobrosH);
        resolve(cobrosH);
        E$5.unsubscribe();
      })
    } catch (err) {
      this.functC.showSweetError('ERROR',`Error en PAGOS / ${err}`,3000);
      reject(err)
    }
  })

  callPagosHoy = async () =>
  new Promise< RespPago[]>((resolve, reject) => {
    try {
      let pagosH:RespPago[] = [];
      const E$6 = this.httpSer.getPagosFechas(this.hoy).subscribe(res => {
        for (const key in res){
          const el = res[key];
          pagosH.push(el);
        }
        this.ordenar(pagosH);
        resolve(pagosH);
        E$6.unsubscribe();
      })
    } catch (err) {
      this.functC.showSweetError('ERROR',`Error en PAGOS / ${err}`,3000);
      reject(err)
    }
  })

    /**
   * Actualiza toda la data.
   * depred
   */
  refreshDataHoy(){
    this.pagosHoy = [];
    this.cobrosHoy = [];
    const E$6 = this.httpSer.getPagosFechas(this.hoy).subscribe((res: RespPago[]) => {
      for (const key in res){
        const el = res[key];
        this.pagosHoy.push(el);
      }
      this.ordenar(this.pagosHoy);
      E$6.unsubscribe();
    });
    const E$7 = this.httpSer.getCobrosFechas(this.hoy).subscribe((res: RespPago[]) => {
      for (const key in res){
        const el = res[key];
        this.cobrosHoy.push(el);
      }
      this.ordenar(this.cobrosHoy);
      E$7.unsubscribe();
    });
  }

    /**
   * emite la data de cobros y pagos juntas de hoy
   * @returns [ cobros, pagos ]
   */
  emiteAllHoy = async () =>
  new Promise< RespPago[][]>((resolve, reject) => {
    try {
      let allData: RespPago[][] = [];
      let cobros: RespPago[] = [];
      let pagos: RespPago[] = [];
      this.callCobrosHoy().then(res => {
        cobros = res;
        return 'ok'
      }).then(() => {
        this.callPagosHoy().then(res => {
          pagos = res;
          allData = [cobros, pagos];
          this.HoyPagosCobros$.emit( allData );
          resolve(allData);
        })
      })
    } catch (err) {
      this.functC.logWarn('Error Emit All H', err);
      reject(err)
    }
  })

  /* ---------------------------HOY COBROS Y PAGOS-------------------------------- */
  /* ----------------------------------------------------------------------------- */
  /* ---------------------------FECHA COBROS Y PAGOS------------------------------ */

  callPagosFecha = async (fechas: FechasPagos) =>
  new Promise< RespPago[]>((resolve, reject) => {
    try {
      let pagos: RespPago[] = [];
      const E$8 = this.httpSer.getPagosFechas(fechas).subscribe(res => {
        for (const key in res){
          const el = res[key];
          pagos.push(el);
        }
        this.ordenar(pagos);
        resolve(pagos);
        E$8.unsubscribe();
      })
    } catch (err) {
      this.functC.showSweetError('ERROR',`Error en PAGOS / ${err}`,3000)
      reject(err)
    }
  })

  callCobrosFecha = async (fechas: FechasPagos) =>
  new Promise< RespPago[]>((resolve, reject) => {
    try {
      let cobros: RespPago[] = [];
      const E$9 = this.httpSer.getCobrosFechas(fechas).subscribe(res => {
        for (const key in res){
          const el = res[key];
          cobros.push(el);
        }
        this.ordenar(cobros);
        resolve(cobros);
        E$9.unsubscribe();
      })

    } catch (err) {
      this.functC.showSweetError('ERROR',`Error en COBROS / ${err}`,3000);
      reject(err)
    }
  })

  CallFechaAll = async (fechas: FechasPagos) =>
  new Promise< RespPago[][]>((resolve, reject) => {
    try {
      let allData: RespPago[][] = [];
      let cobros: RespPago[] = [];
      let pagos: RespPago[] = [];
      this.callCobrosFecha(fechas).then(res => {
        cobros = res;
        return 'ok'
      }).then(() => {
        this.callPagosFecha(fechas).then(res => {
          pagos = res;
          allData = [cobros, pagos]
          resolve(allData)
        })
      })
    } catch (err) {
      reject(err)
    }
  })

  /* ---------------------------FECHA COBROS Y PAGOS------------------------------ */
  /* ----------------------------------------------------------------------------- */
  /* ---------------------------GENERAR COBRO CLIENTE----------------------------- */

  /**
   * llamado a la data cobros/pagos del cliente
   * @param id Cliente ID
   * @returns [ cobro, pagos ]
   */
  CallDataCli = async ( id: string ) =>
  new Promise< RespPago[][]>((resolve, reject) => {
    try {
      let data: RespPago[][] = [];
      let cobros: RespPago[] = [];
      let pagos: RespPago[] = [];
      const E$10 = this.httpSer.getPago(id).subscribe((res: RespPago[]) => {
        if (res) {
          this.functC.log('get pagos', res);
          //this.ordenar(res);
          for (const clave in res) {
            const el = res[clave]
            if (el.status == 1) {
              pagos.push(el);
            } else if (el.status == 0) {
              cobros.push(el);
            }
          }
          this.ordenar2(cobros);
          this.ordenar2(pagos);
          data = [cobros, pagos];
          this.ClientPagosCobros$.emit(data);
          resolve(data);
          E$10.unsubscribe();
        }
      }, err => {
        E$10.unsubscribe();
        reject(err);
      })
    } catch (err) {
      this.functC.showSweetError('ERROR',`${err}`,3000);
      reject(err);
    }
  })

  /**
   * Generar Cobros
   * @param id cliente ID
   * @param data
   * @returns si es exitoso o no
   */
  generarCobro = async ( id: string,data: DataPago ) =>
  new Promise< boolean >((resolve, reject) => {
    try {
      const E$11 = this.httpSer.postPago(id,data).subscribe(r => {
        if (r) {
          this.CallDataCli(id);
          this.functC.showSweetSuccess('OK!','', 1200)
          resolve(true);
        }
        E$11.unsubscribe();
      });
    } catch (err) {
      this.functC.showSweetError('ERROR',`${err}`,3000);
      reject(false);
    }
  })

  /** EDITOR DE LOS PAGOS/COBROS para uso del usuario */
  editarPagoCobro = async (id: string, data: DataCobro ) =>
  new Promise< boolean >((resolve, reject) => {
    try {
      const E$12 = this.httpSer.patchPago(id,data).subscribe( r => {
        if (r) {
          this.functC.showSweetSuccess('OK', 'Se ha Actualazado los Datos', 2000);
          resolve(true);
        }
        E$12.unsubscribe();
      })
    } catch (err) {
      this.functC.logWarn('ERROR', err);
      reject(false);
    }
  })

  /* ----------------------------------------------------------------------------- */

  /** EDITOR DE LOS PAGOS/COBROS para uso del pagosSAC */
  generarPagoOnCobro = async (id: string, data: DataCobro ) =>
  new Promise< boolean >((resolve, reject) => {
    try {
      const E$13 = this.httpSer.patchPago(id,data).subscribe(r => {
        if (r && r['rows'] == 1 ) {
          if (this.cobrosHoy || this.pagosHoy) {
            this.refreshDataHoy();
          }
          if (this.pagosTodos || this.cobrosTodos) {
            this.refreshDataAll();
          }
          this.functC.showSweetSuccess('OK!','', 1200)
          resolve(true);
        }
        E$13.unsubscribe();
      });
    } catch (err) {
      this.functC.showSweetError('ERROR',`${err}`,3000);
      reject (err);
    }
  })

  /* ---------------------------GENERAR COBRO CLIENTE----------------------------- */
  /* ----------------------------------------------------------------------------- */
  /* ---------------------------ELIMINAR COBRO CLIEN------------------------------ */
  delCobro = async(id:string) =>
  new Promise<boolean>((resolve, reject)=> {
    try {
      const E$14 = this.httpSer.eliminarCobro(id).subscribe((res) => {
        if (res) {
          this.functC.showSweetSuccess('OK!',`Cobro ha sido Eliminado!`,1200);
          resolve(true);
        }
        E$14.unsubscribe();
      })
    } catch (err) {
      this.functC.showSweetError('ERROR',`${err}`,3000);
      reject(err);
    }
  })

  /* ---------------------------ELIMINAR COBRO CLIEN----------------------------- */
  /* ----------------------------------------------------------------------------- */
  /* ---------------------------********************------------------------------ */

  ordenar(data: RespPago[]) {
    data.sort(function (a, b) {
      if (a.fecha_pago < b.fecha_pago) {
        return -1;
      }
      if (a.fecha_pago > b.fecha_pago) {
        return 1;
      }
      return 0;
    });
  }
  ordenar2(data: RespPago[]) {
    data.sort(function (a, b) {
      if (a.fecha_pago < b.fecha_pago) {
        return 1;
      }
      if (a.fecha_pago > b.fecha_pago) {
        return -1;
      }
      return 0;
    });
  }

  /* ---------------------------********************------------------------------ */
  /* ----------------------------------------------------------------------------- */





}
