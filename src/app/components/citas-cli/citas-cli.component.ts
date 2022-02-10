import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel, RespCitas, RespCitasM, RespUser } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { CitasListaComponent } from '../citas-lista/citas-lista.component';
import { AgentesService } from 'src/app/shared/services/agentes.service';

@Component({
  providers: [CitasListaComponent],
  selector: 'app-citas-cli',
  templateUrl: './citas-cli.component.html',
  styleUrls: ['./citas-cli.component.css']
})
export class CitasCliComponent implements OnInit {
  @Input() dataCliH: Object;
  @Input() listClientes: Array<ClientModel>;

  error: boolean;
  Hoy: string;

  usuariosList: Array<RespUser>;
  cliente: ClientModel;

  dataCliente: any;

  fecha_cita: string;
  hora_cita: string;
  asignado: string;
  estado_cita: string;
  nombre: string;
  motivo_cita: string;
  nota_cita: string;
  id_asignado: string;
  nivel2: boolean;
  ids_from_select = {
    id_cli: '',
    id_agent: ''
  }

  classInputMod = 'custom-input-file col-md-6 col-sm-6 col-xs-6 ';
  is_kim: boolean;

  constructor(public httpServ: AuthService,
              private router: Router,
              public listC: CitasListaComponent,
              private funcSer: FuncionesComunesService,
              private route: ActivatedRoute,
              private AgentSer: AgentesService,
              private citasServ: CitasService) {
    this.dataCliente = this.route.snapshot.params['id'];
    this.Hoy = `${this.funcSer.getFecha()}`;
    this.error = false;
    this.nivel2 = funcSer.generarPermisos();
    this.is_kim = funcSer.generarPermisosUnicos('110');
  }

  ngOnInit(): void {
    this.getAgents();
    if (this.dataCliH) {
      this.nombre = this.dataCliH['nombres']
    }
  }

  getAgents() {
    this.AgentSer.callAgentes().then(
      (agts: RespUser[]) => {
        this.usuariosList = agts;
      }
    )
  }

  cerrarForm(): void {
    this.router.navigateByUrl('consultarcliente');
  }

  resetF() {
    this.fecha_cita = '';
    this.hora_cita = '';
    this.motivo_cita = '';
    this.nota_cita = '';
    this.estado_cita = '';
  }

  agregarCita() {
    let id = this.dataCliente;
    let cita: RespCitasM = {
      fechahora: `${this.fecha_cita} ${this.hora_cita}`,
      motivo: this.motivo_cita,
      notas: this.nota_cita,
      estado: this.estado_cita,
      id_asignado: this.ids_from_select.id_agent,
      campos_adicionales: []
    }
    if (this.ids_from_select.id_cli && this.ids_from_select.id_agent) {
      cita.fechahora = `${this.fecha_cita} ${this.hora_cita}`;
      cita.id_asignado = this.ids_from_select.id_agent;
      cita.motivo = this.motivo_cita;
      cita.notas = this.nota_cita;
      cita.estado = this.estado_cita;
    }
    if (this.estado_cita == '17') {
      cita.fechahora = `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() ).slice(0,5)}`;
    }
    if ( cita.fechahora.length != 16 ) {
      this.funcSer.showSweetError('Error!','La Fecha esta Incompleta', 2000);
    } else if (!cita.notas) {
      this.funcSer.showSweetError('Error!','Comentario Obligatorio', 2000);
    }else if (!cita.id_asignado) {
      this.funcSer.showSweetError('Error!','Falta el Agente!', 2000);
    } else {
      if (cita.notas && cita.motivo && cita.fechahora && cita.estado) {
        this.funcSer.log('cita ',cita);
        this.citasServ.crearCita(id, cita);
        this.citasServ.bloq = true;
        this.resetF();
      }
    }
  }

  editarCita(id: string, data: RespCitas) {
    this.httpServ.putCita(id, data);
    this.resetF();
  }

  log(id_cli: string) {
    this.ids_from_select.id_cli = id_cli;
  }
  log2(id_user: string) {
    this.ids_from_select.id_agent = id_user;
  }

}
