import { Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStatusAgent, LlamadasResp, RespCalling, RespStatusAgent } from 'src/app/shared/models/otros.model';
import {  RespCitas, RespUser} from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasStackService } from 'src/app/shared/services/citas-stack.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { RESULTADO } from 'src/app/shared/constants/notas';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() modal: boolean;
  is_Vis: boolean = true;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  is_kim: boolean;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  modalCita: boolean;
  citaExport: RespCitas;

  dataClienteCitasD: Array<RespCitas>;//
  dataCitaRetornada: Array<RespCitas>;
  nivel: number;
  dep: string;
  DataCitaH: Array<RespCitas>;
  totalCitas: number;
  //////////////////////////
  id_cli: string;

  E$: Subscription[]= [];
  //citas rapida
  tabla_x: boolean = false;
  id_us: string;
  result_n = RESULTADO;

  extensionEntrante: string;
  idEntrante: any;
  respCalling: RespCalling;

  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];

  hora: Date = new Date();
  mes = this.months[new Date().getMonth()];
  dia = new Date().getDate();

  acceso:boolean;
  is_admin:boolean;


// llamadas
  llamadasHoyClientInjCopia: LlamadasResp[];
  llamadasFiltradas: LlamadasResp[][];
  llamadasFiltradas1: LlamadasResp[][];
  llamadasFiltradas11: LlamadasResp[][];
  llamadasHoyClientInj: LlamadasResp[];
  llamadasHoyClientInjEn: LlamadasResp[];
  llamadasHoyClientInjSal: LlamadasResp[];
  llamadasHoyClientInjPer: LlamadasResp[];
  llamadasHoyClientInjCont: LlamadasResp[];
  llamadasHoyClientInj800: LlamadasResp[];
  llamadasHoyClientInj914: LlamadasResp[];
  llamadasHoyClientInj1001: LlamadasResp[];
  // stack
  citasStackV: RespCitas[];
  citasStackS: RespCitas[];
  citasStackC: RespCitas[];
  citasStackAsV: RespCitas[];
  citasStackAsS: RespCitas[];
  citasStackAsC: RespCitas[];
  citasStackAtV: RespCitas[];
  citasStackAtS: RespCitas[];
  citasStackAtC: RespCitas[];
  citasStackAll: RespCitas[];

  agentes: RespUser[];
  miID: string;
  hoy:string;
  ayer:string;
  data: RespStatusAgent;

  constructor(private httpServ: AuthService,
              private citasServ: CitasService,
              private AgentSer: AgentesService,
              private stalker: RastreadorAgentesService,
              private Stack: CitasStackService,
              private funcSer: FuncionesComunesService,
              private router: Router)
  {
    const jwtP = this.funcSer.parseJwt( localStorage.getItem('token') );
    this.nivel = jwtP.data.nivel;
    this.dep = jwtP.data.nombre_departamento;
    this.miID = localStorage.getItem('id_agente');
    this.is_admin = this.funcSer.generarPermisosAdmin();
    ////////
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.router.routerState.snapshot.url.split('/')[1];
    this.tiempoInicio = new Date().getTime();
    this.hoy = this.funcSer.getHoy().slice(0,10);
    this.ayer = this.funcSer.getYest().slice(0,10);
    this.is_kim = this.funcSer.generarPermisosUnicos('110');
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe());
    } catch (error) {}
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnChanges(ch: SimpleChanges): void {
    if (ch.respCalling && ch.respCalling.currentValue) {
      this.extensionEntrante = this.respCalling.did_local;
    }
  }

  ngOnInit(): void {
    this.notaPendiente();
    this.llamarAgentes();
    // this.generarRegistroStalker();
    //this.getStatus();
    this.httpServ.idC = '';
    this.citasServ.callCitasHoySinF().then((r: RespCitas[]) => {
      this.funcSer.log('Citas', r);
      //en uso
      this.dataClienteCitasD = this.nivel == 3 ? r : this.filtrarMisCitas( r );
      this.totalCitas = this.dataClienteCitasD.length;
    }) ;
    const E1$ = this.httpServ.extLlamada$.subscribe(ext => this.respCalling = ext);
    const E4$ = this.citasServ.Citas$.subscribe((res: RespCitas[]) => {
      // en uso
      this.nuevoGetCitas(res);
      this.dataClienteCitasD = this.nivel == 3 ? res : this.filtrarMisCitas( res );
      this.totalCitas = this.dataClienteCitasD.length;
    });

    const E5$ = this.citasServ.CitasNoAtendidas$.subscribe(res => {
      this.dataCitaRetornada = res;
      this.citasServ.Cita$.emit(null);
    });
    const E$6 = this.funcSer.interval(5000).subscribe(() => {
      this.actTimer();
      //this.actualizarEstadoComponent();
    });
  //  this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    this.E$ = [E1$, E4$, E5$, E$6];
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.miID,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'Home',
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

  filtrarMisCitas( citas: RespCitas[] ): RespCitas[]{
    let citasF: RespCitas[] = [];
    citas.forEach(cita => {
      if (cita.id_asignado ==  this.miID) {
        citasF.push(cita)
      }
    });
    return citasF;
  }

  llamarAgentes(){
    this.AgentSer.callAgentes().then(res => {
      this.agentes = res;
    })
  }

  notaPendiente(){
    let obli = localStorage.getItem('013800ce');
    if (obli && obli.length > 8 ) {
      let id = obli.slice(3, obli.length - 5 );
      this.router.navigateByUrl(`/llamarcliente/${id}`)
    }
  }

  generarPermisos(){
    let is_super = this.Stack.generarPermisos();
    if (!is_super) {
      this.llamarStack();
    }
  }

  llamarStack(){
    let All: RespCitas[] = [];
    this.citasStackV = this.Stack.citasStackV;
    this.citasStackS = this.Stack.citasStackS;
    this.citasStackC = this.Stack.citasStackC;

    this.citasStackAsV = this.Stack.citasStackAsV;
    this.citasStackAsS = this.Stack.citasStackAsS;
    this.citasStackAsC = this.Stack.citasStackAsC;

    this.citasStackAtV = this.Stack.citasStackAtV;
    this.citasStackAtS = this.Stack.citasStackAtS;
    this.citasStackAtC = this.Stack.citasStackAtC;

    this.citasStackAll = All.concat(
      this.citasStackV, this.citasStackS, this.citasStackC, this.citasStackAsV, this.citasStackAsS,
      this.citasStackAsC, this.citasStackAtV, this.citasStackAtS, this.citasStackAtC
    );
  }

  nuevoGetCitas(res: RespCitas[]){
    this.generarPermisos();
    let citasStack: RespCitas[] = [];
      for (const k in res) {
        const el = res[k];
        if (el.estado == '28') {
          citasStack.push(el);
        } else if (el.estado == '29') {
          citasStack.push(el);
        } else if (el.estado == '30') {
          citasStack.push(el);
        }
      this.Stack.aceptandoCitas(citasStack);
    };
  }

  adminItem(item:any){
    this.id_cli = item['id_cliente'];
    this.modal = true;
    let x = { estado: '0' };
    this.httpServ.putCita(item.id, x).subscribe();
  }

  actTimer() {
    this.hora = new Date();
    this.dia = new Date().getDate();
  }

  toCitasUrl() {
    this.router.navigateByUrl('/ventas');
  }

  verCita(id:string, item: RespCitas){
    this.citasServ.citaEnEspera = item;
    localStorage.setItem('2104a1bd', JSON.stringify(item) );
    this.citaExport = item;
    this.modalCita = true;
    this.funcSer.log('cita item', item);
  }

}
