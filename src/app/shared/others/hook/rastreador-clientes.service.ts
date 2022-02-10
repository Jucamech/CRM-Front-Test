import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClienteModelGen, RespPago } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { FuncionesComunesService } from '../../services/funciones-comunes.service';
import { PagosCobrosService } from '../../services/pagos-cobros.service';

export interface FullDataCobro {
  cobro: RespPago,
  pagos: RespPago[],
  errorCobros: boolean,
  errorPagos: boolean,
  fatalError: any,
}
export interface DataAnalizarInterf2 {
  pagosTotal: number,
  fechaInicio: string,
  pagosInsc: number,
  pagosMen: number,
  ultimo_Pago: string,
  proximo_Pago: string,
  fecha_sac: string;
  alDia:boolean;
}
export interface SinPagos {
  id: string;
  name: string;
  fecha_ini: string;
}

@Injectable({
  providedIn: 'root'
})
export class RastreadorClientesService {
  E$: Subscription[] = [];
  cobros$ = new EventEmitter<RespPago[]>();
  FullCobros$ = new EventEmitter<FullDataCobro[]>();
  ClientesEmiter$ = new EventEmitter<ClienteModelGen[]>();
  Clientes: ClienteModelGen[];
  fullData: FullDataCobro[] = [];
  cobros: RespPago[] = [];
  AllPagos: RespPago[][] = [];
  DataAnalizar: RespPago[][];
  clientesSinPagos: SinPagos[] = [];

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService,
              private CobrosSer: PagosCobrosService) { }

  destruirObserverYdata(){
    this.Clientes = [];
    this.fullData = [];
    this.cobros = [];
    this.AllPagos = [];
    this.DataAnalizar = [];
    this.clientesSinPagos = [];
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (err) {}
  }

  getClientes(){
    let listaCli: ClienteModelGen[] = [];
    this.fullData = [];
    const E$1 = this.httpSer.getClientes().subscribe(
      (res : ClienteModelGen[]) => {
        for (const k in res) {
          const el = res[k];
          if  ( el.status == 'Client' || el.status == '1' || el.status == '9'  ) {//Client
            let f = el.fecha_inicio ? el.fecha_inicio : '0000-00-00';
            this.getCobroCliente(el.id, `${el.nombres} ${el.apellidos}`, f );


           /*  const XX = this.httpSer.getCliente(el.id).subscribe((res) => {
              let naci = res['nacimiento']
              if ( naci ) {

                console.log(res['nacimiento'], 'id', res['id']);
              }
              XX.unsubscribe();
            }, err => {
              XX.unsubscribe();
            }) */


          }
        }
        this.Clientes = listaCli;
        console.clear();
      });
    this.E$.push(E$1);
  }

  async getCobroCliente(id:string, nombre:string, fecha_ini: string ){
    await this.getFullCobroCliente(id, nombre, fecha_ini).then( res  =>  {
      if (res) {
        res.fechaInincio = fecha_ini;
        res.nombres = nombre ? nombre : 'No name!!!!';
        this.cobros.push(res);
        this.emitCobros();
      }
    });
  }

  setDataAn(): RespPago[][]{
    return this.DataAnalizar;
  }

  async analizarCobros(){
    for (const k in this.DataAnalizar) {
      const data = this.DataAnalizar[k];
    }
  }

  /**
  * FUNCION PRINCIPAL DE RASTREO
  */
  getFullCobroCliente = async (id: string, name: string, fecha_ini: string) => {
    return new Promise<RespPago>(( resolve , reject) => {
      try {
        let cobros: RespPago[] = [];
        let pagos: RespPago[] = [];
        let all: RespPago[] = [];
        this.DataAnalizar = [];
        const E$2 = this.httpSer.getPago(id).subscribe((res: RespPago[]) => {
          if (res) {
            for (const clave in res) {
              const el = res[clave];
              el.nombres = name;
              all.push(el);
              if (el.status == 0) {
                cobros.push(el);
              } else if (el.status == 1) {
                pagos.push(el)
              }
              this.CobrosSer.ordenar(cobros);
            }
            this.CobrosSer.ordenar(pagos);
            this.AllPagos.push(pagos);
            this.CobrosSer.ordenar2(all);
            this.DataAnalizar.push(all);
            resolve( cobros[0] );
          }
        }, err => {
          //this.funcSer.logWarn('ERROR HTTP', err);
          let p: SinPagos = { id, name, fecha_ini };
          this.clientesSinPagos.push(p);
          console.clear();
          reject(err);
        })
        this.E$.push(E$2);
      } catch (err) {
        this.funcSer.logWarn('ERROR', err);
        reject(err);
      }
    });
  }

  emitCobros(){
    this.cobros$.emit(this.cobros);
  }
  emitFullData(){
    this.FullCobros$.emit(this.fullData);
  }

}

