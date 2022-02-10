import { EventEmitter, Injectable } from '@angular/core';
import { AgentModel, ErrorHttp, LlamadasResp } from '../models/otros.model';
import { RespUser } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import { Subscription } from 'rxjs';

export interface CrearAgente {
  user: string,
  nombre: string,
  apellido: string,
  departamento: string,
  ext: string,
  nivel: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})

export class AgentesService {

  /**
  * Emite los agente sin filtrar
  */
  agentes$ = new EventEmitter<RespUser[] | null>();
  /**
  * Emite da
  */
  agentesCall$ = new EventEmitter<AgentModel[] | null>();

  agentes: RespUser[];
  usuariosList: AgentModel[];
  bloq: boolean = false;

  E$ : Subscription[] = [];

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService) { }

  /**
   * Get para todos los agentes "uso en supervisor"
   * @returns la lista de agentes
   */
  callAgentes = async () =>
    new Promise< RespUser[]>((resolve, reject) => {
      try {
        if (this.agentes) {
          this.agentes$.emit(this.agentes);
          resolve(this.agentes)
        } else {
          this.agentes = [];
          const E$1 = this.httpSer.getUsers().subscribe(
            resp => {
              for (const key in resp) {
                const el = resp[key];
                this.agentes.push(el);
              }
              this.agentes$.emit(this.agentes);
              resolve(this.agentes);
            },(err: ErrorHttp)=> {
              if (err.status == 401) {
                let txt = 'Revisa la Sesión, puede haber vencido';
                this.funcSer.showToast(txt,'Acceso Denegado', 3000, 0);
              }
          })
          this.E$.push(E$1);
        }
      } catch (error) {
        reject(error)
      }
    })

  destruirObserversUsers(){
    try {
      this.E$.forEach( e => e.unsubscribe() );
      this.funcSer.log('Se ha destruido los Observer: Agent', this.E$ )
    } catch (err) {}
  }
  /**
   * actualiza todas las listas de agentes
   */
  refresAgentes(){
    this.agentes = [];
    const E$2 = this.httpSer.getUsers().subscribe(
      resp => {
        for (const key in resp) {
          const el = resp[key];
          this.agentes.push(el);
        }
        this.agentes$.emit(this.agentes);
      },(err: ErrorHttp)=> {
        if (err.status == 401) {
          this.funcSer.showSweetError('Error!','Sesión Vencida', 1500);
        }
      }
    )
    this.E$.push(E$2);
  }
  /**
   * Crea un nuevo agente y actualiza la lista
   * @param data data del agente a crear
   */
  nuevoAgente(data: CrearAgente) {
    let ext_random = Math.random() * (9999 - 1000) + 1000;
    data.ext = data.ext? data.ext: String(ext_random);
    if (data.nombre && data.apellido) {
      const E$3 = this.httpSer.postUser(data).subscribe(r => {
        this.callAgentes();
        this.funcSer.showSweetSuccess('Guardado','',1200);
      },(err: ErrorHttp)=> {
        if (err.status == 401) {
          this.funcSer.showSweetError('Error!','Sesión Vencida', 1500);
        } else {
          this.funcSer.showSweetError('ERROR',`${err.error.Error}`,1500);
        }
      });
      this.E$.push(E$3);
    } else {
      this.funcSer.showSweetWarning('ERROR','Nombre y apellido es OBLIGATORIO',1500);
    }
  }
  /**
   * Comparte el patron Observer + agentesCall$.emit() +
   * @returns Todos los agentes q estan conectados
   */
  getUsersPhone = async () =>
    new Promise< AgentModel[] >((resolve, reject) => {
      try {
        if (!this.bloq) {
          this.bloq = true;
          const E$4 = this.httpSer.getUserPhones().subscribe(
            (res: AgentModel[]) => {
              this.usuariosList = [];
              for (const key in res) {
                const e = res[key];
                if (e.status != 'UNKNOWN') {
                  // LISTA NEGRA DRAKO, RAFAEL, PEDRO
                  if (!e.ext.includes('332') && !e.ext.includes('321') && !e.ext.includes('345')) {
                    this.usuariosList.push(e);
                  }
                }
              }
              E$4.unsubscribe();
              this.bloq = false;
              this.agentesCall$.emit(this.usuariosList)
              resolve( this.usuariosList )
            }, err => {
              this.bloq = false;
            }
          );
          this.E$.push(E$4);
        }
      } catch (error) {
        reject(error)
      }
  })

////////////////////////////////// FUNCIONES COMPLEMENTARIAS //////////////////////////////////////////////

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

  /**
  * Inyecta el nombre de agente asignado basandose en la ext del agente q este en la DB
  * @param respC data a la q se le quiera intectar el agente
  * @param agentes data de agentes[]
  * @returns
  */
  inyectarAgenteExt(respC: LlamadasResp[], agentes: RespUser[] ): any[] {
    let dataResp = [];
    for (const key in respC) {
      const el = respC[key];
      for (const key in agentes) {
        const elAg = agentes[key];
        if (el.origen.length < 5 && el.origen == elAg.ext) {
          el.asignado = `${elAg.nombre} ${elAg.apellido}`;
        }
        if (el.destino.length < 5 && el.destino == elAg.ext) {
          el.asignado2 = `${elAg.nombre} ${elAg.apellido}`;
        }
      }
      dataResp.push(el);
    } return dataResp;
  }

  /***
   * filtra lo agente aptos para llamar y ser asignados
   */
  filtrarAgentesconExt(agents: RespUser[]):RespUser[] {
    let x:RespUser[] = [];
    for (const k in agents) {
      const el = agents[k];
      if (el.ext && el.ext.length == 3 ) {
        // LISTA NEGRA DRAKO, RAFAEL, PEDRO
        if (!el.ext.includes('332') && !el.ext.includes('321') && !el.ext.includes('345')) {
          if (!el.ext.includes('555') && !el.ext.includes('556')){
            x.push(el);
          }
        }
      }
    }
    return x;
  }

}

