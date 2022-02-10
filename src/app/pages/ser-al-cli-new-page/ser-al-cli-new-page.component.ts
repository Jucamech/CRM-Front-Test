import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStatusAgent, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-ser-al-cli-new-page',
  templateUrl: './ser-al-cli-new-page.component.html',
  styleUrls: ['./ser-al-cli-new-page.component.css']
})
export class SerAlCliNewPageComponent implements OnInit, OnDestroy {
  id: string;
  key_c: string;
  key_L: string;
  url: string;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  data: RespStatusAgent;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }

  constructor(private funcSer: FuncionesComunesService,
              private stalker: RastreadorAgentesService,)
  {
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {};
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    // this.generarRegistroStalker();
    const E$1 = this.funcSer.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    })
    this.E$.push(E$1);
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.id,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'SAC',
      llamando: {
        tipo: '',
        t_inicio: '',
        t_fin: '',
        id_cliente: ''
      }
    }
    this.stalker.crearRegistro(data).then(res => {
      this.data = res;
    });
  }

  actualizarEstadoComponent(){
    let id = this.data.id;
    this.data.hora_final = `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}`
    if (this.is_Vis) {
      this.data.visible = '1';
    } else {
      this.data.visible = '0';
    }
    this.stalker.actualizarDataStalker(id, this.data);
  }

  checkActivity(){
    if (document.hidden){
      this.is_Vis = false;
    }else {
      this.is_Vis = true;
    }
    //this.actualizarEstadoComponent();
  }

}
