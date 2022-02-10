import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LlamadasResp } from 'src/app/shared/models/otros.model';
import { ClienteModelGen, RespUser } from 'src/app/shared/models/usuario.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoComponent implements OnInit, OnDestroy {
  id: string;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  agentes: RespUser[];
  agente: string;
  tiempo: string;
  llamadas: LlamadasResp[];

  llamadasAgente: LlamadasResp[];
  llamadasAgenteCop: LlamadasResp[];
  llamadasAgenteEnt: LlamadasResp[];
  llamadasAgenteSal: LlamadasResp[];
  llamadasAgente800: LlamadasResp[];
  llamadasAgente914: LlamadasResp[];

  clientes: ClienteModelGen[];
  opcionVer: Number;
  filtro:boolean = false;

  constructor(private agenteSer: AgentesService,
              private httpSer: AuthService,
              private callSer: LlamadasPerdidasService,
              private funcSer: FuncionesComunesService,
              private activateRoute: ActivatedRoute,
              private stalker: RastreadorAgentesService,)
  {
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.activateRoute.snapshot.url[0].path;
    this.tiempoInicio = new Date().getTime();
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (error) {}
    //this.stalker.insertDataComponent(false, this.status,this.url, this.key_c, this.tiempoInicio);
  }

  ngOnInit(): void {
    this.getAllClientes();
    //this.getStatus();
    if (!this.llamadas) {
      this.callSer.getPerdidasHoy();
    }
    const E1$ = this.callSer.llamadasCDR$.subscribe( res => {
      this.llamadas = res;
    });
    this.agenteSer.callAgentes().then((res: RespUser[]) => {
      this.agentes = res;
    });
    const E$2 = this.funcSer.interval(5000).subscribe(() => {
      //this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    })
    //this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    this.E$ = [E1$, E$2];
  }

  getAllClientes() {
    this.clientes = [];
    this.httpSer.getClientes().subscribe(
      (res: ClienteModelGen[]) => {
        for (const clave in res) {
          this.clientes.push(res[clave]);
        }
      }
    );
  }

  checkActivity(){
/*     if (document.hidden){
      this.is_Vis = false;
      this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    }else {
      this.is_Vis = true;
      this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    } */
  }

/*   getStatus(){
    let coll = this.stalker.generarCollUser(this.id);
    const E$3 =this.stalker.getStatus(coll).subscribe((snap) => {
      snap.forEach((stat:any) => {
        if (stat.payload.doc.data().key_login == this.key_L) {
          this.status = ({
            id : stat.payload.doc.id,
            data : stat.payload.doc.data()
          });
        }
      })
    });
    //this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    this.E$.push(E$3);
  }
 */
  filtrar(str: string){
    if (str == 'Todas') {
      if (this.filtro){
        this.opcionVer = 1;
        this.llamadasAgente = this.llamadasAgenteCop;
        this.tiempo = this.tiempoLlamado(this.llamadasAgente);
      }

    } else if ( str == 'Entrantes') {
      if (this.filtro){
        this.opcionVer = 2;
        this.llamadasAgente = this.llamadasAgenteEnt;
        this.tiempo = this.tiempoLlamado(this.llamadasAgente);
      }
    } else if ( str == 'Salientes' ){
      if (this.filtro){
        this.opcionVer = 3;
        this.llamadasAgente = this.llamadasAgenteSal;
        this.tiempo = this.tiempoLlamado(this.llamadasAgente);

      }
    }

  }

  filtrarLlamadas(){
    this.llamadasAgente = this.callSer.filtarAgente(this.llamadas, this.agente );
    this.llamadasAgenteCop = this.llamadasAgente;
    let llam = this.callSer.filtrarLLamadas( this.llamadasAgente );
    this.llamadasAgenteEnt = llam[1];
    let llamEf = this.callSer.filtrar800( this.llamadasAgenteEnt )
    this.llamadasAgenteSal = llam[0];
    this.llamadasAgente800 = llamEf[0];
    this.llamadasAgente914 = llamEf[1];
    this.tiempo = this.tiempoLlamado(this.llamadasAgente);
    this.filtro = true;
  }

  tiempoLlamado(llamadas: LlamadasResp[]){
    let tiempo = 0;
    llamadas.forEach(e => {
      tiempo = tiempo + Number(e.duracion)
    });
    return String(tiempo);
  }

}
