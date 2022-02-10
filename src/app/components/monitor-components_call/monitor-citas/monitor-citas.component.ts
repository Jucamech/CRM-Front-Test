import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/shared/models/otros.model';
import { RespCitas, RespCitasM } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasStackService } from 'src/app/shared/services/citas-stack.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monitor-citas',
  templateUrl: './monitor-citas.component.html',
  styleUrls: ['./monitor-citas.component.css']
})
export class MonitorCitasComponent implements OnInit, OnDestroy {
  @Input() width: number = 34;
  agentes: AgentModel[];

  tabla: string;
  totalCitas: number;
  citas: RespCitas[];
  citasStackAll: RespCitas[];

  citasStackV: RespCitas[];
  citasStackV2: RespCitas[];
  citasStackS: RespCitas[];
  citasStackS2: RespCitas[];
  citasStackC: RespCitas[];
  citasStackC2: RespCitas[];

  citasStackAsV: RespCitas[];
  citasStackAsS: RespCitas[];
  citasStackAsC: RespCitas[];

  citasStackAtV: RespCitas[];
  citasStackAtS: RespCitas[];
  citasStackAtC: RespCitas[];
  E$: Subscription;

  constructor(private citasSer: CitasService,
              private Stack: CitasStackService,
              private Agente: AgentesService,
              private httpSer: AuthService,
              private funcSer: FuncionesComunesService)
  {
    this.tabla = 'all';
  }
  ngOnDestroy(): void {
    this.E$.unsubscribe();
  }

  ngOnInit(): void {
    this.callCitasHoy();
    this.asignandoTodosDep();
    this.E$ = this.funcSer.interval(2000).subscribe(() => {

      this.callCitasHoy();
      this.agentes = this.Agente.usuariosList;
      this.asignandoTodosDep();

    });
  }

  asignandoTodosDep(){

    if (this.citasStackV && this.citasStackV.length > 0 ) {
      this.Stack.asignarCitas('Ventas', this.citasStackV );
    }

    if (this.citasStackS && this.citasStackS.length > 0 ) {
      this.Stack.asignarCitas('SAC', this.citasStackS );
    }
    if (this.citasStackC && this.citasStackC.length > 0 ) {
      this.Stack.asignarCitas('Cobros', this.citasStackC );
    }
  }

  callCitasHoy(){
    this.citasSer.callCitasHoy().then(() => {
      this.getCitas1();
    })
  }

  getCitas1(){
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

  filtraSinAsignar(citas: RespCitas[]){
    let citas0: RespCitas[] = [];
    citas.forEach(c => {

    })
    return citas0
  }

  retornarToStack( it: RespCitasM ){
    it.id_asignado = '0';

    if ( it.estado == '28' ) { it.estado = '25'; }
    else if ( it.estado == '29' ) { it.estado = '26'; }
    else if ( it.estado == '30' ) { it.estado = '27'; }

    it = this.Stack.limpiarDataCita(it);

    Swal.fire({
      title: 'Cita Stock',
      text: `Regresar la cita al Stock`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cerrar',
    }).then((r) => {
      if (r.value) {
        this.Stack.crearCita( it.id, it );
      }
      it.fechahora = '2000-01-01 00:00:00';
      it.id_asignado = '0';
      this.httpSer.putCita(it.id, it).subscribe(r => {
        this.funcSer.log('resps', r );
      });
    });
  }


}
