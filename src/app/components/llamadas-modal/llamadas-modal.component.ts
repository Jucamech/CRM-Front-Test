import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStatusAgent, Dids, LlamadasResp, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { Campos_adicionales, ClientModel, RespCitas, RespPago } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import { Salir } from '../../shared/guards/llamada-nota.guard'
import Swal from 'sweetalert2';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { RespCampaña } from 'src/app/shared/models/citas.model';
import { PagosCobrosService } from 'src/app/shared/services/pagos-cobros.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';

export interface Call {
  tipo_tel: string;
  id_cliente: string;
  did: string;
}

@Component({
  selector: 'app-llamadas-modal',
  templateUrl: './llamadas-modal.component.html',
  styleUrls: ['./llamadas-modal.component.css']
})

// Salir es una implementacion desde el guardian 'llamada-nota.guard'
// este causa el bloqueo de salida de la ruta usando el Metodo OnExit()
export class LlamadasModalComponent implements OnInit, OnDestroy,Salir {
  @Output() moldalEm = new EventEmitter<boolean>();
  @Input() modal: boolean;
  @Input() list: any;
  @Input() idC: any;
  data: RespStatusAgent;
  dataPagos: RespPago[];
  llamadas: LlamadasResp[];

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange(): void {
    this.checkActivity();
  }
  cliente: string;
  toogleAdd: boolean = false;
  diDX: string;
  textoCita: string = 'En el momento no hay Citas relacionadas...';

  getData: boolean = false;

  dataCliente: Partial<ClientModel>;
  notaAs: string;
  opc = 0;
  opc2 = 'none';
  opcH = true;

  citaAtendida: RespCitas;
  E$: Subscription[] = [];

  idCall: string;
  tipoT: string;
  verDR: boolean;
  verAlerta: boolean;
  llamando: boolean;
  minCierre: number = 15;


  IDxx: number;
  citaEmitida: RespCitas;
  citaHome: RespCitas;
  didsUsados: string[] = [];
  ////////////////////////////////////////
  is_Vis: boolean = true;
  coll = 'Campañas_creditoMejor'
  campanas: RespCampaña[] = [];
  modocampa: boolean = false;
  key_c: string;
  id: string;
  key_L: string;
  url: any;
  tiempoInicio: string;
  entradaLegal: boolean;
  //////////////////////////////
  check1:boolean;
  check2:boolean;
  check3:boolean;
  check4:boolean;

  constructor(private route: ActivatedRoute,
              private functC: FuncionesComunesService,
              private CallSer: LlamadasService,
              private CallCliSer: LlamadasPerdidasService,
              private Pay: PagosCobrosService,
              private stalker: RastreadorAgentesService,
              private citasSer: CitasService,
              private httpServ: AuthService)
  {
    this.idCall = this.route.snapshot.params['id'];
    this.verDR = false;
    this.verAlerta = false;
    this.llamando = false;
    this.getData = false;
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.route.snapshot.url[0].path;
    this.entradaLegal = functC.PermisoLLamar;
  }

  /**
   * Es un Middle de salida de ruta,
   *  es igual q un guardian normal pero a la salida "canDeactivate"
   */
  onExit() {
    // leyendo los condicionales se da a entender
    let actu = localStorage.getItem('57e17017');
    let callSal = this.CallSer.id_saliente;
    let obli = localStorage.getItem('013800ce');
    let pagos = localStorage.getItem('b292e6b3');
    if (obli) {
      this.functC.showSweetWarning('ERROR',`Se ha quedado una nota Pendiente!`,2000);
      return false;
    } else if (pagos) {
      this.functC.showSweetWarning('ERROR',`Actualiza los Datos de cobros y pagos del Cliente!`,2000);
      return false;
    } else if (callSal) {
      this.functC.showSweetWarning('ERROR',`Cuelga la LLamada y deja NOTA!`,2000);
      return false;
    } else if (actu) {
      this.functC.showSweetWarning('ERROR',`SE DEBE ACTUALIZAR LOS CAMBIOS ANTES DE ABANDONAR EL CLIENTE`, 2000);
      return false;
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.cerrarModal();
    localStorage.removeItem('2104a1bd');
    this.citasSer.citaEnEspera = null;
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (error) {}
    this.is_Vis = false;
    if (this.entradaLegal) {
      //this.actualizarEstadoComponent();
    }
    this.functC.PermisoLLamar = false;
  }

  ngOnInit(): void {
    this.getDataPagos();
    this.getLLamadas();
    this.buscarCita();
    this.verificarNotaPendiente();
    // this.generarRegistroStalker();
    this.citasSer.callCitas();
    let cita = localStorage.getItem('2104a1bd');
    this.citasSer.Cita$.subscribe( cita => {
      this.citaAtendida = this.validarCita(cita);
      this.citaEmitida =  cita
    });
    // etso recibe los datos
    const E2$ = this.CallSer.llamandoID$.subscribe(r => {
      this.IDxx = Number(r) ;
    });
    const E$1 = this.functC.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    });
    this.nuevoEndP();
    this.getdataCli();
    this.buscarDidsUsados();
    this.E$ = [ E$1, E2$ ];
    if (cita) {
      let citas = JSON.parse(cita)
      console.log(citas.id);
      if (Number(citas.id_cliente) == Number(this.idCall)) {
        this.entradaLegal = true;
      }
    }
    if (!this.entradaLegal) {
      this.functC.showSweetError('ERROR!', 'Acesso ILEGAL', 2000);
    }
  }

  /**
   * Si hay ingreso a la ruta por la url,
   *  solicita la selecion de los CheckBox para continuar
   */
  public entrarLLamarCliente(){
    if (this.check1,this.check2,this.check3,this.check4) {
      let nota = this.dataCliente.nota_cli || 'No Hay Nota';
      this.functC.showSweetX(nota ,'', 'Continuar' )
      .then(() => {
        this.entradaLegal = true;
        this.ngOnInit();
      });
    }
  }

  /**
   * Busca las llamadas del cliente para ponerlas en la validacion de entrada ilegal al componente
   */
  private getLLamadas(): void{
    this.CallCliSer.getLLamadasCliente(this.idCall).then((res) => {
      this.llamadas = res;
    });
  }
  /**
   * Busca los datos de los pagos para la validacion de entrada ilegal
   */
  private getDataPagos(){
    this.Pay.CallDataCli(this.idCall)
    .then(res => {
      this.dataPagos = res[1];
    })
  }
  /**
   * Muestra la nota del cliente en una alerta de sweetAlert
   */
  public verNota(){
    Swal.fire(`${this.dataCliente.nota_cli || 'No Hay Nota'}`);
  }

  /**
   * Genera el registro del componente en el Stalker
   */
  private generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.id,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: this.idCall,
      url_comp: 'LLamar Cliente',
      llamando: {
        tipo: '',
        t_inicio: '',
        t_fin: '',
        id_cliente: ''
      }
    }
    this.stalker.crearRegistro(data).then(res => {
      this.data = res;
    });
  }
  /**
   * Actualiza la informacion del registro en el stalker
   */
  private actualizarEstadoComponent(){
    // esta se llama siempre q se desea actualizar el stalker
    // normalmente cada 5 sec
    let id = this.data.id;
    this.data.hora_final = `${this.functC.getFecha()} ${this.functC.getAhora(new Date())}`
    if (this.is_Vis) {
      this.data.visible = '1';
    } else {
      this.data.visible = '0';
    }
    this.stalker.actualizarDataStalker(id, this.data);
  }

  /**
   * Funcion q determina el estado visible de la pagina,
   *  y si hay cambio de la misma hace la actualización
   */
  private checkActivity(){
    if (document.hidden){
      this.is_Vis = false;
    }else {
      this.is_Vis = true;
    }
    //this.actualizarEstadoComponent();
  }

  /**
   * Funcion verificadora de citas
   */
  verificarCita(cita_L: string){
    // si el id del cliente no coincide con el de la cita
    // destuye la cita, para evitar cruce de datos
    this.citaHome = JSON.parse(cita_L);
    if (this.citaHome.id_cliente != this.idCall ) {
      this.citaHome = null;
      localStorage.removeItem('2104a1bd');
    }
  }
  /**
   * Busca la cita de emitida para analizarla
   * y guardarla como una propiedad del componente si se puede
   */
  buscarCita(){
    let citaLocal = localStorage.getItem('2104a1bd');
    if (this.citasSer.citaEnEspera) {
      this.citaHome = this.citasSer.citaEnEspera;
    } else if (citaLocal) {
      this.verificarCita(citaLocal)
    } else {
      this.citaHome = null;
    }
  }

  public abrirDids(){
    this.modal = true;
    this.buscarDidsUsados();
  }

  /**
   * Busca los Dids en los cuadros de las llamadas
   */
  private buscarDidsUsados(){
    // para ponerlos en una lista para ser visto por el agente
    this.didsUsados = [];
    if (this.citaHome && this.citaHome.campos_adicionales.length > 0 ) {
      this.citaHome.campos_adicionales.forEach( c => {
        this.didsUsados.push( c.did );
      });
    }
  }

  private verificarNotaPendiente(){
    let obli = localStorage.getItem('013800ce');
    if (obli) {
      let obleng = obli.length;
      const id = obli.slice(3, obleng - 5);
      this.idCall = id;
      this.functC.showSweetWarning('ERROR',`Se ha quedado una nota Pendiente!`,2000);
    }
  }

  /**
   * Trae y dispone la informacion del cliente
   */
  private getdataCli() {
    this.httpServ.getCliente(this.idCall).subscribe(
     ( res: ClientModel )=> {

        if (res && res.campos_adicionales && res.campos_adicionales.fechas_pagos_inscripcion) {
          this.dataCliente = this.functC.creadorDeCamposObligatorios(res);
          this.httpServ.dataClienteE$.emit(this.dataCliente)
        } else {
          let data: Partial<ClientModel> = this.functC.creadorDeCamposObligatorios(res);
          let campos: Campos_adicionales = this.functC.creadorDeCamposAd(res);
          data.campos_adicionales = campos;
          this.dataCliente = data;
        }
        this.notaAs = this.dataCliente.campos_adicionales.notas;
        this.cliente = `${this.dataCliente.nombres} ${this.dataCliente.apellidos}`;
      }
    );
  }

  /**
   * Analiza la data de la cita/llamada inmediata para y si es tardia darla como no atendida
   */
  validarCita(data: RespCitas):RespCitas {
    if (data) {
      let horaP = `${this.functC.addMinToDate(data.fecha_creacion, 3)}`;// tiempo no real
      let horaP2 = `${this.functC.addMinToDate(data.fecha_creacion, 6)}`;// tiempo
      let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(new Date())}`;

      if (data.estado > '16') {
        if ( horaP > ahora ) {
          this.textoCita = 'tiene cita inmediata pendiente.';
          return data
        }
        return null;
      } else {
        if ( horaP2 > data.fechahora ) {
          this.textoCita = 'tiene cita pendiente.';
          return data;
        }
        this.textoCita = 'No Hay citas vinculadas.';
        return null
      }
    } else {
      this.textoCita = 'No Hay citas vinculadas.';
      return null
    }
  }

  cerrarModal() {
    this.modal = false;
    this.CallSer.cerrar();

  }

  /**
   * Trae los Dids pa las llamadas
   */
  public nuevoEndP() {
    this.httpServ.getUDids().subscribe(
      (res: Dids) => {
        let lista = []
        for (const key in res) {
          const el = res[key];
          lista.push(el)
        }
        this.list = lista;
      }
    )
  }

  mostrar(){
    if (this.opc2 == 'none') {
      this.opc2 = 'ver_historial';
    } else {
      this.opc2 = 'none';
    }
  }

  /**
   * Realizador de Llamadas
   */
  public manageCall(did: any) {
    let id = this.idCall || this.idC;// ID del cliente
    this.diDX = did.estado ;
    let data:Call = {
      tipo_tel: this.tipoT,
      id_cliente: id,
      did: did.did,
    }
    if (this.tipoT) {
      this.modal = false;
      this.verAlerta = false;
      this.llamando = true;
      if (this.citaAtendida && data.id_cliente == this.citaAtendida.id_cliente ) {
        this.citaLlamada();
      }
      this.CallSer.realizarLLamada(data);
      this.data.llamando.id_cliente = id;
      this.data.llamando.t_inicio = `${this.functC.getAhora(new Date())}`;
      this.data.llamando.tipo = 'Saliente';
      const E$3 = this.CallSer.llamandoData$.subscribe(r => {
        if (!r.ok) {
          this.cerrarLlamada();
        }
      })
      this.E$.push(E$3);
    } else {
      this.verAlerta = true;
    }
  }

  /**
   * Los agentes de ventas pueden solicitar los datos de las tarjetas,
   *  Esta es la confirmacion
   */
  public dataReporteAct() {
    Swal.fire({
      title: 'CONFIRMAR',
      text: `Solicitar Datos de Reporte?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar',
    }).then((r) => {
      if (r.isConfirmed) {
        this.verDR = this.verAgentToken();
        if (!this.verDR) {
          this.functC.showSweetError('No Autorizado!', '', 1500);
        } else {
          this.cerrarReporte();
        }
      }
    });
  }

  cerrarReporte() {
    let hora = `${this.functC.getFecha()} ${this.functC.getHora()}`;
    let HC = this.functC.toTimeStamp(hora) + (this.minCierre * 60000);
    let horaCierre: Date = this.functC.fromTimeStamp(HC);
    const E$1 = this.functC.interval(500).subscribe(() => {
      let ahora = new Date()
      if (ahora > horaCierre) {
        this.verDR = false;
      }
    });
    this.E$.push(E$1)
  }

  cerrarLlamada() {
    this.llamando = false;
    this.verDR = false;
    this.CallSer.cerrar();
    this.data.llamando.t_fin = `${this.functC.getAhora(new Date())}`;
  }

  verAgentToken(): boolean {
    const tok = localStorage.getItem('token');
    const dataAgt = this.functC.parseJwt(tok)
    if (dataAgt.data.departamento == '2') {
      return true
    } else if (dataAgt.data.nivel == '3') {
      return true
    } else {
      return false
    }
  }
  /**
   * Funcion q genera al recepción efectiva de la cita
   */
  citaLlamada(){
    const now = new Date();
    let asig = localStorage.getItem('id_agente');
    let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(now)}`;
    let horaP = `${this.functC.getFecha()} ${this.functC.addMinToDate(this.citaAtendida.fecha_creacion, 5)}`;// tiempo no real
    let agen = localStorage.getItem('nombre');
    let data = {
      id : this.citaAtendida.id,
      estado: '20',
      notas: `Cita Atendida por: ${agen} - Asignada a: ${this.citaAtendida.asignado}`
    }
    if (horaP > ahora && this.citaAtendida.id_asignado == asig) {
      this.httpServ.putCita(data.id, data).subscribe(res => {
        this.functC.showSweetSuccess('Cita Atendida!', '', 1000);
      })
    }
  }


}
