import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LlamadasResp } from 'src/app/shared/models/otros.model';
import { ClienteModelGen, RespUser } from 'src/app/shared/models/usuario.model';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';

@Component({
  selector: 'app-min-llamadas-sac',
  templateUrl: './min-llamadas-sac.component.html',
  styleUrls: ['./min-llamadas-sac.component.css']
})
export class MinLlamadasSacComponent implements OnInit, OnDestroy{
  @Input() modal: boolean;
  agentes: RespUser[];
  btnTitle = 'Ver Perdidas';
  btnGet = 'Mostrar Llamadas';
  tittle = 'Todas las Llamadas';
  total: string;
  page: number = 0;
  selectFilt: string = '';
  search: string;
  id_cli: string;

  E$: Subscription[];

  // llamadas
  llamadasHoyClientInjCopia: LlamadasResp[];
  llamadasFiltradas: LlamadasResp[][];
  llamadasFiltradas1: LlamadasResp[][];
  llamadasFiltradas11: LlamadasResp[][];
  llamadasHoyClientInj: LlamadasResp[];
  llamadasHoyClientInjEn: LlamadasResp[];
  llamadasHoyClientInjSal: LlamadasResp[];
  llamadasHoyClientInjPer: LlamadasResp[];
  llamadasHoyClientInjCont: LlamadasResp[];
  llamadasHoyClientInj800: LlamadasResp[];
  llamadasHoyClientInj914: LlamadasResp[];
  llamadasHoyClientInj1001: LlamadasResp[];
  clientes: ClienteModelGen[];

  constructor(private callSer: LlamadasPerdidasService,
              private funcSer: FuncionesComunesService,
              private ClientSer: ClientesService)
  { this.modal = false; }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {}
  }

  ngOnInit(): void {
    this.getClientes();
    const E$1 = this.callSer.llamadasCDR$.subscribe( res => {

      this.llamadasHoyClientInj = res;
      this.llamadasHoyClientInjCopia = res;

      this.llamadasFiltradas =  this.callSer.filtrarLLamadas(res);
      this.llamadasHoyClientInjSal = this.llamadasFiltradas[0];
      this.llamadasHoyClientInjEn = this.llamadasFiltradas[1];

      this.llamadasFiltradas11 = this.callSer.filtrarPerdidas(this.llamadasHoyClientInjEn);
      this.llamadasHoyClientInjPer = this.llamadasFiltradas11[0];
      this.llamadasHoyClientInjCont = this.llamadasFiltradas11[1];

      this.llamadasFiltradas1 = this.callSer.filtrar800(this.llamadasHoyClientInjEn);
      this.llamadasHoyClientInj800 = this.llamadasFiltradas1[0];
      this.llamadasHoyClientInj914 = this.llamadasFiltradas1[1];
      this.llamadasHoyClientInj1001 = this.llamadasFiltradas1[2];

      this.total = String(this.llamadasHoyClientInj.length);
    });
    const E$2 = this.funcSer.interval(30000).subscribe( () => {
      if (this.tittle == 'Todas las Llamadas') {
        this.callSer.refrescarLlamadas();
      }
    });
    this.E$ = [E$1, E$2];
  }
  getClientes(){
    this.ClientSer.callclientes().then(res =>  this.clientes = res );
  }

  refresh(){
    if (this.btnGet == 'Actualizar') {
      this.callSer.refrescarLlamadas();
    }if ( this.btnGet == 'Mostrar Llamadas') {
      this.getLlamadasHoy();
      this.btnGet = 'Actualizar';
    }
  }

  getLlamadasHoy(){
    if (!this.llamadasHoyClientInj) {
      this.callSer.getPerdidasHoy();
    } else {
      this.btnGet = 'Actualizar';
    }
  }

  buscador(str: string){ this.search = str; }

  nextP(){ this.page += 50; }

  prevP(){
    if (this.page > 0) this.page -= 50;
  }

  abrirModal(id: string){
    this.id_cli = id;
    this.modal = true;
  }

  cambiarTabla(str: string){
    switch (str) {
      case 'todas':
        this.tittle = 'Todas las Llamadas';
        this.llamadasHoyClientInj = this.llamadasHoyClientInjCopia;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case 'entrantes':
        this.tittle = 'Llamadas Entrantes';
        this.llamadasHoyClientInj = this.llamadasHoyClientInjEn;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case 'salientes':
        this.tittle = 'Llamadas Salientes';
        this.llamadasHoyClientInj = this.llamadasHoyClientInjSal;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case 'perdidas':
        this.tittle = 'Llamadas Perdidas';
        this.llamadasHoyClientInj = this.llamadasHoyClientInjPer;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case 'contestadas':
        this.tittle = 'Llamadas Contestadas';
        this.llamadasHoyClientInj = this.llamadasHoyClientInjCont;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case 'prospectos':
        this.tittle = 'Llamadas de Prospectos';
        this.llamadasHoyClientInj = this.callSer.seuFiltroDesc(this.llamadasHoyClientInjEn)[0];
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case '800':
        this.tittle = 'Llamadas 800';
        this.llamadasHoyClientInj = this.llamadasHoyClientInj800;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case '914':
        this.tittle = 'Llamadas 914';
        this.llamadasHoyClientInj = this.llamadasHoyClientInj914;
        this.total = String(this.llamadasHoyClientInj.length);
        break;
      case '1001':
        this.tittle = 'Llamadas 1001';
        this.llamadasHoyClientInj = this.llamadasHoyClientInj1001;
        this.total = String(this.llamadasHoyClientInj.length);
        break;

      default:
        this.llamadasHoyClientInj = this.llamadasHoyClientInjEn;
        this.total = String(this.llamadasHoyClientInj.length);
        this.tittle = 'Llamadas Entrantes';
        break;
    }
  }

}
