import { EventEmitter, Injectable } from '@angular/core';
import { Call } from 'src/app/components/llamadas-modal/llamadas-modal.component';
import { Campos_adicionales, ClientModel } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import { ErrorHttp, RespCalling } from '../models/otros.model';
import { Subscription } from 'rxjs';

export interface InfCall {
  ok: boolean;
  message: string;
}
export interface InfCallEnt {
  libre: boolean;
  data?: RespCalling
}

@Injectable({
  providedIn: 'root'
})

export class LlamadasService {
  id_cli:number = 0;
  verModal: boolean = true;
  is_freeEnt: boolean;
  is_freeSal: boolean;
  /**
   * Emite el id del cliente al q se esta llamando
   */
  llamandoID$ = new EventEmitter< number | null>();
  /**
   * Emite todas las llamadas de hoy
   */
  llamando$ = new EventEmitter<Call | null>();

  /**
   * Emite la info llamada saliente
   */
  llamandoData$ = new EventEmitter< InfCall | null>();

  /**
   * Emite el estado llamada entrante
   */
  llamandoData2$ = new EventEmitter< InfCallEnt | null>();

  E$ : Subscription[] = [];

  numEntrante: string;
  didEntrante: string;
  cliente: any;
  toggle: boolean;
  idEntrante: string;
  listClientes: any[];
  copiaListClientes: any[];

  id_saliente: number;
  xc = 0;//contador para simulador
  sonando: boolean = false;
  audio = new Audio('../../assets/alerta/office-phone.mp3');

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService,) { }

  sonarAlerta(){
    if (!this.sonando) {
      this.sonando = true;
      this.audio.load();
      this.audio.loop = true;
      this.audio.play();
    }
  }

  cortarAlerta(){
    this.funcSer.logWarn('Se Ha cortado la llamada', []);
    this.audio.pause();
    this.sonando = false;
  }

  destruirObserversCall(){
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (err) {}
  }

  llamadasCampaña = async (data: Call) =>
  new Promise((resolve, reject) => {
    try {
      const E$1 = this.httpSer.getCall(data).subscribe(res => {
        if (res[0] == "Response: Error") {
          this.llamandoData$.emit({ ok: false, message: 'Originate failed' });
          this.funcSer.showSweetError('ERROR!','Llamada Fallida: Error de Origen', 1500);
          reject(false);
          E$1.unsubscribe();
        } else {
          localStorage.setItem('change', String(data.id_cliente));
          resolve(true);
          E$1.unsubscribe();
        }
      },(err: ErrorHttp) => {
        if (err.status == 401) {
          let txt = 'Revisa la Sesión, puede haber vencido';
          this.funcSer.showToast(txt,'Acceso Denegado', 3000, 0);
        }
        E$1.unsubscribe();
        reject(err);
      })
    } catch (err) {
      reject(err);
    }
  })

  realizarLLamada(data: Call){
    const E$1 = this.httpSer.getCall(data).subscribe(
      (res) => {
        this.id_saliente = Number(data.id_cliente);
        this.llamandoID$.emit(this.id_saliente);
        this.id_cli = this.id_saliente;
        // SETEANDO LA OBLIGACION DE NOTA
        localStorage.setItem('013800ce', `086${this.id_saliente}3026a`);
        if (res[0] == "Response: Error") {
          this.llamandoData$.emit({ ok: false, message: 'Originate failed' });
          this.cerrar();
          this.funcSer.showSweetError('ERROR!','Llamada Fallida: Error de Origen', 2500);
        } else {
          if (false) {

          } else {
            localStorage.setItem('change', String(data.id_cliente));
            this.llamandoID$.emit(Number( data.id_cliente ));
            this.getCliente(data.id_cliente);
          }

        }
        this.E$.push(E$1);
      },(err: ErrorHttp)=> {
        if (err.status == 401) {
          let txt = 'Revisa la Sesión, puede haber vencido';
          this.funcSer.showToast(txt,'Acceso Denegado', 3000, 0);
        }
      }
    );
  }

  /**
   * Cierra el los datos de las llamadas salientes
   */
  cerrar(){
    this.id_saliente = null;
    localStorage.removeItem('change');
    this.httpSer.dataClienteE$.emit(null);
    this.is_freeSal = true;
  }

  getCliente(id: string) {
    const E$2 = this.httpSer.getCliente(id).subscribe((res: ClientModel) => {
      if (res && res.campos_adicionales && res.campos_adicionales.fechas_pagos_inscripcion) {
        this.cliente = res;
        this.httpSer.dataClienteE$.emit(this.cliente);
        this.funcSer.showToast(`${res.id} - ${res.nombres}`, 'LLamando a:', 5000, 2);

      } else {
        let data: Partial<ClientModel> = this.funcSer.creadorDeCamposObligatorios(res);
        let campos: Campos_adicionales = this.funcSer.creadorDeCamposAd(res);
        data.campos_adicionales = campos;
        this.cliente = data,
        this.httpSer.dataClienteE$.emit(this.cliente);
        this.funcSer.showToast(`${data.id} - ${data.nombres}`, 'LLamando a:', 5000, 2);
      }
      E$2.unsubscribe();
    },(err: ErrorHttp)=> {
      if (err.status == 401) {
        E$2.unsubscribe();
        this.funcSer.showSweetError('Error!','Sesión Vencida', 1500);
      }
    });
  }

  getAll() { // trae los cliente filtrando por el agente
    const E$3 = this.httpSer.getClientes().subscribe(
      res => {
        this.listClientes = [];
        this.copiaListClientes = [];
        for (const clave in res) {
          const el = res[clave];
          this.listClientes.push(el);
          this.copiaListClientes.push(el);
        }
        E$3.unsubscribe();
      },(err: ErrorHttp)=> {
        if (err.status == 401) {
          this.funcSer.showSweetError('Error!','Sesión Vencida', 1500);
          E$3.unsubscribe();
        }
      }
    );
  }

  getCallingSer() {
    const E$1: Subscription = this.httpSer.getLlamadas().subscribe(
      (res: RespCalling) => {
        if (res.numero_entrante) {
         /*  //this.sonarAlerta();
          this.llamandoData2$.emit({libre: false, data: res});
          this.httpSer.extLlamada$.emit(res);
          this.numEntrante = res.numero_entrante;
          this.didEntrante = res.did_local;
          // SETEANDO LA OBLIGACION DE NOTA
          if (res.id_cliente) {
            localStorage.setItem('013800ce', `086${res.id_cliente}3026a`);
            this.llamandoID$.emit(Number(res.id_cliente));
            this.idEntrante = res.id_cliente;
            if (res.id_cliente && !this.cliente) {
              this.getCliente(res.id_cliente);
            }
          }
        } else {
          this.llamandoData2$.emit({libre: false}) */
        }
        if (res.estado == 'libre'){

          /* this.cortarAlerta();
          this.is_freeEnt = true;
          this.verModal = true;
          this.idEntrante = null;
          this.llamandoData2$.emit({libre: true, data: null});
          let change = localStorage.getItem('change');
          if ( !this.id_saliente && !change ) {
            this.llamandoID$.emit(null);
            this.is_freeSal = true;
          } else if (this.id_saliente){
            this.is_freeSal = false;
            localStorage.setItem('change', String(this.id_saliente));
            this.llamandoID$.emit(this.id_saliente);
            this.httpSer.extLlamada$.emit(null);
          } else if (change && change.length > 0 ){
            this.is_freeSal = false;
          }
          this.numEntrante = null; */
        }
        E$1.unsubscribe();
      }
    );
    this.E$.push( E$1 );
  }

  getCallingFake(){
    let res: RespCalling = {
      id_cliente: '3',
      numero_entrante: '8965512345',
      did_local: '001'
       //ext: '303',
      //estado: null
    }
    this.xc = this.xc + 1;

    if (this.xc >= 115) {
      res.did_local = null;
      res.ext = null,
      res.id_cliente = null,
      res.estado = 'libre'
      res.numero_entrante = null
    }

    if (this.xc >= 30 && this.xc < 49) {
      res.did_local = '001';
      res.id_cliente = '558',
      delete res.estado
      res.numero_entrante = '8965512345'
    }
    if (this.xc >= 50) {
      res.did_local = null;
      res.ext = null,
      res.id_cliente = null,
      res.estado = 'libre'
      res.numero_entrante = null
    }

    if (res.numero_entrante) {
      this.sonarAlerta();
      this.llamandoData2$.emit({libre: false, data: res})
      this.httpSer.extLlamada$.emit(res);
      this.numEntrante = res.numero_entrante;
      this.didEntrante = res.did_local;
      if (res.id_cliente) {
        this.llamandoID$.emit(Number(res.id_cliente));
        this.idEntrante = res.id_cliente;
        if (res.id_cliente && !this.cliente) {
          this.getCliente(res.id_cliente);
        } else if (this.cliente) {
          this.httpSer.dataClienteE$.emit(this.cliente);
        }
      } else {
        if (!this.listClientes) {
          this.getAll();
        }
      }
    } else {
      this.llamandoData2$.emit({libre: false})
    }
    if (res.estado == 'libre'){
      this.cortarAlerta();
      this.verModal = true;
      this.llamandoData2$.emit({libre: true, data: null});
      if (!this.id_saliente ) {
        this.llamandoID$.emit(null);
        localStorage.removeItem('change');
      } else if (this.id_saliente){
        localStorage.setItem('change', String(this.id_saliente));
        this.llamandoID$.emit(this.id_saliente);
        this.httpSer.extLlamada$.emit(null);
      }
      this.numEntrante = null;
    }
  }


}
