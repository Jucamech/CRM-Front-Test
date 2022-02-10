import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/shared/models/otros.model';
import { RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-monitor-notas',
  templateUrl: './monitor-notas.component.html',
  styleUrls: ['./monitor-notas.component.css']
})
export class MonitorNotasComponent implements OnInit, OnDestroy {
  @Input() citasHoy: Array<RespCitas>;
  @Input() usuariosList2: Array<RespUser>;
  toogle: boolean = false;
  toogle2: boolean = false;

  dataNotaCita = {
    cliente: '',
    estado: '',
    motivo: '',
    fecha: '',
    asignado: '',
    nota: '',
    id: '',
    id_user: '',
    id_asignado: ''
  }
  E$: Subscription;

  constructor(private httpServ: AuthService,
              private funcSer: FuncionesComunesService) { }
  ngOnDestroy(): void {
    this.E$.unsubscribe();
  }

  ngOnInit(): void {
    this.filtrarCitasToReasignar();
    this.E$ = this.funcSer.interval(15000).subscribe(() => {
      this.filtrarCitasToReasignar();
    });

  }

  verNota(obj: RespCitas) {
    this.dataNotaCita.cliente = `${obj.nombres} ${obj.apellidos}`;
    this.dataNotaCita.motivo = obj.motivo;
    this.dataNotaCita.fecha = obj.fechahora;
    this.dataNotaCita.asignado = obj.asignado;
    this.dataNotaCita.nota = obj.notas;
    this.toogle = true;
  }

  cerrartoogle() {
    this.toogle = false;
  }

  filtrarCitasToReasignar() {
    let toReasignar = []
    for (const key in this.citasHoy) {
      const el = this.citasHoy[key];
      if (el.estado == '11') {
        toReasignar.push(el);
      }
    }
    this.citasHoy = toReasignar;
  }

  editarNota(obj) {
    this.dataNotaCita.cliente = `${obj.nombres} ${obj.apellidos}`;
    this.dataNotaCita.motivo = obj.motivo;
    this.dataNotaCita.estado = obj.estado;
    this.dataNotaCita.fecha = obj.fechahora;
    this.dataNotaCita.asignado = obj.asignado;
    this.dataNotaCita.nota = obj.notas;
    this.dataNotaCita.id = obj.id;
    this.dataNotaCita.id_user = obj.id_user;
    this.toogle2 = true;
  }

  editarCita() {
    let data = {
      notas: this.dataNotaCita.nota,
      id_user: this.dataNotaCita.id_user,
      estado: '1'
    }
    this.toogle = true;
    this.httpServ.putCita(this.dataNotaCita.id, data).subscribe(
      res => {
        this.toogle2 = false;
      }
    )
  }

}
