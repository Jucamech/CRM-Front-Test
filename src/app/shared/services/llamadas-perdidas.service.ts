import { EventEmitter, Injectable } from '@angular/core';
import { ErrorHttp, FechasLlamadas, LlamadasResp } from '../models/otros.model';
import { RespUser } from '../models/usuario.model';
import { AgentesService } from './agentes.service';
import { AuthService } from './auth.service';
import { ClientesService } from './clientes.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlamadasPerdidasService {
  llamadasAyer: LlamadasResp[];
  llamadas: LlamadasResp[];

  /**
   * Emite todas las llamadas de hoy
   */
  llamadasCDR$ = new EventEmitter<LlamadasResp[] | null>();
  /**
   * Emite todas las llamadas de hoy con cliente inyectado
   */
  llamadasInyectCliCDR$ = new EventEmitter<LlamadasResp[] | null>();
  /**
   * Emite todas las llamadas salientes
   */
  llamadasSalCDR$ = new EventEmitter<LlamadasResp[] | null>();
  /**
   * Emite todas las llamadas entrantes
   */
  llamadasEntCDR$ = new EventEmitter<LlamadasResp[] | null>();
  E$: Subscription[] = [];

  constructor(private httpSer: AuthService,
              private agenteSer: AgentesService,
              private cliSer: ClientesService,
              private functC: FuncionesComunesService) { }

  destructorObservers(){
    try {
      this.E$.forEach( e =>e.unsubscribe() );
    } catch (error) {}
  }

  getPerdidasHoy(){
    const hoy: FechasLlamadas = {
      inicio: this.functC.getHoy().slice(0, 10),
      fin: this.functC.getTomorrow().slice(0, 10)
    };
    let data: LlamadasResp[] = [];
    this.agenteSer.callAgentes().then( agentes => {
      if (this.llamadas) {

        this.llamadasCDR$.emit(this.ordenarLLamadasAsc( this.llamadas ));
      } else {
        const E$1 = this.httpSer.getLlamadasCDR(hoy).subscribe((res: LlamadasResp[]) => {

          data = this.agenteSer.inyectarAgenteExt(res, agentes);
          data = this.ordenarLLamadasAsc(data);
          this.llamadas = data;
          this.llamadasCDR$.emit(data);

        });
        this.E$.push(E$1);
      }
    },(err: ErrorHttp)=> {
      if (err.status == 401) {
        this.functC.showSweetError('Error!','Sesión Vencida', 1500);
      }
    });
  }

  refrescarLlamadas(){
    const hoy: FechasLlamadas = {
      inicio: this.functC.getHoy().slice(0, 10),
      fin: this.functC.getTomorrow().slice(0, 10)
    };
    let data: LlamadasResp[] = [];
    this.agenteSer.callAgentes().then(agentes => {
      const E$2 = this.httpSer.getLlamadasCDR(hoy).subscribe((res: LlamadasResp[]) => {

        data = this.agenteSer.inyectarAgenteExt(res, agentes);
        data = this.ordenarLLamadasAsc(data);
        this.llamadas = data;
        this.llamadasCDR$.emit(this.ordenarLLamadasAsc(res));

      });
      this.E$.push(E$2);
    });
  }


  getLlamadasAyer = async() =>
    new Promise((resolve, reject) => {
      let data: LlamadasResp[];
      let ayer = `${this.functC.getYest()}`;
      let fechas: FechasLlamadas = {
        inicio: ayer,
        fin: this.functC.getHoy().slice(0, 10)
      }
      try {
        if (this.llamadasAyer) {
          resolve(this.llamadasAyer)
        } else {
          this.agenteSer.callAgentes().then( agentes => {

            const E$3 = this.httpSer.getLlamadasCDR(fechas).subscribe((res: LlamadasResp[]) => {
              data = this.agenteSer.inyectarAgenteExt(res, agentes);
              data = this.ordenarLLamadasAsc(res);
              this.llamadasAyer = data;
              resolve(data);
            },(err: ErrorHttp)=> {
              if (err.status == 401) {
                this.functC.showSweetError('Error!','Sesión Vencida', 1500);
              }
              E$3.unsubscribe();
            });
            this.E$.push(E$3);
          });
        }
      } catch (error) {
        reject(error)
      }
    })


  getLlamadasFecha = async(fechas: FechasLlamadas) =>
    new Promise((resolve, reject) => {
      let data: LlamadasResp[];
      try {
        this.agenteSer.callAgentes().then((agentes: RespUser[]) => {

          const E$4 = this.httpSer.getLlamadasCDR(fechas).subscribe((res: LlamadasResp[]) => {
            data = this.agenteSer.inyectarAgenteExt(res, agentes);
            data = this.ordenarLLamadasAsc(res);
            resolve(data);
          });
          this.E$.push(E$4);
        },(err: ErrorHttp)=> {
          if (err.status == 401) {
            this.functC.showSweetError('Error!','Sesión Vencida', 1500);
          }
        });
      } catch (error) {
        reject(error)
      }
    })

/* -------------------------------------------------------------------------------- */
/* -----------------------------llamadas cliente----------------------------------- */
  getLLamadasCliente = async(id: string) =>
  new Promise<LlamadasResp[]>((resolve, reject) => {
    try {
      let data: LlamadasResp[] = [];
      this.agenteSer.callAgentes().then( agentes => {
        const E$x1 = this.httpSer.getHistClientCDR(id).subscribe((res: LlamadasResp[])=> {
          for (const k in res) {
            const el = res[k];
            data.push(el);
          }
          data = this.agenteSer.inyectarAgenteExt(res, agentes);
          data = this.ordenarLLamadasAsc(data);
          resolve(data);
          E$x1.unsubscribe();
        }, err => {
          E$x1.unsubscribe();
          reject(err);
        });
      });
    } catch (err) {
      this.functC.logWarn('Error Catch', err);
      reject(err);
    }
  })


/* -----------------------------llamadas cliente----------------------------------- */
/* -------------------------------------------------------------------------------- */
/* -----------------------------ordenar llamadas----------------------------------- */
  ordenarLLamadasDesc(llamadas: LlamadasResp[] ): LlamadasResp[]{
    llamadas.sort(function (a, b) {
      if (a.fecha < b.fecha) {
        return -1;
      }
      if (a.fecha > b.fecha) {
        return 1;
      }
      return 0;
    });
    return llamadas;
  }

  ordenarLLamadasAsc(llamadas: LlamadasResp[]): LlamadasResp[]{
    llamadas.sort(function (a, b) {
      if (a.fecha < b.fecha) {
        return 1;
      }
      if (a.fecha > b.fecha) {
        return -1;
      }
      return 0;
    });
    return llamadas;
  }
/* ----------------------ordenar llamadas----------------------------------- */
/* ------------------------------------------------------------------------- */
/* ----------------------filtrar llamadas----------------------------------- */

  /**
   * filtra las llamadas separando las entrantes de las salientes
   * @param llamadas las llamas a filtrar
   * @returns [ LLamadas_salientes, LLamadas_entrantes]
   */
  filtrarLLamadas(llamadas: LlamadasResp[]){
    let dataSal: LlamadasResp[] = [];
    let dataEnt: LlamadasResp[] = [];
    if (llamadas) {
      llamadas.forEach(e => e.origen.length < 6? dataSal.push(e): dataEnt.push(e))
    }
    return [ dataSal, dataEnt ]
  }

  /**
   * filtra las llamadas q fueron efectivas de las q no
   * @param llamadas recibe las llamadas salientes
   * @returns [ llamadasEfect, LlamdasNoEFec ]
   */
  filtrarEfectivas(llamadas: LlamadasResp[]){
    let dataEfec: LlamadasResp[] = [];
    let dataFail: LlamadasResp[] = [];
    for (const e of llamadas) {
      if (e.estado == 'NO ANSWER') {
        dataFail.push(e)
      } else {
        if (e.estado == 'ANSWERED' && Number(e.duracion) > 90 ) {
          dataEfec.push(e);
        } else {
          dataFail.push(e)
        }
      }
    }
    return [ dataEfec, dataFail ]
  }

  filtrarDescocidos(llamadas: LlamadasResp[]){
    let dataEfec: LlamadasResp[] = [];
    let dataFail: LlamadasResp[] = [];
    for (const e of llamadas) {
      if (e.estado == 'NO ANSWER') {
        dataFail.push(e)
      } else {
        if (e.estado == 'ANSWERED' && Number(e.duracion) > 90 ) {
          dataEfec.push(e);
        } else {
          dataFail.push(e)
        }
      }
    }
    return [ dataEfec, dataFail ]
  }

  /**
   * filtra las llamadas entrantes sacando las 800, 914 y 1001
   * @param llamadas llamadas entrantes ya filtradas como tal
   * @returns [ data800, data914, data101 ]
   */
  filtrar800(llamadas: LlamadasResp[]){
    let data800: LlamadasResp[] = [];
    let data914: LlamadasResp[] = [];
    let data101: LlamadasResp[] = [];
    llamadas.forEach(e => {
      if (e.destino == '8000') {
        data800.push(e);
      }
      if (e.destino == '9140') {
        data914.push(e);
      }
      if (e.destino == '90014') {
        data914.push(e);
      }
      if (e.destino == '1001') {
        data101.push(e)
      }
    });
    return [ data800, data914, data101 ];
  }

  /**
   * filtra las llamadas entrantes considerando perdidas por debajo de 90 segundos
   * @param llamadas las llamadas entrantes ya filtradas
   * @returns [ llamadasPerd, llamadasCont ]
   */
  filtrarPerdidas(llamadas: LlamadasResp[]): LlamadasResp[][] {
    let dataPerd: LlamadasResp[] = [];
    let dataCont: LlamadasResp[] = [];
    llamadas.forEach(e => {
      if (e.estado == 'NO ANSWER') {
        dataPerd.push(e);
      }
      if (Number(e.duracion) < 80) {
        dataPerd.push(e);
      }
      if (Number(e.duracion) > 30 && e.destino.length == 3 ) {
          dataCont.push(e);
      }
      if (e.estado == 'ANSWERED' && e.destino.length == 3 && e.tipo == 'Dial') {
        dataCont.push(e);
      }
    })

    return [dataPerd, dataCont];
  }

  /**
   * filtra los llamadas sin registro como cliente
   * @param llamadas
   */
  filtrarVirg(llamadas: LlamadasResp[]): LlamadasResp[] {
    let dataVir: LlamadasResp[] = [];
    llamadas.forEach(e => {
      if (e.nombres.toLocaleLowerCase().includes('llamada')) {
        dataVir.push(e);
      } else if (!e.nombres) {
        dataVir.push(e);
      }
    })
    return dataVir;
  }


  /**
   * selecciona las llamadas de un agente buscando por su ext
   * @param llamadas llamadas entrante y saliente
   * @param ext extension de agente
   * @returns
   */
  filtarAgente(llamadas: LlamadasResp[], ext: string){
    let data: LlamadasResp[] = [];
    llamadas.forEach(e => {
      if ( e.destino === ext ) {
        data.push(e);
      }
      if ( e.origen == ext ) {
        data.push(e);
      }
    });
    return data
  }

    /**
   *
   * @param call
   * @returns  [ nn, des, clnt ]
   */
     seuFiltroDesc(call: LlamadasResp[]){
      let llamadasF:LlamadasResp[][] = [];
      const llamadas = call;
      let nn:LlamadasResp[] = [];
      let des:LlamadasResp[] = [];
      let clnt:LlamadasResp[] = [];
      for (const call of llamadas){
        if ( call.id ) {
          if (call.nombres){clnt.push(call)}
          else { nn.push(call)};
        }
      }
      llamadasF = [ nn, des, clnt ];

      return llamadasF? llamadasF: [];
    }

/* ----------------------filtrar llamadas----------------------------------- */



}
