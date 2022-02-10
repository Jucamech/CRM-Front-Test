import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgentModel, FechasPostParam, LLamadaAgente, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { RespUser } from 'src/app/shared/models/usuario.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-super-monitor-agentes',
  templateUrl: './super-monitor-agentes.component.html',
  styleUrls: ['./super-monitor-agentes.component.css']
})
export class SuperMonitorAgentesComponent implements OnInit {
  agentes: AgentModel[];
  fecha: string;
  hora: string;
  hoyS: string;
  usuariosList2: RespUser[];
  dataStalker:RespStatusAgent[];
  txt: string = 'Selecciona un Agente';
  E$timer:Subscription;
  opc: string;
  t_final: string;
  t_ini: string;
  date: string;
  inp: string = '';
  bloq: boolean;
  last_id: string;
  datCall: LLamadaAgente;
  index: number;

  constructor(private Stalker: RastreadorAgentesService,
              private funcSer: FuncionesComunesService,
              private AgentSer: AgentesService)
  {
    this.fecha = this.funcSer.getFecha();
  }

  ngOnInit(): void {
    this.getAgentes();
  }

  getAgentes() {
    this.usuariosList2 = []
    this.AgentSer.callAgentes().then(
      res => {
        this.usuariosList2 = res;
      }
    );
  }

  getDataAgentes(id_u:number, ind: number ){
    this.index = ind;
    if (this.E$timer) {
      this.E$timer.unsubscribe();
    }
    let id = String(id_u);
    let data: FechasPostParam = {
      fecha_inicio: `${this.fecha} 00:00:00`,
      fecha_final: `${this.fecha} 23:59:59`,
      params: ''
    }
    this.txt = 'Todo Hoy';
    this.Stalker.getDataStalker(id, data).then(res => {
      this.dataStalker = res;
      this.bloq = false;
    }).catch(() => {
      this.funcSer.showToast('No hay Datos del Agente', 'Error', 1700, 0);
      this.dataStalker = null;
      this.E$timer.unsubscribe();
    });
    this.E$timer = this.funcSer.interval(3000).subscribe(() => {
      if (!this.bloq) {
        this.Stalker.getDataStalker(id, data).then(res => {
          this.dataStalker = res;
        }).catch(() => {
          this.E$timer.unsubscribe();
        });
      }
    });
  }

  verDataLlamada(dataCall: LLamadaAgente ){
    this.datCall = dataCall;
  }

  buscar(){
    this.bloq = true;
    let t = ''
    let id = this.dataStalker[0].id_user;
    let data: FechasPostParam = {
      fecha_inicio: `${this.fecha} 00:00:00`,
      fecha_final: `${this.fecha} 23:59:59`,
      params: this.opc,
      val: this.inp
    }
    switch (this.opc) {
      case 'horas':
        if (this.t_final && this.t_ini) {
          data.fecha_inicio =  `${this.fecha} ${this.t_ini}`;
          data.fecha_final = `${this.fecha} ${this.t_final}`;
          t = `Hoy - ${this.t_ini} a ${this.t_final}`;
        } else {
          this.funcSer.showSweetError('!Error', 'falatan Campos', 1600);
        }
        break;
      case 'fecha':
        if (this.t_final && this.t_ini && this.date) {
          data.fecha_inicio =  `${this.date} ${this.t_ini}`;
          data.fecha_final = `${this.date} ${this.t_final}`;
          t = `${this.date} - ${this.t_ini} a ${this.t_final}`;
        }  else {
          this.funcSer.showSweetError('!Error', 'falatan Campos', 1600);
        }
        break;
    }
    this.Stalker.getDataStalker(id, data).then(res => {
      this.dataStalker = res;
      if (t.length > 10) { this.txt = t }
    });
  }

}
