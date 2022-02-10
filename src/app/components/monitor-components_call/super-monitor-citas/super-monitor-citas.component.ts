import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgentModel, RespNotas } from 'src/app/shared/models/otros.model';
import { RespCitasM, RespUser } from 'src/app/shared/models/usuario.model';
import { RastreadorCitasService } from 'src/app/shared/others/hook/rastreador-citas.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { ESTADOS, MOTIVOS } from 'src/app/shared/constants/citas';
import { RESULTADO } from 'src/app/shared/constants/notas';
import { DomSanitizer } from '@angular/platform-browser';
import { NotasService } from 'src/app/shared/services/notas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-monitor-citas',
  templateUrl: './super-monitor-citas.component.html',
  styleUrls: ['./super-monitor-citas.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class SuperMonitorCitasComponent implements OnInit, OnDestroy {
  citas: RespCitasM[] = [];
  agentes: RespUser[];
  notas: RespNotas[] = [];
  E$: Subscription[];
  modal: boolean = false;

  estados_c = ESTADOS;
  motivos_c = MOTIVOS;
  result_n = RESULTADO
  spinner: boolean;
  is_super: boolean;
  is_kim: boolean;
  agenteEXT: AgentModel[];

  id_us: string;
  modal_edit: boolean;
  id_cita: string;
  id_user: string;
  ult_hora: string;

  fecha_cita:string;
  hora_cita:string;
  Hoy: string;
  is_admin: boolean;

  constructor(private rastreador: RastreadorCitasService,
              public sanitizer: DomSanitizer,
              private funcSer: FuncionesComunesService,
              private citaSer : CitasService,
              private router: Router,
              private notaSer: NotasService,
              private AgentSer: AgentesService)
  {
    this.is_super = this.funcSer.generarPermisosN3();
    this.is_admin = this.funcSer.generarPermisosAdmin();
    this.is_kim = this.funcSer.generarPermisosUnicos('110');
    this.Hoy = `${this.funcSer.getFecha()}`;
    this.fecha_cita = `${this.funcSer.getFecha()}`;
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => {
        e.unsubscribe();
      });
    } catch (err) {}
  }

  ngOnInit(): void {
    this.callAgentes();
    this.callAgentExt();
    const E$1 = this.citaSer.Citas$.subscribe( r => {
      let data = []
      r.forEach(c => {
        if (c.id_asignado > '0') {
          data.push(c);
        }
      })
      this.citas = data;
    });
    const E$2 = this.notaSer.dataNotasE$.subscribe( r => this.notas = r );
    this.E$ = [E$1, E$2];
  }

  callAgentes(){
    this.AgentSer.callAgentes().then( agt => {
      this.agentes = agt;
    }).then(() => {
      let data = []
      this.rastreador.citasHoy().then( res => {
        res.forEach(c => {
          if (c.id_asignado > '0') {
            data.push(c);
          }
        })
        this.citas = data;
      });
    });
  }

  callAgentExt(){
    this.AgentSer.getUsersPhone().then(res => {
      this.agenteEXT = res;
    })
  }

  abrirOpc(item: RespCitasM){
    this.modal = true;
    this.notaSer.getNotasC(item.id_cliente);
  }

  editor(id: string){
    this.modal_edit = true;
    this.id_cita = id;
  }

  cerraM(){
    this.modal_edit = false;
    this.hora_cita = null;
    this.id_us = null;
    this.id_cita = null;
    this.ult_hora = null;
  }

  modCita(){
    if (this.id_cita && this.id_us) {
      this.citaSer.editarCita(this.id_cita,{id_asignado: this.id_us}).then(() => {
        this.funcSer.showToast('Citas Reasignada!', 'Ok!', 1500);
        this.citaSer.callCitasHoySinF();
      });
      this.cerraM();
    } else {
      this.funcSer.showSweetError('Error!', 'Falta el Agente', 2000);
    }
  }

  verCliente(id: string){
    const url = this.router.createUrlTree(['/vercliente/',id]);
    window.open(url.toString(), '_blank');
  }

  buscador(id_user: string){
    this.id_user = id_user;
  }

  CambiarHora(id: string, hora: string){
    this.id_cita = id;
    this.ult_hora = hora;
    this.modal_edit = true;
  }

  MoDHoraCita(){
    if (this.Hoy <= this.fecha_cita || this.is_super) {
      if (this.hora_cita) {
        const nuevaFecha = `${this.fecha_cita} ${this.hora_cita}`;
        this.citaSer.editarCita(this.id_cita,{fechahora: nuevaFecha})
        .then(() => {
          this.funcSer.showToast('Citas Modificada!', 'Ok!', 1500);
          this.fecha_cita = this.Hoy;
          this.citaSer.callCitasHoySinF();
          this.cerraM();
        });
      } else {this.funcSer.showToast('Falta la Hora', 'ERROR!', 4000, 0);}
    } else {
      this.funcSer.showToast('Fecha no Valida', 'ERROR!', 4000, 0);
    }
  }

}
