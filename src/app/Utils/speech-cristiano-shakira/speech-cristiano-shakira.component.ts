import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech-cristiano-shakira',
  templateUrl: './speech-cristiano-shakira.component.html',
  styleUrls: ['./speech-cristiano-shakira.component.css']
})
export class SpeechCristianoShakiraComponent implements OnInit {
  susb: any;
  nombre: string;
  cliente: Partial<ClientModel>;
  Hoy: string;

  agente: string;

  //data
  fecha_cita: string;
  hora_cita: string;
  asignado: string;
  estado_cita: string = '1';
  nombre_cli: string;
  motivo_cita: string;
  nota_cita: string;

  constructor(private funcSer: FuncionesComunesService,
              private httpSer: AuthService)
  {  this.Hoy = `${this.funcSer.getFecha()}`
}
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre');
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r)
  }

  reset(){
    this.asignado = '';
    this.nombre_cli = '';
    this.motivo_cita = '';
    this.nota_cita = '';
  }

  agregarCita() {
    let id_asig = localStorage.getItem('id_agente')
    let id = this.cliente.id;
    let cita = {
      id_cliente: id,
      fechahora: `${this.fecha_cita} ${this.hora_cita}`,
      motivo: this.motivo_cita,
      notas: this.nota_cita,
      estado: '1',
      id_asignado: id_asig
    }

    if (this.cliente.id) {

      this.httpSer.postCita(this.cliente.id, cita).subscribe(
        res => {
          Swal.fire({
            title: 'Cita Guardada',
            allowOutsideClick: false,
            icon: 'success',
            text: '',
            showConfirmButton: false,
            timer: 1000
          });
          this.reset();
        }, err => {
          Swal.fire({
            title: 'Fallo!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 4000
          });
        }
      )
    }
  }

}
