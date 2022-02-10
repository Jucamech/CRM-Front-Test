import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/shared/models/otros.model';
import { RespCitasM } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasStackService } from 'src/app/shared/services/citas-stack.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-lista-agentes',
  templateUrl: './modal-lista-agentes.component.html',
  styleUrls: ['./modal-lista-agentes.component.css']
})
export class ModalListaAgentesComponent implements OnInit, OnDestroy {
  @Output() enviarModal = new EventEmitter<boolean>();
  @Input() modal: boolean;
  @Input() id_cli: string;
  agentes:  AgentModel[] = [];
  id_us:string;
  E$1: Subscription;
  is_admin:boolean;

  estado_cita: string;
  motivo: string;
  is_kim: boolean;

  constructor(private Agent: AgentesService,
              private citaSer: CitasService,
              private Stack: CitasStackService,
              private funcSer: FuncionesComunesService,
              private httpSer: AuthService)
  {
    this.is_admin = this.funcSer.generarPermisosN2();
    this.is_kim = this.funcSer.generarPermisosUnicos('110')
  }

  ngOnDestroy(): void {
    this.E$1.unsubscribe();
  }

  ngOnInit(): void {
    this.E$1 = this.Agent.agentesCall$.subscribe(r => {
      this.agentes = r;
    });
    this.citaSer.callCitasHoy();
  }

  cerrarModal(){
    this.motivo = null;
    this.estado_cita = null;
    this.enviarModal.emit(false);
  }

  enviarCitaToStack(){
    if ( this.id_cli ){
      let id = this.id_cli;
      let cita: RespCitasM = {
        campos_adicionales: null,
        id_user: id,
        fechahora: `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}`,
        motivo: this.estado_cita == '25' ? '8' : '9',
        notas: `Cita en Stack`,
        estado: this.estado_cita,
        id_asignado: '0',
      }
      Swal.fire({
        title: 'Cita Stack',
        text: `Confirmar Envio de Cita!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK!',
        cancelButtonText: 'Cancelar',
      }).then((r) => {
        if ( r && r.value ) {
          this.Stack.EmitCreate$.subscribe(r => {
            if ( r && r.ok) {
              this.cerrarModal();
            }
          })
          this.Stack.crearCita(id, cita);
        }
      });
    }
  }

  generarCitaInmedita(){
    if (this.id_us && this.id_cli) {
      let id = this.id_cli;
      let asing = this.id_us
      let cita = {
        campos_adicionales: [],
        id_cliente: id,
        fechahora: `${this.funcSer.getFecha()} ${this.funcSer.getHora()}`,
        motivo: this.motivo ? this.motivo: '8',
        notas: `From :${localStorage.getItem('nombre')}`,
        estado: '17',
        id_asignado: asing
      }
      this.httpSer.postCita(id, cita).subscribe(res => {
        this.id_cli = '';
        this.id_us = '';
        Swal.fire({
          title: 'Cita Guardada',
          allowOutsideClick: false,
          icon: 'success',
          text: '',
          showConfirmButton: false,
          timer: 1000
        });
        this.cerrarModal();
      }, err => {
        Swal.fire({
          title: 'Fallo!',
          icon: 'error',
          text: 'error :' + err.status,
          timer: 3000
        });
      })
    } else {
      Swal.fire({
        title: 'Fallo!',
        icon: 'error',
        text: 'Selecciona un Agente',
        timer: 3000
      });
    }
  }

}
