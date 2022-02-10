import { EventEmitter, Injectable } from '@angular/core';
import { AgentModel2, ErrorHttp } from '../models/otros.model';
import { CitaCampAd, RespCitas, RespCitasM } from '../models/usuario.model';
import { AgentesService } from './agentes.service';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import { LlamadasService } from './llamadas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


export interface InfCreated {
  ok: boolean;
  id: number;
}
export interface Token {
  aud: string,
  exp: number
  data: {
    apellido: string,
    departamento: string,
    ext: string,
    id: string,
    nivel: string,
    nombre: string,
    nombre_departamento: string,
  }
}

@Injectable({
  providedIn: 'root'
})

export class CitasStackService {
  /**
   * Emite la info llamada saliente
   */
  EmitCreate$ = new EventEmitter<InfCreated>();

  AgentV: AgentModel2[];
  AgentS: AgentModel2[];
  AgentC: AgentModel2[];

  x : number = 0;
  y : number = 0;
  z : number = 0;

  lastAgentV: string;
  lastAgentS: string;
  lastAgentC: string;

  jwtP: Token;
  citasStack: RespCitas[] = [];

  citasStackV: RespCitas[] = [];
  citasStackS: RespCitas[] = [];
  citasStackC: RespCitas[] = [];

  citasStackAsV: RespCitas[] = [];
  citasStackAsS: RespCitas[] = [];
  citasStackAsC: RespCitas[] = [];

  citasStackAtV: RespCitas[] = [];
  citasStackAtS: RespCitas[] = [];
  citasStackAtC: RespCitas[] = [];
/// AGENTES CON CITAS EN STACK
  agentesStackV: string[];
  agentesStackS: string[];
  agentesStackC: string[];
/// ESTADI DE LAS LLAMADAS DEL AGENTE
  libre: boolean;
  libre2: boolean;
  listaAgentes: AgentModel2[];

  lock: number = 0;
  iAS: number = 0;
  iAV: number = 0;
  iAC: number = 0;
  bloq: boolean = false;

  constructor(private funcSer: FuncionesComunesService,
              private AgentSer: AgentesService,
              private router: Router,
              private CallSer: LlamadasService,
              private httpSer: AuthService) {}

/* ------------------------------------------------------------------------- */
/* --------------------------metodos a supervi------------------------------ */

  generarPermisos(): boolean {
    this.jwtP = this.funcSer.parseJwt( localStorage.getItem('token') );
    if ( Number(this.jwtP.data.nivel) == 3 ) {
      return true;
    } else {
      return false;
    }
  }

  getAgentes() {
    let listaExtV: AgentModel2[] = [];
    let listaExtS: AgentModel2[] = [];
    let listaExtC: AgentModel2[] = [];
    this.AgentSer.getUsersPhone().then((r: AgentModel2[])  => {

      for (const k in r) {
        const el = r[k];
        if ( el.departamento == "Ventas" ) {
          this.lock = 0;
          listaExtV.push(el);
        } else if ( el.departamento == "SAC" ) {
          this.lock = 0;
          listaExtS.push(el);
        } else if ( el.departamento == "Cobro" ) {
          this.lock = 0;
          listaExtC.push(el);
        }
      }
      this.AgentV = listaExtV;
      this.AgentS = listaExtS;
      this.AgentC = listaExtC;

    });
  }

  crearCita(id:string, data:RespCitasM){
    try {
      let ag = this.verificarCualAgente(data);
      data.campos_adicionales = [{
        asigador: localStorage.getItem('id_agente'),
        asigado: String(ag),
        resultado: '',
        hora_asig: `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() )}`,
        nota: 'Cita Auto_1'
      }];
      const E$1 = this.httpSer.postCita(id, data).subscribe( res => {
          if (res['id']) {
            this.EmitCreate$.emit({ ok: true, id: res['id'] });
            this.funcSer.showSweetSuccess('Cita Guardada','',1200);
          }
          E$1.unsubscribe();
          this.EmitCreate$.emit({ ok: false, id: null });
        },(err: ErrorHttp)=> {
          this.EmitCreate$.emit(null);
          if (err.status == 401) {
            this.funcSer.showSweetError('Error!','Sesión Vencida',1500);
          } else {
            this.funcSer.logWarn('Error', err)
          }
          E$1.unsubscribe();
        });

    } catch (error) {
      this.funcSer.logWarn('Error Desconocido', error)
    }
  }
  /**
   * Asignación automatica
   */
  asignarCitas = async (agt: string, data:RespCitasM[]) => {
    if (!this.AgentV || !this.AgentS  && this.lock < 10 ) {
      this.lock += 1;
      this.getAgentes();
    }else {
      let z,x,y;

      if (agt == 'Ventas') {

        x = this.AgentV.length;
        y = data.length;
        z = this.citasStackAsV.length;
        let j = 0;

        while ( y > 0 && x > 0 ){

          /* limita las capacidad de editar citas al numero de agentes */
          if (this.x  >= x) { this.x = 0; }

          x = x - 1;
          y = y - 1;
          let mA = data[y];

          /* Pregunta si el agengte esta ocupado */
          let i = this.agentesStackV.indexOf(this.AgentV[j].id_user);
          j = j + 1;
          let libre = this.buscarLibreV();

          if (libre) {
            this.x = this.x + 1 ;

            if (mA.id_asignado === '0') {
              this.funcSer.log('data enviada ', mA);

              mA.id_asignado = libre[0];
              mA = this.limpiarDataCita( mA );
              mA.estado = '28';

              if (this.AgentV.length > z ) {

                this.lastAgentV = libre[0];
                await this.citaStackAgente(mA.id, mA);
                break

              }
            }
          } else {
            this.funcSer.log('se acabaron los agentes', i);
          }
        }
      }
      if (agt == 'SAC') {

        x = this.AgentS.length;
        y = data.length;
        z = this.citasStackAsS.length;
        let j = 0;

        while ( y > 0 && x > 0 ){

          /* limita las capacidad de editar citas al numero de agentes */
          if (this.y >= x) { this.y = 0; }

          x = x - 1;
          y = y - 1;
          let mA = data[y];

          /* Pregunta si el agengte esta ocupado */
          let i = this.agentesStackS.indexOf(this.AgentS[j].id_user);
          j = j + 1;
          let libre = this.buscarLibreS();

          if (libre) {
            this.y = this.y + 1;

            if ( mA.id_asignado === '0' ){
              this.funcSer.log('data enviada ', mA);

              mA.id_asignado = libre[0];
              mA = this.limpiarDataCita( mA );
              mA.estado = '29';

              if (this.AgentS.length > z ){

                this.lastAgentS = libre[0];
                await this.citaStackAgente(mA.id, mA);
                break;

              }
            }
          } else {
            this.funcSer.log('se acabaron los agentes', i);
          }
        }
      }
      if (agt == 'Cobros') {

        x = this.AgentC.length;
        y = data.length;
        z = this.citasStackAsC.length;
        let j = 0;

        while ( y > 0 && x > 0 ){
          /* limita las capacidad de editar citas al numero de agentes */
          if (this.z  >= x) { this.z = 0; }

          x = x - 1;
          y = y - 1;
          let mA = data[y];

          /* Pregunta si el agengte esta ocupado */
          let i = this.agentesStackC.indexOf(this.AgentC[j].id_user);
          j = j + 1;
          let libre = this.buscarLibreC();

          if (libre) {
            this.z ++;

            if (mA.id_asignado == '0') {

              mA.id_asignado = libre[0];
              mA = this.limpiarDataCita( mA );
              mA.estado = '30';

              if (this.AgentC.length > z ) {

                this.lastAgentC = libre[0];
                await this.citaStackAgente(mA.id, mA);
                break;

              }
            }
          } else {
            this.funcSer.log('se acabaron los agentes', i);
          }
        }
      }
    }
  }
  /**
   * @returns El agente de Ventas libre
   */
  buscarLibreV(){
    let x = []
    this.funcSer.log('Stack agentes ocupados', this.agentesStackV )
    this.AgentV.forEach( r => {
      this.funcSer.log('Stack agentes ', r.id_user )
      if (!this.agentesStackV.includes(r.id_user)) {
        x.push(r.id_user)
      }
    })
    return x[0] ? x :  null;
  }
  /**
   * @returns El agente de SAC libre
   */
  buscarLibreS(){
    let x = []
    this.funcSer.log('Stack agentes ocupados', this.agentesStackS )
    this.AgentS.forEach( r => {
      this.funcSer.log('Stack agentes ', r.id_user )
      if (!this.agentesStackS.includes(r.id_user)) {
        x.push(r.id_user)
      }
    })
    return x[0] ? x :  null;
  }
  /**
   * @returns El agente de Cobro libre
   */
  buscarLibreC(){
    let x = []
    this.funcSer.log('Stack agentes ocupados', this.agentesStackC )
    this.AgentC.forEach( r => {
      this.funcSer.log('Stack agentes ', r.id_user )
      if (!this.agentesStackC.includes(r.id_user)) {
        x.push(r.id_user)
      }
    })
    return x[0] ? x :  null;
  }

  /**
   * Editor de citas generar con respuesta log solo en Dev
   * @param id_cli
   * @param data cita
   * @returns boolean;
   */
  async citaStackAgente(id_cli:string, data:RespCitasM){
    return new Promise(resolve => {
      const E$2 = this.httpSer.putCita(id_cli, data).subscribe(r => {
        if (r['rows'] == '1' ) {
          this.funcSer.log('se ha editado la cita', id_cli)
          resolve(true);
        } else {
          this.funcSer.logWarn('Error',data)
          resolve(true);
        }
        E$2.unsubscribe();
      })
    });
  }

  /**
   * Limpia y agrega la data del historial
   * @param data
   * @returns data limpai sin campos no admitidos y add el historial
   */
  limpiarDataCita( data: RespCitasM ): RespCitasM{
    delete data.nombres;
    delete data.apellidos;
    delete data.fecha_creacion;
    delete data.id_user;
    return data;
  }
/* --------------------------metodos a supervi------------------------------ */
/* ------------------------------------------------------------------------- */
/* --------------------------metodos a usuario------------------------------ */
  enviarAlSiguienteAgenteV(id: string){
    const isIndice = (el:AgentModel2) => el.id_user == id;
    const i = this.AgentV.findIndex(isIndice);
    return i;
  }
  enviarAlSiguienteAgenteS(id: string){
    const isIndice = (el:AgentModel2) => el.id_user == id;
    const i = this.AgentS.findIndex(isIndice);
    return i;
  }
  enviarAlSiguienteAgenteC(id: string){
    const isIndice = (el:AgentModel2) => el.id_user == id;
    const i = this.AgentC.findIndex(isIndice);
    return i;
  }

  traerDisponibilidad() {
    this.libre = this.CallSer.is_freeEnt;
    this.libre2 = this.CallSer.is_freeSal;
  }

  aceptandoCitas(data:RespCitasM[])  {
    this.getAgentes();
    if ( this.libre && this.libre2 ) {
      data.forEach(cita => {

        let myID = localStorage.getItem('id_agente');

        if ( cita && cita.id_asignado == myID ) {

          if (cita.estado == '28' || cita.estado == '29' || cita.estado == '30') {
            if (!this.bloq) {

              Swal.fire({
                title: 'Cita Stock',
                text: `Asignada Automaticamente`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Aceptar?',
                cancelButtonText: 'Rechazar!',
              }).then((resultado) => {
                if (resultado.value) {

                  if (cita.estado == '28') { cita.estado = '31' }
                  else if (cita.estado == '29') { cita.estado = '32' }
                  else if (cita.estado == '30') { cita.estado = '33' };
                  localStorage.setItem('2104a1bd', JSON.stringify(cita) );
                  cita = this.limpiarDataCita(cita);
                  cita = this.editarhistorial(cita);
                  this.citaStackAgente(cita.id, cita);
                  const url = this.router.createUrlTree(['/vercliente', cita.id_cliente]);
                  window.open(url.toString(), '_blank');
                } else {
                  this.bloq = true;
                  Swal.fire({
                    title: 'Motivo',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                  }).then((resultado) => {
                    let ind:number;
                    let sig: string;
                    this.bloq = false;
                    if (cita.estado == '28') {
                      ind = this.enviarAlSiguienteAgenteV(myID);
                      sig = this.AgentV[ind + 1] ? this.AgentV[ind + 1].id_user : null;
                      if (sig) { cita.id_asignado = sig; }
                      else{
                        cita.estado = '25';
                        cita.asignado = '0'
                      }
                    }
                    else if (cita.estado == '29') {
                      ind = this.enviarAlSiguienteAgenteS(myID);
                      sig = this.AgentS[ind + 1 ] ? this.AgentS[ind + 1 ].id_user : null;
                      if (sig) { cita.id_asignado = sig;
                        this.funcSer.log('id siguiente', sig);
                      }
                      else{
                        cita.estado = '26';
                        cita.asignado = '0'
                      }
                    }
                    else if (cita.estado == '30') {
                      ind = this.enviarAlSiguienteAgenteC(myID);
                      sig = this.AgentC[ind + 1] ? this.AgentC[ind + 1].id_user : null;
                      if (sig) { cita.id_asignado = sig; }
                      else{
                        cita.estado = '27';
                        cita.asignado = '0'
                      }
                    };
                    if (resultado.value) {
                      cita.notas = resultado.value;
                    } else {
                      cita.notas = 'Se ha Devuelto la Cita Sin Mensaje';
                    }
                    cita = this.limpiarDataCita(cita);
                    cita = this.editarhistorial(cita);
                    this.funcSer.log('devolviendo cita a Stack', cita);

                    this.citaStackAgente(cita.id, cita);
                  });
                }
              });

            }

          }
        }
      //}
      })

    } else if (data.length >= 1 ) {
      data.forEach(c => {
        if (c.estado == '28') {
          c.estado = '25';
          c.asignado = '0';
          c = this.editarhistorial(c);
          this.citaStackAgente(c.id, c);
        } else if (c.estado == '29') {
          c.estado = '26';
          c.asignado = '0';
          c = this.editarhistorial(c);
          this.citaStackAgente(c.id, c);
        } else if (c.estado == '30') {
          c.estado = '27';
          c.asignado = '0';
          c = this.editarhistorial(c);
          this.citaStackAgente(c.id, c);
        }
      });
    }
  }

  pedirDesdeStack(){
    this.traerDisponibilidad();
    let x = this.citasStackV.length
    if ( this.libre && this.libre2 ) {
      if (this.citasStackV[0] && this.citasStackV[0].id_asignado == '0') {
        //this.funcSer.log('ok',this.citasStackV[0])
      }
    }
  }

  editarhistorial(data: RespCitasM): RespCitasM{
    const notaAn = data.notas
    let h: CitaCampAd = {
      asigador: 'Automatico',
      asigado: localStorage.getItem('nombre'),
      resultado: 'None',
      hora_asig: this.funcSer.getAhora( new Date() ),
      nota: notaAn ? notaAn: 'None'
    }

    data.campos_adicionales.push(h);
    return data
  }

/* --------------------------metodos a usuario------------------------------ */
/* ------------------------------------------------------------------------- */

  verificarCualAgente(data: RespCitasM): number{
    let ag: number;
    if (this.AgentV && this.AgentV.length >= 1 ) {
      if ( data.estado == '25') {
        ag = Number(this.AgentV[this.iAV]);
        this.iAV + 1;
      }
    } else {
      this.funcSer.showSweetError('Error!','No Hay Agentes de Ventas', 1500);
    }
    if (this.AgentS && this.AgentS.length >= 1  ) {
      if (data.estado == '26') {
        ag = Number(this.AgentS[this.iAC]);
        this.iAS + 1;
      }
    } else {
      this.funcSer.showSweetError('Error!','No Hay Agentes de SAC', 1500);
    }
    if (this.AgentC && this.AgentC.length >= 1 ) {
      if ( data.estado == '27') {
        ag = Number(this.AgentC[this.iAC]);
        this.iAC + 1;
      }
    } else {
      this.funcSer.showSweetError('Error!','No Hay Agentes', 1500);
    }
    return ag;
  }
}
