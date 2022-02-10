import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgentModel, DataStatusAgent, FechasLlamadas, LlamadasResp, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { ClienteModelGen, RespUser } from 'src/app/shared/models/usuario.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientesService, RespTelCli } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';

export interface Did {
  did: string;
  estado: string;
  telefono: string;
}

export interface AreaC {
  code: string;
  estado: string;
  cuidad: string;
}

enum MenuLat {
  TODAS, ENT, SAL, PER, CONT, EFEC, NO_EF, Z800, Z914, Z1001, CLI, CLI_NN, DESC
}

@Component({
  selector: 'app-llamadas-sac',
  templateUrl: './llamadas-sac.component.html',
  styleUrls: ['./llamadas-sac.component.css']
})
export class LlamadasSacComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  @Input() modal: boolean;
  @Input() opc: number;
  id: string;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  data: RespStatusAgent;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }

  is_admin:boolean;
  menu_l = MenuLat;

  llamadaWWW: LlamadasResp[][];
  llamadaW2: LlamadasResp[][];
  llamadaW3: LlamadasResp[][];
  //array iterables
  llamadas: LlamadasResp[];
  llamadasAyer: LlamadasResp[];
  llamadasFecha: LlamadasResp[];

  //llamadas de hoy
  llamadasHoy: LlamadasResp[];
  llamadasHoyEn: LlamadasResp[];
  llamadasHoySal: LlamadasResp[];
  llamadasHoyPer: LlamadasResp[];
  llamadasHoyCont: LlamadasResp[];
  llamadasHoy800: LlamadasResp[];
  llamadasHoy914: LlamadasResp[];
  llamadasHoy101: LlamadasResp[];
  llamadasHoyEfec: LlamadasResp[];
  llamadasHoyNoEf: LlamadasResp[];
  llamadasHoyNN: LlamadasResp[];
  llamadasHoyVir: LlamadasResp[];

  //llamadas de ayer
  llamadasAyerTodas: LlamadasResp[];
  llamadasAyerSal: LlamadasResp[];
  llamadasAyerEnt: LlamadasResp[];
  llamadasAyerPer: LlamadasResp[];
  llamadasAyerCont: LlamadasResp[];
  llamadasAyer800: LlamadasResp[];
  llamadasAyer914: LlamadasResp[];
  llamadasAyer101: LlamadasResp[];
  llamadasAyerEfec: LlamadasResp[];
  llamadasAyerNoEf: LlamadasResp[];
  llamadasAyerNN: LlamadasResp[];
  llamadasAyerVir: LlamadasResp[];

  //llamadaspor fecha
  llamadasFechaTodas: LlamadasResp[];
  llamadasFechaSal: LlamadasResp[];
  llamadasFechaPer: LlamadasResp[];
  llamadasFechaCont: LlamadasResp[];
  llamadasFechaEnt: LlamadasResp[];
  llamadasFecha800: LlamadasResp[];
  llamadasFecha914: LlamadasResp[];
  llamadasFecha101: LlamadasResp[];
  llamadasFechaEfec: LlamadasResp[];
  llamadasFechaNoEf: LlamadasResp[];
  llamadasFechaNN: LlamadasResp[];
  llamadasFechaVir: LlamadasResp[];

  //
  llamadasFiltradas1: Array<LlamadasResp[]>//hoy
  llamadasFiltradas11: Array<LlamadasResp[]>//hoy las 800 y 914
  llamadasFiltradas111 : Array<LlamadasResp[]>//hoy perdidas y contes
  llamadasFiltradas110 : Array<LlamadasResp[]>//hoy efectivas y no efect
  llamadasFiltradas2: Array<LlamadasResp[]>//ayer
  llamadasFiltradas22: Array<LlamadasResp[]>//ayer las 800 y 914
  llamadasFiltradas220: Array<LlamadasResp[]>//ayer las 800 y 914
  llamadasFiltradas222: Array<LlamadasResp[]>//ayer perdidas y contes
  llamadasFiltradas3: Array<LlamadasResp[]>//fecha
  llamadasFiltradas33: Array<LlamadasResp[]>//fecha las 800 y 914
  llamadasFiltradas330: Array<LlamadasResp[]>//fecha las 800 y 914
  llamadasFiltradas333: Array<LlamadasResp[]>//fecha perdidas y contes

  clientes: ClienteModelGen[];
  ids: string[];
  totalLLamadas: number = 0;

  filtroAct: string = 'Hoy';
  opcionVer: Number;
  page: number = 0;
  selectFilt: string = '';
  selectFiltDid: string = '';
  search: string = '';

  did_json: Did[];
  did_copia: Did[];
  area_c: AreaC[];
  area_copia: AreaC[];

  toogleTabla: string = 'llamadas';
  yearAct: number;
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

  agentes: AgentModel[];
  orden: string;
  id_cli: string;
  id_us: any;
  /* ------------------ */
  resulDid: string;
  tel: string;
  respID: RespTelCli[];


  constructor(private funcSer: FuncionesComunesService,
              private callSer: LlamadasPerdidasService,
              private httpSer: AuthService,
              private ClientSer: ClientesService,
              private activateRoute: ActivatedRoute,
              private stalker: RastreadorAgentesService,
              private AgentSer: AgentesService)
  {
    this.yearAct = funcSer.hoy.getFullYear();
    this.is_admin = funcSer.generarPermisos();
    ///////////////////////////
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.activateRoute.snapshot.url[0].path;
    this.tiempoInicio = new Date().getTime();
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe());
    } catch (err) { }
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    this.getDid_areaCode();
    this.callSer.getPerdidasHoy();
    this.callUser();
    // this.generarRegistroStalker();
    this.getClientes();
    const E$2 = this.AgentSer.agentes$.subscribe(r => this.callUser() );
    const E1$ = this.callSer.llamadasCDR$.subscribe( res => {
      this.llamadasHoy = res;
      this.llamadas = res;

      this.llamadasFiltradas1 = this.callSer.filtrarLLamadas(res);
      this.llamadasHoyEn = this.llamadasFiltradas1[1];
      this.llamadasHoySal = this.llamadasFiltradas1[0];

      this.llamadasFiltradas11 = this.callSer.filtrar800(this.llamadasHoyEn);
      this.llamadasHoy800 = this.llamadasFiltradas11[0];
      this.llamadasHoy914 = this.llamadasFiltradas11[1];
      this.llamadasHoy101 = this.llamadasFiltradas11[2];

      this.llamadasFiltradas110 = this.callSer.filtrarEfectivas(this.llamadasHoySal);
      this.llamadasHoyEfec = this.llamadasFiltradas110[0];
      this.llamadasHoyNoEf = this.llamadasFiltradas110[1];

      this.llamadasFiltradas111 = this.callSer.filtrarPerdidas(this.llamadasHoyEn);
      this.llamadasHoyPer = this.llamadasFiltradas111[0];
      this.llamadasHoyCont = this.llamadasFiltradas111[1];

      this.totalLLamadas? this.totalLLamadas = this.llamadas.length: this.totalLLamadas = 0;
      if (!this.llamadas) {
        this.getLlamadasHoy();
      }
    });
    const E$3 = this.funcSer.interval(30000).subscribe(() => {
      if (!this.opcionVer || this.opcionVer == this.menu_l.TODAS) {
        this.refresh();
      }
    })
    const E$4 = this.funcSer.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    });
    this.E$ = [E1$, E$2, E$3, E$4 ];
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.id,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'LLamadas SAC',
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
    this.data.hora_final = `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}`
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

  getClientes(){
    this.ClientSer.callclientes().then(res => {
      this.clientes = res;
    });
  }

  getCliTel(){
    this.ClientSer.getIdCliente(this.tel).then(r => {
      this.respID = r;
    });
  }

  callUser(){
    this.AgentSer.getUsersPhone().then(
      res => {
        this.agentes = res;
      });
  }

  getID(ids: string[]){
    this.ids = ids;
  }

  getDid_areaCode(){
    this.httpSer.getJsonDid('assets/areacode.json').subscribe(
      (re) =>{
        this.area_copia = re['estados_code'];
      }
    );
    this.httpSer.getJsonDid('assets/dids.json').subscribe(
      (r) =>{
        this.did_copia = r['DID'];
      }
    );
  }

  scrollToBottom(): void {
    try {
      this.content.nativeElement.scrollTop = 0;
    } catch(err) {}
  }

  /**
   * @returns [ nn, des, clnt ]
   */
  filtrarNN(){
    let llamadasF:LlamadasResp[][] = [];
    if (this.filtroAct == 'Hoy') {
      llamadasF = this.callSer.seuFiltroDesc(this.llamadasHoy);
    }else if ( this.filtroAct == 'Ayer' ){
      llamadasF = this.callSer.seuFiltroDesc(this.llamadasAyerTodas);
    }else if ( this.filtroAct.length > 4 ){
      llamadasF = this.callSer.seuFiltroDesc(this.llamadasFechaTodas);
    }
    return llamadasF;
  }

  filtar(str: string){
    if (this.filtroAct == 'Hoy') {
      if (str == 'Todas') {
        this.opcionVer = this.menu_l.TODAS;
        this.llamadas = this.llamadasHoy;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Entrantes') {
        this.opcionVer = this.menu_l.ENT;
        this.llamadas = this.llamadasHoyEn;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Salientes' ){
        this.opcionVer = this.menu_l.SAL;
        this.llamadas = this.llamadasHoySal;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Contestadas' ){
        this.opcionVer = this.menu_l.CONT;
        this.llamadas = this.llamadasHoyCont;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Perdidas' ){
        this.opcionVer = this.menu_l.PER;
        this.llamadas = this.llamadasHoyPer;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == '800' ){
        this.opcionVer = this.menu_l.Z800;
        this.llamadas = this.llamadasHoy800;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == '914' ){
        this.opcionVer = this.menu_l.Z914;
        this.llamadas = this.llamadasHoy914;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == '101' ){
        this.opcionVer = this.menu_l.Z1001;
        this.llamadas = this.llamadasHoy101;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Efectivas' ){
        this.opcionVer = this.menu_l.EFEC;
        this.llamadas = this.llamadasHoyEfec;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'No Efectivas' ){
        this.opcionVer = this.menu_l.NO_EF;
        this.llamadas = this.llamadasHoyNoEf;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Virgenes' ){
        this.opcionVer = this.menu_l.DESC;
        this.llamadas = this.llamadasHoyVir;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Clientes NN' ){
        this.opcionVer = this.menu_l.CLI_NN;
        if (!this.llamadaWWW) {
          this.llamadaWWW = this.filtrarNN();
        }
        this.llamadas = this.llamadaWWW[0];
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Clientes' ){
        this.opcionVer = this.menu_l.CLI;
        if (!this.llamadaWWW) {
          this.llamadaWWW = this.filtrarNN();
        }
        this.llamadas = this.llamadaWWW[2];
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      }
    }

    if (this.filtroAct == 'Ayer') {
      if (str == 'Todas') {
        this.opcionVer = this.menu_l.TODAS;
        this.llamadasAyer = this.llamadasAyerTodas;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == 'Entrantes') {
        this.opcionVer = this.menu_l.ENT;
        this.llamadasAyer = this.llamadasAyerEnt;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == 'Salientes' ){
        this.opcionVer = this.menu_l.SAL;
        this.llamadasAyer = this.llamadasAyerSal;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == 'Perdidas' ){
        this.opcionVer = this.menu_l.PER;
        this.llamadasAyer = this.llamadasAyerPer;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == '800' ){
        this.opcionVer = this.menu_l.Z800;
        this.llamadasAyer = this.llamadasAyer800;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == '914' ){
        this.opcionVer = this.menu_l.Z914;
        this.llamadasAyer = this.llamadasAyer914;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == 'Contestadas' ){
        this.opcionVer = this.menu_l.CONT;
        this.llamadasAyer = this.llamadasAyerCont;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == '101' ){
        this.opcionVer = this.menu_l.Z1001;
        this.llamadasAyer = this.llamadasAyer101;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == 'Efectivas' ){
        this.opcionVer = this.menu_l.EFEC;
        this.llamadasAyer = this.llamadasAyerEfec;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'No Efectivas' ){
        this.opcionVer = this.menu_l.NO_EF;
        this.llamadasAyer = this.llamadasAyerNoEf;
        this.totalLLamadas = this.llamadas.length;
        this.page = 0;
      } else if ( str == 'Virgenes' ){
        this.opcionVer = this.menu_l.DESC;
        this.llamadasAyer = this.llamadasAyerVir;
        this.totalLLamadas = this.llamadasAyer.length;
        this.page = 0;
      } else if ( str == 'Clientes NN' ){
        if (!this.llamadaW2){
          this.llamadaW2 = this.filtrarNN();
        }
        this.opcionVer = this.menu_l.CLI_NN;
        this.llamadasAyer = this.llamadaW2[0];
        this.page = 0;
        this.totalLLamadas = this.llamadasAyer.length;
      } else if ( str == 'Clientes' ){
        if (!this.llamadaW2) {
          this.llamadaW2 = this.filtrarNN();
        }
        this.opcionVer = this.menu_l.CLI;
        this.llamadasAyer = this.llamadaW2[2];
        this.page = 0;
        this.totalLLamadas = this.llamadasAyer.length;
      }
    }

    if (this.filtroAct.length > 4 ) {
      if (str == 'Todas') {
        this.opcionVer = this.menu_l.TODAS;
        this.llamadasFecha = this.llamadasFechaTodas;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Entrantes') {
        this.opcionVer = this.menu_l.ENT;
        this.llamadasFecha = this.llamadasFechaEnt;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Salientes' ){
        this.opcionVer = this.menu_l.SAL;
        this.llamadasFecha = this.llamadasFechaSal;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Perdidas' ){
        this.opcionVer = this.menu_l.SAL;
        this.llamadasFecha = this.llamadasFechaPer;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == '800' ){
        this.opcionVer = this.menu_l.Z800;
        this.llamadasFecha = this.llamadasFecha800;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == '914' ){
        this.opcionVer = this.menu_l.Z914;
        this.llamadasFecha = this.llamadasFecha914;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Contestadas' ){
        this.opcionVer = this.menu_l.CONT;
        this.llamadasFecha = this.llamadasFechaCont;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == '101' ){
        this.opcionVer = this.menu_l.Z1001;
        this.llamadasFecha = this.llamadasFecha101;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Efectivas' ){
        this.opcionVer = this.menu_l.EFEC;
        this.llamadasFecha = this.llamadasFechaEfec;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'No Efectivas' ){
        this.opcionVer = this.menu_l.CLI_NN;
        this.llamadasFecha = this.llamadasFechaNoEf;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Virgenes' ){
        this.opcionVer = this.menu_l.DESC;
        this.llamadasFecha = this.llamadasFechaVir;
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Clientes NN' ){
        this.opcionVer = this.menu_l.CLI_NN;
        this.llamadaW3 = this.filtrarNN();
        this.llamadasFecha = this.llamadaW3[0];
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      } else if ( str == 'Clientes' ){
        this.opcionVer = this.menu_l.CLI;
        this.llamadaW3 = this.filtrarNN();
        this.llamadasFecha = this.llamadaW3[2];
        this.totalLLamadas = this.llamadasFecha.length;
        this.page = 0;
      }
    }
  }

  refresh(){
    this.callSer.refrescarLlamadas();
  }

  buscador(str: string){
    this.search = str;
  }

  buscadorDid(str : string){
    this.resulDid = str;
    let didX :Did[] = [];
    this.did_copia.forEach(el => {
      if (this.selectFiltDid == 'telefono') {
        if (el.telefono.includes(str.toLowerCase())) {
          didX.push(el)
        }
      } else {
        if (el.did.includes(str.toLowerCase())) {
          didX.push(el)
        }
      }
    });
    this.did_json = didX;
  }

  buscadorAreaCode(str : string){
    let XD: AreaC[] = [];
    this.area_copia.forEach(el => {
      if (str == el.code) {
        XD.push(el)
      }
    });
    this.area_c = XD;
  }

  nextP(){
    this.page += 50;
    this.scrollToBottom();
  }
  prevP(){
    if (this.page > 0) this.page -= 50;
    this.scrollToBottom();
  }

  getLlamadasHoy(){
    if (!this.llamadas) {
      this.callSer.getPerdidasHoy();
    }
  }

  getLlamadasAyer(){
    this.callSer.getLlamadasAyer().then((res: LlamadasResp[]) => {
      this.llamadasFiltradas2 = this.callSer.filtrarLLamadas(res);
      this.llamadasAyer = res;
      this.totalLLamadas = this.llamadasAyer.length;
      this.llamadasAyerTodas = res;
      this.llamadasAyerEnt = this.llamadasFiltradas2[1];
      this.llamadasFiltradas22 = this.callSer.filtrar800(this.llamadasAyerEnt);


      this.llamadasFiltradas222 = this.callSer.filtrarPerdidas(this.llamadasAyerEnt);
      this.llamadasAyerPer = this.llamadasFiltradas222[0];
      this.llamadasAyerCont = this.llamadasFiltradas222[1];
      this.llamadasAyerSal = this.llamadasFiltradas2[0];

      this.llamadasFiltradas220 = this.callSer.filtrarEfectivas(this.llamadasAyerSal);
      this.llamadasAyerEfec = this.llamadasFiltradas220[0];
      this.llamadasAyerNoEf = this.llamadasFiltradas220[1];


      this.llamadasAyer800 = this.llamadasFiltradas22[0];
      this.llamadasAyer914 = this.llamadasFiltradas22[1];
      this.llamadasAyer101 = this.llamadasFiltradas22[2];
    });
  }

  getLlamadasFecha(fechas: FechasLlamadas){
    this.callSer.getLlamadasFecha(fechas).then((res: LlamadasResp[]) => {
      this.llamadasFiltradas3 = this.callSer.filtrarLLamadas(res);
      this.llamadasFecha = res;
      this.totalLLamadas = this.llamadasFecha.length;
      this.llamadasFechaTodas = res;
      this.llamadasFechaEnt = this.llamadasFiltradas3[1];
      this.llamadasFiltradas33 = this.callSer.filtrar800(this.llamadasFechaEnt);
      this.llamadasFiltradas333 = this.callSer.filtrarPerdidas(this.llamadasFechaEnt);
      this.llamadasFechaPer = this.llamadasFiltradas333[0];
      this.llamadasFechaCont = this.llamadasFiltradas333[1];
      this.llamadasFechaSal = this.llamadasFiltradas3[0];

      this.llamadasFiltradas330 = this.callSer.filtrarEfectivas(this.llamadasFechaSal);
      this.llamadasFechaEfec = this.llamadasFiltradas330[0];
      this.llamadasFechaNoEf = this.llamadasFiltradas330[1];

      this.llamadasFecha800 = this.llamadasFiltradas33[0];
      this.llamadasFecha914 = this.llamadasFiltradas33[1];
      this.llamadasFecha101 = this.llamadasFiltradas33[2];
    })
  }

  getAllClientes() {
    this.clientes = [];
    this.httpSer.getClientes().subscribe(

      (res: ClienteModelGen[]) => {
        this.clientes = [];
        for (const clave in res) {
          const el = res[clave];
          if (!el.nombres ) {
            el.nombres = 'llamada';
            el.apellidos = 'perdida';
          }
          this.clientes.push(el);
        }
      }
    );
  }

  asc(){
    this.orden = 'Asc';
  }
  des(){
    this.orden = 'Des';
  }
  resetAsDes(){
    this.orden = '';
  }
  timeInvet(){
    if (this.orden == '') {
      this.orden = 'Inv';
    } else if (this.orden = 'Inv'){
      this.orden = '';
    }
  }

  abrirModal(id: string){
    this.id_cli = id;
    this.modal = true;
  }

  buscarCoinci(str: string):boolean{
    let xd: any[] = [];
    if (str.length == 7) {
      this.clientes.forEach(e => {
        if ( e.telmovil == str ) {
          xd.push( `${e.id} `);
        } else if ( e.telcasa == str ) {
          xd.push( `${e.id} `);
        } else if ( e.teltrabajo == str ) {
          xd.push( `${e.id} `);
        } else if ( e.telotro == str ) {
          xd.push( `${e.id} `);
        }
      });
      if (xd && xd[1]) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }


  filtrarFecha(v: string, f: string | number){
    let dates: FechasLlamadas = {
      inicio : '',
      fin: ''
    }
    this.page = 0;
    switch (v) {
      case 'hoy':
        this.llamadas = this.llamadasHoy;
        this.filtroAct = 'Hoy';
        break;
      case 'ayer':

        this.getLlamadasAyer();

        this.filtroAct = 'Ayer';
        break;
      case 'rango':
        this.filtroAct = `De: ${this.diaInicio} / A: ${this.diaFin}`;
        dates.inicio =  `${this.diaInicio} 00:00:01`;
        dates.fin =  `${this.diaFin} 23:59:59`;
        this.getLlamadasFecha(dates);
        break;
      case 'diax':
        this.filtroAct = `Día: ${this.diaEspecifico}`;
        dates.inicio = `${this.diaEspecifico} 00:00:01`;
        dates.fin = `${this.diaEspecifico} 23:59:59`;
        this.getLlamadasFecha(dates);
        break;
    }
  }

  /* ********************** SEUDO FUNCIONES ***************************** */


}
