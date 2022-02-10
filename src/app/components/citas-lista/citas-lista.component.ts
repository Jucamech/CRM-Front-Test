import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dids } from 'src/app/shared/models/otros.model';
import { RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-lista',
  templateUrl: './citas-lista.component.html',
  styleUrls: ['./citas-lista.component.css']
})
export class CitasListaComponent implements OnInit {
  @Input() opcionVer: number;
  @Input() dataCliH: Object;
  dataClienteDocument: Array<RespCitas>;
  DataCitasPendientes: Array<RespCitas>;
  DataCitaH: Array<RespCitas>;
  DataCitaTranscurridas: Array<RespCitas>;
  DataCitaToPost: Array<RespCitas>;

  list: Dids[];
  idCall: string;
  modal: boolean;

  id: string;
  hoy = new Date();

  constructor(private httpServ: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private functC: FuncionesComunesService,
              private AgentSer: AgentesService,
              private citasServ: CitasService) {
    this.id = route.snapshot.params['id'];
    this.modal = false;
  }

  ngOnInit(): void {
    if (this.id) {
      this.getCitasCli();
    } else {
      this.getAllCitas();
    }
  }

  filtro() {
    let ahora = `${this.functC.getFecha()} ${this.functC.getHora()}`;
    let mana = this.functC.getTomorrow();
    let hora = this.functC.getHora();
    hora = hora.slice(0, 5)

    let citasPendientes = [];
    let citasHoy = [];
    let citasToPost = [];
    for (const key in this.dataClienteDocument) {
      const el = this.dataClienteDocument[key];

      if (el.fechahora > `${ahora.slice(0, 11)}00:00:00`) {

        if (el.fechahora < `${mana.slice(0, 11)}00:00:00`) {
          citasHoy.push(el);
        }
      }
      if (el.fechahora > ahora && el.fechahora && el.estado == '11') {
        citasToPost.push(el);
      }

      if (el.fechahora > `${mana.slice(0, 11)}00:00:00`) {
        if (el.fechahora < `${mana.slice(0, 11)}23:59:59`) {
          citasPendientes.push(el)
        }
      }
    }
    if (this.opcionVer == 2) {
      this.DataCitaH = citasHoy;
      this.dataClienteDocument = this.DataCitaH;
    }
    if (this.opcionVer == 3) {
      this.dataClienteDocument = citasPendientes;
    }
    if (this.opcionVer == 7) {
      this.DataCitaToPost = citasToPost;
      this.dataClienteDocument = this.filtroPerdidos(citasToPost, hora);
    }
  }

  filtroPerdidos(array: Array<RespCitas>, hora: string): any {
    let citasAhora = [];
    let citasPerdidas = [];
    for (const key in array) {
      const el = array[key];
      el.fechahora = el.fechahora.slice(11, 16);
      if (hora < el.fechahora) {
        citasAhora.push(el);
      }
      if (hora > el.fechahora) {
        citasPerdidas.push(el)
      }
    }
    this.DataCitaTranscurridas = citasPerdidas;
    return citasAhora;
  }

  filtroToPost(array: Array<RespCitas>) {
    let citaToPost: Array<RespCitas>;
    for (const key in array) {
      const el = array[key];
      if (el.estado == '11') {
        citaToPost.push(el)
      }
    }
    this.DataCitaToPost = citaToPost;
    return this.DataCitaToPost;
  }

  getCitasCli() {
    let id = this.id;
    this.citasServ.callCitasCli(id).then(
      (cita: RespCitas) => {
        let newData = []
        this.dataClienteDocument = [];
        for (const key in cita) {
          newData.push(cita[key]);
        }
        this.dataClienteDocument = newData;
        this.functC.ordenar(this.dataClienteDocument);
        this.filtro();
      }
    )
  }

  getAllCitas() {
    this.citasServ.callCitas().then(
      (cita: RespCitas) => {
        this.dataClienteDocument = [];
        for (const key in cita) {
          this.dataClienteDocument.push(cita[key]);
        }
        this.functC.ordenar(this.dataClienteDocument);
        this.filtro();
      }
    )
  }

  getAgentes(): Array<RespUser> {
    let agentes: RespUser[];
    this.AgentSer.callAgentes().then(
      (agt: RespUser[]) => {
        agentes = agt;
      }
    )
    return agentes;
  }

  call(item: RespCitas) {

    Swal.fire({
      title: 'CONFIRMAR',
      text: `Confirmar llamada a: ${item.nombres} ${item.apellidos}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar',
    }).then((r) => {
      if (r.isConfirmed) {
        this.router.navigateByUrl(`llamarcliente/${item.id_cliente}`);
      }
    })
  }

}
