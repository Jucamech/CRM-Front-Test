import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RespPago, RespUser } from "src/app/shared/models/usuario.model";
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ventana-historial-pagos',
  templateUrl: './ventana-historial-pagos.component.html',
  styleUrls: ['./ventana-historial-pagos.component.css']
})
export class VentanaHistorialPagosComponent implements OnInit, OnChanges {
  @Output() toogle2Emit = new EventEmitter<boolean>()
  @Input() dataItem: RespPago;
  @Input() toogle2: boolean;
  @Input() usuariosList: RespUser[];

  totalInscripcion: number;
  totalMensualidad: number;
  Hoy: string;

  fecha_cita: string
  hora_cita: string
  estado_cita: number = 1;
  nota_cita: string;

  ids_from_select = {
    id_cli: '',
    id_agent: ''
  }

  constructor(private funcSer: FuncionesComunesService,
              private httpServ: AuthService,
              private AgentSer: AgentesService,
              private citasServ: CitasService) {
    this.Hoy = `${this.funcSer.getFecha()}`
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c.dataItem && c.dataItem.currentValue) {
      this.toogle2 = true;
    }
  }

  ngOnInit(): void {  }

  agregarCita() {
    let id = String(this.dataItem.id_cliente);

    let data = {
      estado: '1',
      fechahora: `${this.fecha_cita} ${this.hora_cita}`,
      id_asignado: this.ids_from_select.id_agent,
      id_cliente: id,
      motivo: 5,
      notas: this.nota_cita,
    }

    this.httpServ.postCita(id, data).subscribe(
      res => {
        this.cerrar();
        Swal.fire({
          title: 'Cita Guardada',
          allowOutsideClick: false,
          icon: 'success',
          text: '',
          showConfirmButton: false,
          timer: 1000
        });
      }, err => {
        Swal.fire({
          title: 'Fallo!',
          icon: 'error',
          text: 'error :' + err.status,
          timer: 3000
        });
      }
    )
  }

  cerrar() {
    this.toogle2Emit.emit(true)
    this.toogle2 = false;
    let x: RespPago;
    this.dataItem = x;
  }


  log2(id_user: string) {
    this.ids_from_select.id_agent = id_user;
  }
}
