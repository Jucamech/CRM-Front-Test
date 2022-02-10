import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasStackService, Token } from 'src/app/shared/services/citas-stack.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AgentModel } from 'src/app/shared/models/otros.model';
import { MOTIVOS_CITA } from 'src/app/shared/models/citas.model';
import { WhatsappApiService } from 'src/app/shared/services/whatsapp-api.service';

@Component({
  selector: 'app-alertas',
  template: '',
  styleUrls: ['./alertas.component.css'],
})
export class AlertasComponent implements OnInit, OnDestroy {
  @Input() token: Token;
  is_Vis: boolean;

  dataCitasClients: Array<RespCitas>;
  limitador: boolean = false;
  cliente: string;
  horaCitaCli: string;

  xdxdxd: number;

  min: any = new Date().getMinutes();
  hora: any = new Date().getHours();
  E$: Subscription[] = [];
  sonando: boolean = false;
  audio: HTMLAudioElement = new Audio( '../../../assets/alerta/alert4.mp3' );
  miID: string;
  nivel: any;
  url: string;
  id_url: string;
  bloq: boolean;

  key_c: string;
  status: { id: any; data: any; };
  key_L: string;
  tiempoInicio: number;
  agentes2: AgentModel[];
  AllAgents: RespUser[];
  MOTIVOS = MOTIVOS_CITA;
  jwtP: any;

  constructor(private citasServ: CitasService,
              private functC: FuncionesComunesService,
              private Stack: CitasStackService,
              private CallSer: LlamadasService,
              private AgentSer: AgentesService,
              private toastr: ToastrService,
              private httpSer: AuthService,
              private whatsApp: WhatsappApiService,
              private router: Router)
  {
    this.miID = localStorage.getItem('id_agente');
    this.key_L = localStorage.getItem('ee743bdd');
    this.jwtP = this.functC.parseJwt( localStorage.getItem('token') );
    this.nivel = this.jwtP.data.nivel;
    this.tiempoInicio = new Date().getTime();
  }

  ngOnDestroy(): void {
    this.dataCitasClients = [];
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {}
  }

  ngOnInit(): void {
    this.montajeDeComponente();
    this.emitirDataClienteEnLLamada();
    this.getDatosURL();
    const E$2 = this.CallSer.llamandoID$.subscribe(r => {
      this.xdxdxd = r
      this.getDatosURL();
    });
    this.AgentSer.callAgentes().then(res => this.AllAgents = res );
    const E$3 = this.citasServ.Citas$.subscribe(r => {
      this.buscarCitas(r);
    });
    const E$1 = this.functC.interval(10000).subscribe(() => {
      this.montajeDeComponente();
    });
    this.E$ = [E$1 ,E$2, E$3 ];
  }

  /**
   * Monta y dispone de las funciones principales para la citas
   */
  montajeDeComponente(){
    this.functC.log('alerta disponible', true)
    let token = localStorage.getItem('token');
    if (token && this.jwtP.data.ext.length == 3) {
      this.citasServ.callCitasHoySinF();
      this.Stack.pedirDesdeStack();
      this.actTimer();
      this.emitirDataClienteEnLLamada();
    }
  }

  emitirDataClienteEnLLamada(){
    let id_call = localStorage.getItem('change');
    if (id_call) {
      this.CallSer.getCliente(id_call);
    } else {
      this.httpSer.dataClienteE$.emit(null);
    }
  }

  getDatosURL(){
    this.key_c = localStorage.getItem('ee743bxd');
    this.url = this.router.routerState.snapshot.url.split('/')[1];
    this.id_url = this.router.routerState.snapshot.url.split('/')[2] ? this.router.routerState.snapshot.url.split('/')[2] : '';
    //this.insertDataComponent(this.is_Vis);
  }

  /**Administra el sonido a sonar cuando se activa una alarma de cita */
  sonidoAlarma(){
    this.functC.log('sonido Bloq', this.sonando);
    let admin = this.Stack.generarPermisos();
    if (!this.sonando) {
      if ( admin ){
        this.audio = new Audio('../../assets/alerta/alert3.mp3');
        this.audio.load();
        this.audio.play();
      } else {
        this.sonando = true;
        this.audio.load();
        this.audio.play();
      }
    }
  }

  cortarAlerta(){
    this.audio.pause();
  }

  /**Suministra las citas a todas la funciones q las necesitan */
  buscarCitas(resp): void{
    this.dataCitasClients = resp;
    this.reportarCitasPerdidas(resp);
    this.shotAlertaInmediata(resp);
    //this.emitirCitaEnProceso(resp);
    this.prepararAlerta(resp);
    this.preparar2Alerta(resp);
    this.preparar22Alerta(resp);
    this.preparar3Alerta(resp);
    this.citaInmediataNoAten(resp);
    this.shotAlert(resp);
  }

  //////////////////////////////////////////////////////////////////////////////
  ////////////////////////↓↓↓ PREPARADORES DE ALERTAS ↓↓↓///////////////////////

  prepararAlerta(data: RespCitas[]): void {
    for (const key in data) {
      const el = data[key];
      el.tempo = 60;
      el.horaAlarma = this.functC.generateHoraAlarma(el.fechahora, el.tempo);
    }
  }

  preparar2Alerta(data: RespCitas[]): void {
    for (const key in data) {
      const el = data[key];
      el.tempo2 = 30;
      el.horaAlarma2 = this.functC.generateHoraAlarma(el.fechahora, el.tempo2);
    }
  }

  preparar22Alerta(data: RespCitas[]): void {
    for (const key in data) {
      const el = data[key];
      el.tempo22 = 15;
      el.horaAlarma22 = this.functC.generateHoraAlarma(el.fechahora, el.tempo22);
    }
  }

  preparar3Alerta(data: RespCitas[]): void {
    for (const key in data) {
      const el = data[key];
      el.tempo3 = 5;
      el.horaAlarmaF = this.functC.generateHoraAlarma(el.fechahora, el.tempo3);
    }
  }

  ////////////////////////↑↑↑ PREPARADORES DE ALERTAS ↑↑↑////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////↓↓↓ DISPARADORES DE ALERTAS ↓↓↓////////////////////////

  reportarCitasPerdidas(data:RespCitas[]){
    let now = `${this.functC.getFecha()} ${this.functC.getAhora( new Date() )}`;
    data = this.functC.inyectarAgente(data ,this.AllAgents, 'id_asignado' );

    this.AgentSer.getUsersPhone().then(res => {
      if (res[0].id_user == this.miID) {
        data.forEach(c => {
          let tarde = this.functC.addMinToDate(c.fechahora , 7);
          let agt = c.asignado;
          if (c.estado == '1' ) {
            this.functC.log('tarde / cita',[ tarde, c.fechahora ]);
            if (now > tarde) {
              let mot:string;
              this.MOTIVOS.forEach(m => {
                if (c.motivo == m[0]) { mot = m[1] }
              });
              this.functC.log('Hay cita para reportar', true);
              const body = `El Agente : ${agt},
              Ha perdido la cita con Id cliente: ${c.id_cliente},
              a nombre cliente: ${c.nombres || 'Null'} ${c.apellidos || 'Null'},
              Hora actual de la cita : ${c.fechahora.slice(11, 19)},
              Motivo Cita: ${mot},
              Nota : ${c.notas}.`
              this.httpSer.putCita(c.id ,{estado: '0' }).subscribe(() => {
                this.whatsApp.reportandoASuperV(body);
              });
            }
          }
        });
      }
    })

  }

  /**
   * Si no se atiende la cita en 3 MIN tiempo se vuelve una cita no atendida
   * @param data
   */
  citaInmediataNoAten(data){
    let citasRetornadas: RespCitas[] = [];
    const now = new Date();
    let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(now)}`;
    for (const key in data) {
      const el = data[key];
      if (el.estado == '17') {
        const aler = this.functC.addMinToDate( el.fecha_creacion, 3);
        if (ahora > aler) {
          let id = el.id;
          let x = {
            estado: '21',
            notas: `Llamada no realizada`
          };
          this.citasServ.Cita$.emit(undefined);
          this.httpSer.putCita(id, x).subscribe()
        }
      }
      if (el.estado == '21') {
        citasRetornadas.push(el);
      }
    }
    citasRetornadas = this.functC.eliminarDuplicados(citasRetornadas)
    this.citasServ.CitasNoAtendidas$.emit(citasRetornadas);
  }

  /**
 * Dispara la alarma de llamada inmediata
 * @param data RespCitas[]
 */
  shotAlertaInmediata(data: RespCitas[]){
    const now = new Date();
    let asig = this.miID;
    let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(now)}`;
    try {//↓↓↓ ITERA TODAS LAS CITAS ↓↓↓
      data.forEach(cita => {
        if ( cita.estado == '17' && cita.id_asignado == asig ) {
          this.citasServ.Cita$.emit(cita); // EMITE LA CITA
          // MUESTRA LA ALERTA Y LA DEJA SUSPENDIDA
          Swal.fire({
            title: 'LLAMADA ASIGNADA!',
            text: `Llamar a ${cita.nombres} ${cita.apellidos}-${cita.notas}`,
            icon: 'warning',
            confirmButtonText: 'OK!',
          }).then((ok) => {
            let horaP = ` ${this.functC.addMinToDate(cita.fecha_creacion, 3)}`;
            if (horaP > ahora) { // SI LA CITA ES ATENTIDA EN MAS DE TRES MIN LA DA POR NO ATENDIA A TIEMPO
              this.functC.showSweetWarning('Fallo!','Cita ya perdida',3000);
            } else { // SI LA CITA ES ATENTIDA EN MENOS DE TRES MIN
              let x = {
                estado : '19',
              }
              let hayCita = localStorage.getItem('2104a1bd');
              this.functC.logWarn('cita posteada desde el shot alert inmedita', cita.id_asignado );
              if (!hayCita) {
                localStorage.setItem('2104a1bd', JSON.stringify(cita) ); //MANDA AL LOCALSTORAGE LA CITA
                this.functC.logWarn('cita posteada desde el shot alert inmedita2', cita.id_asignado );
              }
              // MODIFICA EL ESTADO DE LA CITA
              this.httpSer.putCita(cita.id ,x).subscribe(
                (res) => {
                  this.analizardorEstadoAgente(cita);
                  /* this.router.navigateByUrl(`/llamarcliente/${cita.id_cliente}`);
                  this.functC.showSweetSuccess('Ok!','',1200); */
                },
                (err) => {
                  this.functC.showSweetError('Fallo!','error :' + err.status,3000);
              });
            }
          });
        }
      });
    } catch (error) {}
  }

  /**
   * Muestra alertas de tipo Toast-Tr,
   * por defecto se muestra 9 segundos
   * @param txt texto a mostrar
   * @param tt titulo de la alerta
   */
  private showToast(txt:string, tt: string): void {
  this.toastr.success(txt, tt, {
    timeOut:9000,
  }).onTap
    .pipe(take(1))
    .subscribe(() => {
      if (!this.sonando) { this.cortarAlerta(); }
      else { this.sonidoAlarma() }
      this.sonando = !this.sonando;
    });
  }

    /**
   * Aqui llega las citas para ser disparadas
   * @param data todas las citas de este dia
   */
  shotAlert(data: RespCitas[]): void {
  data = this.nivel == 3 ? data : this.filtrarMisCitas( data );
  let hora = `${this.hora}:${this.min}`;
    try { //↓↓↓ VERIFICA Q HAY CITAS PARA EL DIA DE NO SER DARIA ERROR ↓↓↓
      if (data) {
        //↓↓↓ ITERA TODAS LAS CITAS ↓↓↓
        for (let i = 0; i < data.length; i++) {
          // CADA CITA SE PROCESA INDEPENDIENTEMENTE
          const el = data[i];
          // ESTE "IF" MIRA LA ALARMA FINAL Q SON 5 MIN ANTES DE LA HORA DE LA CITA
          if ( el.horaAlarmaF == hora && el.id_asignado == this.miID ) {
            let hayCita = localStorage.getItem('2104a1bd');
            this.functC.logWarn('cita psteada desde el shot alert', el.id_asignado );

            if (!hayCita) {
              localStorage.setItem('2104a1bd', JSON.stringify(data[i]) ); //MANDA AL LOCALSTORAGE LA CITA
            this.functC.logWarn('cita psteada desde el shot alert2', el.id_asignado );

            }
            this.citasServ.Cita$.emit(el);// EMITE LA CITA
            // ANALIZA SI YA SE ESTA ATENDIENDO LA CITA Y SI ESTA EN EL COMPONENETE DE LLAMADAS
            this.analizardorEstadoAgente(data[i]);
          }
          // ESTE OTRO "IF" VERIFICA LAS DEMAS ALARMAS
          if ( (el.horaAlarma == hora || el.horaAlarma2 == hora || el.horaAlarma22 == hora ) && el.id_asignado == this.miID ) {
            this.cliente = `${el.nombres} ${el.apellidos}`; //SETEA EL NOMBRE DEL CLIENTE PARA MOSTRARLO EN LA ALERTA
            this.horaCitaCli = el.fechahora.slice(11, 16);//SETEA LA HORA DE LA CITA PARA MOSTRARLA EN LA ALERTA
            this.sonidoAlarma(); // SE ACTIVA EL SONIDO
            // ESTE "IF" MIRA SI ES SUPERVISOR O NO, PARA CAMBIAR EL TIPO DE ALERTA
            if ( this.Stack.generarPermisos() ) {
              this.showToast( `${this.cliente}/${el.id_cliente} - ${this.horaCitaCli}`, `Cita de ${el.asignado}` )
            } else if (!this.limitador /* EVITA Q SE DISPAREN MAS DE UNA ALARMA A LA VEZ */) {
              // PREGUNTA SI SE DESEA MANDARA A PEDIR REASIGNACION DE LA CITA A OTRO AGENTE
              Swal.fire({
                title: 'Cita Próxima',
                text: `${this.cliente} - ${this.horaCitaCli}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK!',
                cancelButtonText: 'Pedir Reasignación?',
              }).then((resultado) => {
                // ESTA PARTE LIMITA LA FUNCION Y CANCELA EL SONIDO
                this.limitador = true;
                this.functC.log('limitador',this.limitador);
                this.cortarAlerta();
                if (resultado.value) {
                  // ESTE ES EL OK Y CONFIRMACION DE LA CITA
                  this.preparar2Alerta(this.dataCitasClients);
                } else {
                  // AQUI SE MANDA A PEDIR LA REASIGNACION DE LA CITA PREGUNTANDO EL MOTIVO DEL POR Q?
                  Swal.fire({
                    title: 'Motivo',
                    input: 'text',
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                  }).then((resultado) => {
                    if (resultado.value) {
                      this.solicitudCitaPost(el, resultado.value, el.id);
                    }
                  });
                }
              });
            }
          }
          // ESTE "IF" ES EL DESBLOEA LA FUNCION Y DEJA UTIL EL SONIDO DE NUEVO
          if (el.horaAlarma < hora && this.limitador ) {
            if (i == 0 ) {
              this.functC.log('Estado de alarm Camb1', [ 'limitador',this.limitador, 'sonido bloq', this.sonando ] );
            } else {
              setTimeout(() => {
                this.functC.log('Estado de alarm Camb2', [ 'limitador',this.limitador, 'sonido bloq', this.sonando ] );
                this.sonando = false;
                this.limitador = false;
              }, 50000)
            }
          }
        }
      }
    } catch (error) { this.functC.logWarn('Error Alert C', error);}
  }
  ////////////////////////↑↑↑ DISPARADORES DE ALERTAS ↑↑↑////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  analizardorEstadoAgente(data: RespCitas){
     // ANALIZA SI YA SE ESTA ATENDIENDO LA CITA Y SI ESTA EN EL COMPONENETE DE LLAMADAS
    if ((this.url == 'llamarcliente' && this.id_url != data.id_cliente) || this.url == 'speechsticket' ) {// speechsticket
      if (!this.bloq) { // BLOQUEA Y DESBLOQUEA LA FUNCION DE SER NECESARIO

        this.bloq = true;
        this.functC.showSweetSuccess('Cita en procceso','Dirigiendo a cita...',1500);
        const url = this.router.createUrlTree(['/llamarcliente/',data.id_cliente]);
        // REDIRIGE AL AGENTE A LA CITA EN UNA NUEVA PESTAÑA
        this.desbloquearVentana(url);
      } else {
        this.toastr.success('Esta ventana esta temporalmente suspendida, Click para habilitar', 'Cita en proceso', {
          timeOut:6000,
        }).onTap
          .pipe(take(1))
          .subscribe(() => {
            this.bloq = false;
          });
      }
    } else if (this.url == 'llamarcliente' && this.id_url == data.id_cliente ) {
      this.functC.showToast('Cita Redirigida', 'OK!',5000) // SIGNIFICA EL AGENTE EL AGENTE ESTA EN EL LUGAR Y MOMENTO CORRRECTOS
    } else {
      this.functC.showSweetSuccess('Cita en procceso','Dirigiendo a cita...',1500);
      this.router.navigateByUrl(`/llamarcliente/${data.id_cliente}`); //REDIRIGE AL AGENTE A LLAMAR AL CLIENTE
    }
  }

  desbloquearVentana(url: UrlTree){
    if (this.url != 'speechsticket') {
      window.open(url.toString(), '_blank');
      setTimeout(() => {
        this.bloq = false;
        this.functC.log('funcion desbloqueada', '');
      }, 75000);
    }
  }

  /**Actualiza el tiempo */
  actTimer() {
    this.min = new Date().getMinutes();
    this.hora = new Date().getHours();
    if (this.min < 10) this.min = `0${this.min}`;
    if (this.hora < 10) this.hora = `0${this.hora}`;
  }

  /**
   * Toma la cita q no se puede aterder por el agente y la manda a reasignar
   * @param obj cita para mandar a reasignar
   * @param mot el motivo del porq no puede responder
   * @param id id de la cita
   */
  solicitudCitaPost(obj: RespCitas, mot: string, id): void {
    let x = {
      estado: '11',
      notas: mot,
    };
    this.httpSer.putCita(id, x).subscribe(
      () => {
        this.functC.showSweetSuccess('Cita Modificada','',1300);
      },
      (err) => {
        this.functC.showSweetError('Fallo!','error :' + err.status,3000);
      }
    );
  }

  /**Cambia el estado de la cita q fue recibida en LlamarClienteComponent */
  emitirCitaEnProceso(citas:RespCitas[]){
    citas.forEach(e  => {
      if (e.estado == '19') {
        const miID = localStorage.getItem('id_agente');
        if (e.id_asignado == miID) {
          this.citasServ.emitirCitaAtendida(e);
        }
      }
    });
  }

  /**Filtra las citas en caso de ser un agente normal */
  filtrarMisCitas( citas: RespCitas[] ): RespCitas[]{
    let citasF: RespCitas[] = [];
    citas.forEach(cita => {
      if (cita.id_asignado ==  this.miID) {
        citasF.push(cita)
      }
    });
    return citasF;
  }
////////////////////////////////////////////////////////////////////////////

}
