import { EventEmitter, Injectable } from '@angular/core';
import { RespCitas, RespCitasM, RespUser } from '../models/usuario.model';
import { AgentesService } from './agentes.service';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import { AgentModel, ErrorHttp } from '../models/otros.model';
import { CitasStackService } from './citas-stack.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  citaEnEspera: RespCitas;

  /**
   * Emite todas las citas existentes sin filtrar las de hoy
   */
  Citas$ = new EventEmitter< RespCitas[] | RespCitasM[] | null>();
  /**
   * Emite todas las citas existentes sin filtrar las de hoy
   */
  CitasNoAtendidas$ = new EventEmitter<RespCitas[] | null>();

  /**
   * Emite la cita al modal llamadas para ser atendida
   */
  Cita$ = new EventEmitter<RespCitas | null>();

  dataCita: Array<RespCitas>;
  bloqH: boolean;
  bloq: boolean;
  citasHoy: RespCitas[];
  citasFiltro2: RespCitas[] = [];
  agentes: AgentModel[];
  E$ : Subscription[] = [];

  constructor(private httpSer: AuthService,
              private functC: FuncionesComunesService,
              private Stack: CitasStackService,
              private AgentSer: AgentesService) { }

  destructorObserver(){
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (err) { }
  }


  callCitas = async () =>
    new Promise((resolve, reject) => {
      let agentes: RespUser[] = [];
      try {
        this.AgentSer.callAgentes()
          .then((ResAgent: RespUser[]) => {
            agentes = ResAgent;
            return ('ok')
          })
          .then(() => {
            let dataResp: Array<RespCitas> = [];
            const E$1 = this.httpSer.getCitas().subscribe(
              (resp: RespCitas[]) => {
                this.filtro2(resp);
                dataResp = this.inyectarAgente(resp, agentes, 'id_asignado');
                dataResp = this.filtro(dataResp);
                this.functC.ordenar(dataResp);
                dataResp = this.functC.eliminarDuplicados(dataResp);
                this.Citas$.emit(dataResp);
                this.E$.push(E$1);
                resolve(dataResp);
              },(err: ErrorHttp)=> {
                if (err.status == 401) {
                  let txt = 'Revisa la Sesión, puede haber vencido';
                  this.functC.showToast(txt,'Acceso Denegado', 2000, 0);
                }
                E$1.unsubscribe();
              }
            );
          });
      } catch (error) {
        reject(error)
      }
    })


  callCitasHoy = async ( ) =>
  new Promise(( resolve, reject ) => {
    try {
      this.agentes = this.AgentSer.usuariosList
      if (!this.bloqH) {
        this.bloqH = true;
        let dates = {
          fecha_inicio: `${this.functC.getHoy()}`,
          fecha_final: `${this.functC.getHoy().slice(0,10)} 23:59:59`
        }
        const E$2 = this.httpSer.fechasfetch(dates).subscribe((res: RespCitasM[]) => {
          this.filtro2(res);
          this.bloqH = false;
          this.E$.push(E$2);
          resolve(res);
        },err => {
          E$2.unsubscribe();
          reject(err);
        })
      }
    } catch (err) {
      this.functC.logWarn('ErrorCatch', err)
      reject(err)
    }
  })

  callCitasHoySinF = async ( ) =>
  new Promise(( resolve, reject ) => {
    try {
      const token = localStorage.getItem('token');
      this.agentes = this.AgentSer.usuariosList
        this.bloqH = true;
        let dates = {
          fecha_inicio: `${this.functC.getYest()} 00:00:00`,
          fecha_final: `${this.functC.getHoy().slice(0,10)} 23:59:59`
        }
        const E$3 = this.httpSer.fechasfetch(dates).subscribe((res: RespCitasM[] | RespCitas[]) => {
          let data = this.filtrarCitasEfectivas(res, this.functC.getYest(), this.functC.getHoy().slice(0,10) );
          this.functC.ordenar(data);
          this.Citas$.emit(data);
          this.E$.push(E$3);
          resolve(data);
        },err => {
          E$3.unsubscribe();
          reject(err);
        })

    } catch (err) {
      this.functC.logWarn('ErrorCatch', err)
      reject(err)
    }
  })

  /**
   * Llama las citas del cliente
   */
  callCitasCli = async (id: string) =>
    new Promise((resolve, reject) => {
      let agentes: RespUser[] = [];
      try {
        this.AgentSer.callAgentes()
          .then((ResAgent: RespUser[]) => {
            agentes = ResAgent;
            return ('ok')
          }).then(() => {
            let dataResp: Array<RespCitas>;
            const E$5 = this.httpSer.getCitasUser(id).subscribe(
              (resp: RespCitas[]) => {
                dataResp = this.inyectarAgente(resp, agentes, 'id_asignado');
                this.E$.push(E$5);
                resolve(dataResp);
            },(err: ErrorHttp)=> {
              E$5.unsubscribe();
              if (err.status == 401) {
                let txt = 'Revisa la Sesión, puede haber vencido';
                this.functC.showToast(txt,'Acceso Denegado', 2000, 0);
              }
            });
          });
      } catch (error) {
        this.functC.logWarn('ErrorCatch', error)
        reject(error)
      }
    })

  /**
   * Le emite a modal de llamadas la cita q debe estar siendo atendida
   * @param cita
   */
  emitirCitaAtendida(cita: RespCitas){
    if (cita && cita.id) {
      let hayCita = localStorage.getItem('2104a1bd');
      if (!hayCita) {
        localStorage.setItem('2104a1bd', JSON.stringify(cita) ); //MANDA AL LOCALSTORAGE LA CITA
        this.functC.logWarn('se manda desde aqui la cita', []);
      }
      this.Cita$.emit(cita);
    } else {
      this.functC.showSweetError('ERROR!','Fallo en cita emitida', 1500);
    }
  }

  /**
   * va a quedar depreca
   * @returns
   */
  callCitasSuperV = async () =>
    new Promise((resolve, reject) => {
      let agentes: RespUser[] = [];
    try {
      this.AgentSer.callAgentes()
        .then((ResAgent: RespUser[]) => {
          agentes = ResAgent;
          return ('ok')
        }).then(() => {
          let dataResp: Array<RespCitas>;
          const E$6 = this.httpSer.getCitas().subscribe(
            (resp: RespCitas[]) => {
              dataResp = this.inyectarAgente(resp, agentes, 'id_asignado');
              this.functC.ordenar(dataResp);
              this.E$.push(E$6);
              resolve(dataResp);
            },(err: ErrorHttp)=> {
              E$6.unsubscribe();
              if (err.status == 401) {
                let txt = 'Revisa la Sesión, puede haber vencido';
                this.functC.showToast(txt,'Acceso Denegado', 3000, 0);
              }
            }
          )
        });
      } catch (error) {
        this.functC.logWarn('ErrorCatch', error);
        reject(error);
      }
  })

  editarCita = async (id:string ,data:Partial<RespCitasM>) =>
  new Promise((resolve, reject) => {
    try {
      const E$7 = this.httpSer.putCita(id, data ).subscribe(res =>{
        if ( res ) {
          this.functC.log('Se ha editado la cita', res );
          E$7.unsubscribe();
          resolve(res);
        }
      },err => {
        E$7.unsubscribe();
        this.functC.log('Error Cita Edit', err);
        reject(err);
      });
    } catch (err) {
      this.functC.log('Error Cita Edit', err);
      reject(err);
    }
  })

  /**
   * @param id del cliente
   * @param cita data de la cita
   */
  crearCita( id:string, cita: RespCitasM ) {
    if (!this.bloq) {
      const E$8 = this.httpSer.postCita(id, cita).subscribe(
      res => {
        if (res['id']) {
          this.functC.showSweetSuccess('Cita Guardada','',1200);
        }
        E$8.unsubscribe();
        this.bloq = false;
      },(err: ErrorHttp)=> {
        E$8.unsubscribe();
        if (err.status == 401) {
          this.functC.showSweetError('Error!','Sesión Vencida', 1500);
        } else {
          this.functC.logWarn('Error Cita', err)
        }
        this.functC.logWarn('Error', err);
        this.bloq = false;
      });
    } else {
      setTimeout(() => {
        this.bloq = false;
      }, 1600);
      this.functC.showSweetWarning('!','Esperando Respusta de Base Datos', 1500 );
    }

  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  filtrarCitasEfectivas(citas: RespCitasM[] | RespCitas[], ayer: string, hoy:string): RespCitasM[] {
    let newData: RespCitasM[] = [];
    if (citas) {
      for (const k in citas) {
        const c = citas[k];
        let x = c.id_asignado;
        if (c.fechahora.slice(0,10) == hoy) {
          newData.push(c);
        } else if (c.fechahora.slice(0,10) == ayer && c.campos_adicionales.length < 7) {
          if (c.estado != '12') {
            let h = Math.floor(Math.random() * (15 - 12) ) + 12;
            let m = Math.floor(Math.random() * (59 - 1) ) + 1;
            let mM = m < 10 ? `0${m}` : `${m}`;
            let data = {
              notas: `ID_agente: ${x}-Quedaron Pendientes ${7 - c.campos_adicionales.length} llamadas Pendientes de ayer`,
              fechahora: `${hoy} ${h}:${mM}:00`,
              campos_adicionales: [],
              id_asignado: '0'
            }
            this.editarCita(c.id, data);
            newData.push(c);
          }
        }
      }
    }
    return newData;
  }

  /**
   * Saca de la lista las citas cuyas horas ya transcurrieron
   * @param array las citas
   * @returns
   */
  filtro(array: Array<RespCitas>) {
    let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(new Date())}`;

    let hoyFin = `${ahora.slice(0, 10)} 23:59:59`;
    let citasHoy = [];
    array.forEach(el => {
      if (el.fechahora > ahora && el.fechahora < hoyFin) {
        citasHoy.push(el);
      }
      if (el.estado == '17') {
        citasHoy.push(el);
      }
      if (el.estado == '19' && el.fecha_creacion > ahora && el.fechahora < hoyFin) {

        citasHoy.push(el);
      }
      if (el.estado == '21' && el.fecha_creacion <= ahora) {
        citasHoy.push(el);
      }
    });
    return citasHoy;
  }
  /**
   * Separa todas citas en sus respectivas categorias
   * @param arr
   */
  filtro2(arr: RespCitasM[] ){
    let arrInj = arr;
    let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(new Date())}`;
    let hoyFin = `${ahora.slice(0, 10)} 23:59:59`;
    let hoyInicio = `${ahora.slice(0, 10)} 00:00:01`;

    let citasStackV = [];
    let citasStackS = [];
    let citasStackC = [];

    let citasStackAsV = [];
    let citasStackAsS = [];
    let citasStackAsC = [];

    let citasStackAtV = [];
    let citasStackAtS = [];
    let citasStackAtC = [];

    let agentStackV = [];
    let agentStackS = [];
    let agentStackC = [];

    for (const k in arrInj) {
      const el = arrInj[k];
      if (el.fechahora > hoyInicio && el.fechahora < hoyFin) {
        if ( el.estado == '25') {
          citasStackV.push(el);
        } else if (el.estado == '26') {
          citasStackS.push(el);
        } else if (el.estado == '27') {
          citasStackC.push(el);
          /*  */
        } else if (el.estado == '28' ) {
          citasStackAsV.push(el);
          if (!agentStackV.includes(el.id_asignado)) {
            agentStackV.push( el.id_asignado );
          }
        } else if (el.estado == '29') {
          citasStackAsS.push(el);
          if (!agentStackS.includes(el.id_asignado)) {
            agentStackS.push( el.id_asignado );
          }
        } else if (el.estado == '30') {
          citasStackAsC.push(el);
          if (!agentStackC.includes(el.id_asignado)) {
            agentStackC.push(el.id_asignado);
          }
          /*  */
        }  else if (el.estado == '31' ) {
          citasStackAtV.push(el);
        } else if (el.estado == '32') {
          citasStackAtS.push(el);
        } else if (el.estado == '33') {
          citasStackAtC.push(el);
        }
      }
    }

    this.Stack.citasStackV = citasStackV;
    this.Stack.citasStackS = citasStackS;
    this.Stack.citasStackC = citasStackC;

    this.Stack.citasStackAsV = citasStackAsV;
    this.Stack.citasStackAsS = citasStackAsS;
    this.Stack.citasStackAsC = citasStackAsC;

    this.Stack.citasStackAtV = citasStackAtV;
    this.Stack.citasStackAtS = citasStackAtS;
    this.Stack.citasStackAtC = citasStackAtC;

    this.Stack.agentesStackV = agentStackV;
    this.Stack.agentesStackS = agentStackS;
    this.Stack.agentesStackC = agentStackC;

  }

  /**
   * Inyecta el nombre de agente asignado basandose en el id del agente q este en la DB
   * @param respC data a la q se le quiera intectar el agente
   * @param agentes data de agentes[]
   * @param param1 id_asignado | id_agente | id_user | id_creador
   * @returns
   */
    inyectarAgente(respC: any[], agentes: RespUser[], param1 ): any[] {
    let dataResp = [];
    for (const key in respC) {
      const el = respC[key];
      for (const key in agentes) {
        const elAg = agentes[key];
        if (el[param1] == String(elAg.id)) {
          el.asignado = `${elAg.nombre} ${elAg.apellido}`;
        }
      }
      dataResp.push(el);
    } return dataResp;
  }

}


