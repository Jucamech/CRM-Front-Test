import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { METODO } from 'src/app/shared/constants/pagos';
import { DataStatusAgent, FechasPagos, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { RespPago, RespUser } from 'src/app/shared/models/usuario.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { PagosCobrosService } from 'src/app/shared/services/pagos-cobros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos-sac',
  templateUrl: './pagos-sac.component.html',
  styleUrls: ['./pagos-sac.component.css']
})
export class PagosSACComponent implements OnInit, OnDestroy {
  @Input() tooglePop2: boolean;
  @Input() tooglePop3: boolean;
  @ViewChild('cont_tabla1') content: ElementRef;
  @ViewChild('cont_tabla2') content2: ElementRef;
  is_Vis: boolean = true;
  id: string;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  data: RespStatusAgent;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  spinner: boolean;
  totalData: number;
  totalPagos: number;
  totalCobros: number;
  btnT: boolean;
  usuariosList: RespUser[] = [];
  @Input()
  set metodo(v: number) {// actualiza las tablas de pagos
    this.reset = false;
  }

/* ********************************************************************** */
  dropDown1 = 'list-unstyled collapse';
  dropDown2 = 'list-unstyled collapse';
  dropDown3 = 'list-unstyled collapse';

  /* DATA NUEVOS ALL */

  allData: RespPago[];
  allDataCopia: RespPago[];
  allCobros: RespPago[];
  allPagos: RespPago[];

  /* DATA NUEVOS ALL */
  /* -------------- */
  /* DATA NUEVOS HOY*/

  hoyData: RespPago[] = [];
  hoyDataCopia: RespPago[] = [];
  hoyCobros: RespPago[] = [];
  hoyPagos: RespPago[] = [];

  /* DATA NUEVOS HOY*/
  /* -------------- */
  /* DATA NUEVOS FECHA*/

  fechaData: RespPago[] = [];
  fechaDataCopia: RespPago[] = [];
  fechaCobros: RespPago[] = [];
  fechaPagos: RespPago[] = [];

  /* DATA NUEVOS FECHA*/
/* ********************************************************************** */
  E$: Subscription[]=[];

  dataItemPop: RespPago;
  dataItemPop2: RespPago;
  dataItemPop3: RespPago;
  tooglePop: boolean;

  dataPagos: RespPago[] = [];
  dataPagosCopia: RespPago[] = [];
  copiaDataPagos: RespPago[];
  copiaDataPagosFecha: RespPago[];

  dataPagoHistorial: RespPago[];
  usuariosList2: RespUser[];

  dataCobros: RespPago[]=[];
  copiaDataCobros: RespPago[]=[];
  copiaDataCobrosFecha: RespPago[]=[];

  metodoPago = METODO;
  opcFiltroFecha: number = 0;
  opcionVer: Number;
  filtroAct: String;
  vari: string = 'hoy';

  pago_mes: number;
  total_pagos_realizados: number;
  pagos_realizados: string;
  total_anual: number;
  debe: number;

  toogleTabla: string = 'todo';
  reset: boolean;
  verCita: boolean = false;

  yearAct: number;
  mesDrop: number;
  diaEspecifico: string;
  diaInicio: string;
  diaFin: string;
  arraYears = [
    { y: 2020 },
    { y: 2021 },
    { y: 2022 },
    { y: 2023 },
    { y: 2024 },
    { y: 2025 },
    { y: 2026 },
    { y: 2027 },
    { y: 2028 },
    { y: 2029 },
    { y: 2030 }
  ]
  months = ["cero", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];

  atrazado: boolean;
  c_rojo: boolean;
  nopago_afecha: boolean;
  nopago_cambiofecha: boolean;
  nopago_nocomunicacion: boolean;
  pago_adela: boolean;
  yapago: boolean;
  yapago_norefleja: boolean;

  atrazadoI: boolean;
  c_rojoI: boolean;
  nopago_afechaI: boolean;
  nopago_cambiofechaI: boolean;
  nopago_nocomunicacionI: boolean;
  pago_adelaI: boolean;
  yapagoI: boolean;
  yapago_noreflejaI: boolean;

  dataCliH;
  id_as_conf: number;
  isSupervisor: boolean = false;
  page:number = 0;
  //// TOTALES EN RESUMEN
  totalRcibido: number;
  totalPendien: number;
  totalEsperad: number;

  constructor(private httpServ: AuthService,
              private functC: FuncionesComunesService,
              private Pay: PagosCobrosService,
              private activateRoute: ActivatedRoute,
              private stalker: RastreadorAgentesService,
              private AgentSer: AgentesService) {
    this.yearAct = functC.hoy.getFullYear();
    this.atrazado = false;
    this.c_rojo = false;
    this.nopago_afecha = false;
    this.nopago_cambiofecha = false;
    this.nopago_nocomunicacion = false;
    this.pago_adela = false;
    this.yapago = false;
    this.yapago_norefleja = false;
    this.reset = true;
    //////
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.activateRoute.snapshot.url[0].path;
    this.tiempoInicio = new Date().getTime();
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (err) { }
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    this.getHoyNuevo();
    this.filtroAct = 'Hoy';
    //this.generarRegistroStalker();
    this.getAgentes();
    this.generarPermiso();
    const E$3 = this.functC.interval(200).subscribe(() => {
      this.filtroColor(this.allDataCopia);
    })
    const E$1 = this.functC.interval(5000).subscribe(()=> {
      //this.actualizarEstadoComponent();
    })
    this.E$ = [ E$1, E$3 ];
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.id,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'Pagos SAC',
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

  actualizarEstadoComponent(){
    let id = this.data.id;
    this.data.hora_final = `${this.functC.getFecha()} ${this.functC.getAhora(new Date())}`
    if (this.is_Vis) {
      this.data.visible = '1';
    } else {
      this.data.visible = '0';
    }
    this.stalker.actualizarDataStalker(id, this.data);
  }

  checkActivity(){
    if (document.hidden){
      this.is_Vis = false;
    }else {
      this.is_Vis = true;
    }
    //this.actualizarEstadoComponent();
  }


  /**Resea a cero el scroll */
  scrollToBottom(): void {
    try {
      this.content.nativeElement.scrollTop = 0;
      this.content2.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  /**Paginación del pipe */
  nextP(){
    this.page += 100;
    this.scrollToBottom();
  }
  /**Paginación del pipe */
  prevP(){
    if (this.page > 0) {
      this.page -= 100;
      this.scrollToBottom();
    }
  }

  /**Genera el resumen de cuentas una vez optiene los datos de cobro y pago */
  private crearResumen(pagos:RespPago[], cobros: RespPago[], todo: RespPago[]): void{
    this.totalRcibido = 0;
    this.totalPendien = 0;
    this.totalEsperad = 0;
    pagos.forEach( e => this.totalRcibido =  Number(this.totalRcibido) + Number(e.valor) );
    cobros.forEach( e => this.totalPendien = Number(this.totalPendien) + Number(e.valor) );
    todo.forEach( e => this.totalEsperad = Number(this.totalEsperad) + Number(e.valor) );
  }

/* ********************************************************************** */
/* -------------------------METODOS ACTUALIZADOS------------------------- */

  /** Get de los agentes para heredarlos a loscomponentes hijos */
  private getAgentes(): void {
    this.usuariosList2 = []
    this.AgentSer.callAgentes().then(
      (res: RespUser[]) => {
        this.usuariosList = res;
        this.usuariosList2 = this.AgentSer.filtrarAgentesconExt(res);
      }

    );
  }

  /** Get de los pagos y cobros de Hoy */
  getHoyNuevo(): void{
    this.Pay.emiteAllHoy().then(r => {
      let all: RespPago[] = [];
      this.allCobros = r[0];
      this.allPagos = r[1];
      this.allData =  all.concat(r[0], r[1]);
      this.totalData =this.allData.length;
      this.totalPagos =this.allPagos.length;
      this.totalCobros =this.allCobros.length;
      this.allDataCopia = all.concat(r[0], r[1]);
      this.crearResumen(this.allPagos, this.allCobros,this.allData );
    })
  }

  /** Get de los pagos y cobros por fecha
   * Se usa en todos los fintrol de la botonera azul menos "Hoy"
   */
  getFechaNuevo(fecha: FechasPagos): void{
    this.Pay.CallFechaAll(fecha).then(r => {
      let all: RespPago[] = [];
      this.allCobros = r[0];
      this.allPagos = r[1];
      this.allData =  all.concat(r[0], r[1]);
      this.totalData =this.allData.length;
      this.totalPagos =this.allPagos.length;
      this.totalCobros =this.allCobros.length;
      this.allDataCopia = all.concat(r[0], r[1]);
      this.crearResumen(this.allPagos, this.allCobros,this.allData );
      this.spinner = false;
    })
  }

  /**Se encarga de los DropDowms del nav lateral ¡NO TOCAR! */
  toogleSubMenus(n: number): void {
    this.scrollToBottom();
    this.page = 0;
    if (n == 2) {
      if (this.dropDown2 == 'list-unstyled collapse show') {
        this.dropDown2 = 'list-unstyled collapsing';
        setTimeout(() => {
          this.dropDown2 = 'list-unstyled collapse';
        }, 100);
      } else {
        this.dropDown2 = 'list-unstyled collapsing';
        setTimeout(() => {
          this.dropDown2 = 'list-unstyled collapse show';
        }, 200);
      }
      this.dropDown1 = 'list-unstyled collapse';
      this.dropDown3 = 'list-unstyled collapse';
      this.toogleTabla = 'cobro';
      this.resetInputs();
    } else if (n == 1) {
      if (this.dropDown1 == 'list-unstyled collapse show') {
        this.dropDown1 = 'list-unstyled collapsing';
        setTimeout(() => {
          this.dropDown1 = 'list-unstyled collapse';
        }, 100);
      } else {
        this.dropDown1 = 'list-unstyled collapsing';
        setTimeout(() => {
          this.dropDown1 = 'list-unstyled collapse show';
        }, 200);
      }
      this.dropDown2 = 'list-unstyled collapse';
      this.dropDown3 = 'list-unstyled collapse';
      this.toogleTabla = 'pago';
      this.resetInputs();
    } else if (n == 3) {
      if (this.dropDown3 == 'list-unstyled collapse show') {
        this.dropDown3 = 'list-unstyled collapsing';
        setTimeout(() => {
          this.dropDown3 = 'list-unstyled collapse';
        }, 100);
      } else {
        this.dropDown3 = 'list-unstyled collapsing';
        setTimeout(() => {
          this.dropDown3 = 'list-unstyled collapse show';
        }, 200);
      }
      this.dropDown2 = 'list-unstyled collapse';
      this.dropDown1 = 'list-unstyled collapse';
      this.toogleTabla = 'todo';
      this.resetInputs();
    }
  }

  /** Elimina el cobro / ya no se usa */
  delCobro(item:RespPago): void{
    Swal.fire({
      title: 'Eliminar',
      text: `Confirma La Eliminación`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        this.Pay.delCobro(String(item.id)).then(() => {
          let i = this.allCobros.indexOf(item);
          delete this.allCobros[i];
        });
      }
    });
  }

/* -------------------------METODOS ACTUALIZADOS------------------------- */
/* ********************************************************************** */
/* ---------------------------METODOS V EN USO_-------------------------- */

  /**Filtra los pagos y cobros por color */
  private filtroColor(arr: RespPago[]): void {
    if ( arr ) {
      let z: RespPago[] = [],
        y: RespPago[] = [],
        x: RespPago[] = [],
        w: RespPago[] = [],
        v: RespPago[] = [],
        u: RespPago[] = [],
        t: RespPago[] = [],
        s: RespPago[] = [],
        r: RespPago[] = [];

      this.c_rojo ? z = arr.filter((pago) => pago.color == '8') : z = [];
      this.pago_adela ? y = arr.filter((pago) => pago.color == '7') : y = [];
      this.yapago ? x = arr.filter((pago) => pago.color == '6') : x = [];
      this.atrazado ? w = arr.filter((pago) => pago.color == '5') : w = [];
      this.yapago_norefleja ? v = arr.filter((pago) => pago.color == '4') : v = [];
      this.nopago_cambiofecha ? u = arr.filter((pago) => pago.color == '3') : u = [];
      this.nopago_nocomunicacion ? t = arr.filter((pago) => pago.color == '2') : t = [];
      this.nopago_afecha ? s = arr.filter((pago) => pago.color == '1') : s = [];
      r = arr.filter((pago) => pago.color == '0');

      r = r.concat(s, t, u, v, w, x, y, z);

      if (this.c_rojo || this.pago_adela || this.yapago || this.atrazado || this.yapago_norefleja || this.nopago_cambiofecha || this.nopago_nocomunicacion || this.nopago_afecha) {
        if (this.toogleTabla == 'todo') {
          this.allData = r;
        } if (this.toogleTabla == 'pago' || this.toogleTabla == 'pagoMod') {
          this.allPagos = r.filter(e => e.status == '1');
        } if (this.toogleTabla == 'cobro') {
          this.allCobros = r.filter(e => e.status == '0');
        }
      }  else {
        if (this.toogleTabla == 'todo') {
          this.allData = arr;
        } if (this.toogleTabla == 'pago' || this.toogleTabla == 'pagoMod') {
          this.allPagos = arr.filter(e => e.status == '1');
        } if (this.toogleTabla == 'cobro') {
          this.allCobros = arr.filter(e => e.status == '0');
        }
      }
    }
  }


/* ---------------------------METODOS V EN USO_-------------------------- */
/* ********************************************************************** */
/* ----------------------------METODOS VIEJOS---------------------------- */

  /**GET de todos lo datos => botonera superior  */
  filtrarFecha(v: string, f: string | number) {
    this.spinner = true;
    this.vari = v;
    this.resetInputs();
    this.dataPagos = [];
    this.toogleTabla = 'pagoMod';
    this.tooglePop = false;
    let ww: RespPago;
    this.dataItemPop = ww;
    let payload = {
      fecha_inicio: '',
      fecha_final: ''
    }
    this.dropDown1 = 'list-unstyled collapse show';
    this.dropDown2 = 'list-unstyled collapse';
    this.dropDown3 = 'list-unstyled collapse';

    switch (v) {
      case 'hoy':
        this.getHoyNuevo();
        this.filtroAct = 'Hoy';
        this.spinner = false;
        break;
      case 'man':
        this.filtroAct = 'Mañana';
        payload.fecha_inicio = this.functC.getTomorrow().slice(0, 10);
        payload.fecha_final = this.functC.getTomorrow().slice(0, 10);
        this.getFechaNuevo(payload);
        break;
      case 'year':
        this.filtroAct = ` Año :${f}`;
        payload.fecha_inicio = `${f}-01-01`;
        payload.fecha_final = `${f}-12-31`;
        this.getFechaNuevo(payload);
        break;
      case 'mes':
        let year = this.functC.hoy.getFullYear();
        this.filtroAct = ` Mes ${this.months[f]}`;
        payload.fecha_inicio = `${year}-${f}-01`;
        payload.fecha_final = `${year}-${f}-31`;
        this.getFechaNuevo(payload);
        break;
      case 'rango':
        this.filtroAct = `${this.diaInicio} -> ${this.diaFin}`;
        payload.fecha_inicio = `${this.diaInicio}`;
        payload.fecha_final = `${this.diaFin}`;
        this.getFechaNuevo(payload);
        break;
      case 'diax':
        this.filtroAct = `${this.diaEspecifico}`;
        payload.fecha_inicio = `${this.diaEspecifico}`;
        payload.fecha_final = `${this.diaEspecifico}`;
        this.getFechaNuevo(payload);
        break;
    }
  }

  verPop(item: RespPago) {
    this.dataItemPop = item;
    this.verHistorial(String(item.id_cliente));
  }
  /**Setea los datos para el filtro de colores */
  toogleFiltroColores(n: number) {
    this.opcionVer = n;
    this.filtroColor(this.dataPagos);
  }

  /**Trae los datos del cliente para heredarlos */
  verHistorial(id: string | number) {
    id = String(id)
    this.httpServ.getPago(id).subscribe(
      (resPago: RespPago[]) => {
        this.dataPagoHistorial = [];
        if (resPago) {
          this.dataPagoHistorial = resPago;
        }
      }
    )
  }

  /**Resetea los CheckBox de los filtros de colores */
  private resetInputs(): void {
    this.atrazado = false;
    this.c_rojo = false;
    this.nopago_afecha = false;
    this.nopago_cambiofecha = false;
    this.nopago_nocomunicacion = false;
    this.pago_adela = false;
    this.yapago = false;
    this.yapago_norefleja = false;
  }

  /**Envia los datos para/y habilita el <app-ventana-historial-pagos> */
  addCita(item: RespPago): void {
    this.tooglePop2 = true;
    this.dataItemPop2 = item;
  }

  /**Verifica el nivel del usuario */
  private generarPermiso() {
    const tok = localStorage.getItem('token');
    const Token = this.functC.parseJwt(tok)
    this.id_as_conf = Token.data.id
    if (Token.data.nivel > 1) {
      this.isSupervisor = true
    }
  }

}
