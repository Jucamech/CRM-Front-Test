import { Component, Input, OnInit } from '@angular/core';
import { RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';

@Component({
  selector: 'app-monitorcitas',
  templateUrl: './monitorcitas.component.html',
  styleUrls: ['./monitorcitas.component.css']
})
export class MonitorcitasComponent implements OnInit {
  @Input() usuariosList2: Array<RespUser>;
  @Input() opcion: number;

  dataClienteDocument: Array<RespCitas>;
  toogle: boolean = false;

  dataNotaCita: RespCitas;
  dataAgentes: RespUser[];
  asignado; /////////////////
  idAs: number;

  constructor(private citasSer: CitasService,
              private AgentSer: AgentesService,
              private httpSer: AuthService) { }

  ngOnInit(): void {
    this.getAgentes();
    if (this.opcion) {
      this.getCitasSuper();
    } else {
      this.getCitas();
    }
  }

  getCitas() {
    this.citasSer.callCitas().then(
      (citas: RespCitas[]) => {
        this.dataClienteDocument = citas
      }
    )
  }

  getCitasSuper() {
    this.asignado = '';
    this.citasSer.callCitasSuperV().then(
      (citasSuper: RespCitas[]) => {
        this.dataClienteDocument = citasSuper
      }
    )
  }

  getCitasSuperFiltradas() {
    let id = this.asignado

    this.citasSer.callCitasSuperV().then(
      (citasSuper: RespCitas[]) => {

        let nuevaDataCli = []
        for (const key in citasSuper) {
          const el = citasSuper[key];
          if (el.id_asignado == String(id)) {
            nuevaDataCli.push(el)
          }
        }
        this.dataClienteDocument = nuevaDataCli

      }
    )
  }

  selectCita(item) {
    this.dataNotaCita = item
    this.toogle = true;
  }

  putCita() {
    const id = this.dataNotaCita.id;
    delete this.dataNotaCita.nombres;
    delete this.dataNotaCita.apellidos;
    delete this.dataNotaCita.asignado;
    delete this.dataNotaCita.campos_adicionales;
    delete this.dataNotaCita.fecha_creacion;
    delete this.dataNotaCita.id_cliente;

    let data = this.dataNotaCita;

    this.httpSer.putCita(id, data).subscribe(
      () => {
        this.toogle = false;
        this.ngOnInit();
      }
    )
  }

  getAgentes() {
    this.AgentSer.callAgentes().then(
      (res: RespUser[]) => {
        this.dataAgentes = res;
      }
    )
  }

}
