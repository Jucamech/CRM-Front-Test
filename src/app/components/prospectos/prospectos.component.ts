import { Component, OnInit } from '@angular/core';
import { RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css']
})
export class ProspectosComponent implements OnInit {
  dataOriginal: Array<RespCitas>
  dataProspectos: Array<RespCitas>
  total_perd: number;
  tipoFil;

  usuariosList: Array<RespUser>;

  constructor(private httpSer: AuthService,
              private citasServ: CitasService,
              private AgentSer: AgentesService,
              private functC: FuncionesComunesService) { }

  ngOnInit(): void {
    this.getCitas();
    this.getAgents();
  }

  getCitas() {
    this.citasServ.callCitasSuperV().then(
      (res: RespCitas[]) => {

        this.dataProspectos = [];
        this.dataOriginal = [];

        for (const key in res) {
          const el = res[key];
          this.dataProspectos.push(res[key]);
          this.dataOriginal.push(res[key]);

        }
        this.functC.ordenar(this.dataProspectos);
        this.functC.ordenar(this.dataOriginal);
        this.filtraPerdidos(this.dataProspectos);
        this.filtraPerdidos(this.dataOriginal);
      }
    )
  }


  getAgents() {
    this.AgentSer.callAgentes().then(
      (agts: RespUser[]) => {
        this.usuariosList = agts;
      }
    )
  }

  /**
   * filtra las llamadas basadas en tiempo
   * @param array RespUser[]
   */
  filtraPerdidos(array) {
    let ahora = `${this.functC.getFecha()} ${this.functC.getHora()}`;
    let citasFiltradas = [];
    for (const key in array) {
      const el = array[key];
      //aqui se vence la cita
      if (el.fechahora < ahora && el.estado < '2') {
        el.estado = 'Cita Perdida'
        citasFiltradas.push(el)
      }
    }
    this.total_perd = citasFiltradas.length
    this.dataProspectos = citasFiltradas;
  }

  filtarFecha() {
    const filt = this.tipoFil;
    let citasP: Array<RespCitas>;
    let mes = this.functC.getFecha();
    const hoy = this.functC.getHoy();
    const mana = this.functC.getTomorrow();

    this.dataProspectos = this.dataOriginal;

    if (filt == '1') {
      citasP = [];

      for (const key in this.dataProspectos) {
        const el = this.dataProspectos[key];
        if (el.estado == 'Cita Perdida') {
          citasP.push(el);
        }
      }
      this.dataProspectos = citasP;
      this.total_perd = citasP.length;
      this.tipoFil = '';
    }

    if (filt == '2') {
      citasP = [];
      this.dataProspectos = this.dataOriginal;

      for (const key in this.dataProspectos) {
        const el = this.dataProspectos[key];
        if (el.fechahora > hoy && el.fechahora < mana && el.estado == 'Cita Perdida') {
          citasP.push(el);
        }
      }
      this.dataProspectos = citasP;
      this.total_perd = citasP.length;
      this.tipoFil = '';
    }

    if (filt == '3') {
      citasP = [];
      mes = mes.slice(0, 7);

      for (const key in this.dataProspectos) {
        const el = this.dataProspectos[key];
        el.mesEl = el.fechahora.slice(0, 7);
        if (el.mesEl == mes && el.estado == 'Cita Perdida') {
          citasP.push(el);
        }
      }
      this.dataProspectos = citasP;
      this.total_perd = citasP.length;
      this.tipoFil = '';
    }
  }
}
