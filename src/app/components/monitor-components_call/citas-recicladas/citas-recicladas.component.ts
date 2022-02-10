import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ESTADOS, MOTIVOS } from 'src/app/shared/constants/citas';
import { RESULTADO } from 'src/app/shared/constants/notas';
import { AgentModel, RespNotas } from 'src/app/shared/models/otros.model';
import { RespCitasM, RespUser } from 'src/app/shared/models/usuario.model';
import { RastreadorCitasService } from 'src/app/shared/others/hook/rastreador-citas.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { NotasService } from 'src/app/shared/services/notas.service';

@Component({
  selector: 'app-citas-recicladas',
  templateUrl: './citas-recicladas.component.html',
  styleUrls: ['./citas-recicladas.component.css']
})
export class CitasRecicladasComponent implements OnInit, OnDestroy {
  citas: RespCitasM[] = [];
  agentes: AgentModel[];
  E$: Subscription[] = [];
  notas: RespNotas[] = [];
  modal: boolean = false;
  id_us: string;

  estados_c = ESTADOS;
  motivos_c = MOTIVOS;
  result_n = RESULTADO
  itemC: RespCitasM;
  agentes2: RespUser[];
  agentesV2: RespUser[];

  constructor(private rastreador: RastreadorCitasService,
              public sanitizer: DomSanitizer,
              private citaSer : CitasService,
              private router: Router,
              private notaSer: NotasService,
              private funcSer: FuncionesComunesService,
              private AgentSer: AgentesService) { }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => {
        e.unsubscribe();
      });
    } catch (err) {}
  }

  ngOnInit(): void {
    this.callAgentes();
    this.callAgentes2();
    const E$1 = this.citaSer.Citas$.subscribe( r => {
      let data = [];
      r.forEach(c => {
        if (c.id_asignado == '0') {
          data.push(c);
        }
      });
      this.citas = data;
      this.funcSer.ordenarAny(this.citas, 'fecha_creacion', 'Desc');
    });
    this.E$.push(E$1);
  }

  callAgentes(){
    let data = [];
    this.AgentSer.getUsersPhone().then( agt => {
      this.agentes = agt;
    }).then(() => {
      this.rastreador.citasHoy().then( res => {
        res.forEach(c => {
          if (c.id_asignado == '0') {
            data.push(c);
          }
        });
        this.citas = data;
        this.funcSer.ordenarAny(this.citas, 'fecha_creacion', 'Desc');
      });
    });
  }

  callAgentes2(){

    this.AgentSer.callAgentes().then( agt => {
      this.funcSer.log('Agentes',agt);
      this.agentesV2 = agt;
    });
  }

  abrirOpc(item: RespCitasM){
    this.itemC = item;
    this.modal = true;
    this.notaSer.getNotasC(item.id_cliente);
  }

  cerraM(){
    this.modal = false;
    this.itemC = null
  }

  modCita(){
    let id = this.itemC.id;
    if (this.id_us) {
      let hora = `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() )}`;
      hora = this.funcSer.addMinToDate(hora, 7);
      this.citaSer.editarCita(id, {id_asignado: this.id_us, fechahora: hora}).then(() => {
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

}
