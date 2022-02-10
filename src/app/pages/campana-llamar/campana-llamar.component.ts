import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RespCampaña } from 'src/app/shared/models/citas.model';
import { DataStatusAgent, LLamadaAgente, ResCampañaV2, RespDataCampaV2, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { CampagnasV2Service } from 'src/app/shared/services/campagnas-v2.service';
import { CampaignSaleService } from 'src/app/shared/services/campaign-sale.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campana-llamar',
  templateUrl: './campana-llamar.component.html',
  styleUrls: ['./campana-llamar.component.css']
})
export class CampanaLlamarComponent implements OnInit, OnDestroy {
  @Input() llamandoC: boolean;
  @Input() dataLlamando: LLamadaAgente;

  campV2: ResCampañaV2[];
  selcampV2: ResCampañaV2;
  dataCampV2: RespDataCampaV2[];
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  opcionVer: number;
  opcionVer2: number;
  coll = 'Campañas_creditoMejor'
  campanas: RespCampaña[] = [];
  modocampa: boolean = false;
  activa = environment.campagna;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  data: RespStatusAgent;
  id: string;
  key_c: string;
  key_L: string;

  constructor(private stalker: RastreadorAgentesService,
              private campañaSer: CampaignSaleService,
              private campañaV2Ser: CampagnasV2Service,
              private funcSer: FuncionesComunesService)
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
    this.getCapmpanas();
    this.getCampaV2();
    // this.generarRegistroStalker();
    const E$6 = this.funcSer.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    });
    this.E$.push(E$6);
  }

  generarRegistroStalker(){
    let dataLlamd = {
      tipo: '',
      t_inicio: '',
      t_fin: '',
      id_cliente: ''
    }
    let data: DataStatusAgent = {
      id_user: this.id,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'LLamar Campaña',
      llamando: dataLlamd
    }
    this.stalker.crearRegistro(data).then(res => {
      this.data = res;
    });
  }

  actualizarEstadoComponent(){
    let id = this.data.id;
    let dataLlamd = {
      tipo: '',
      t_inicio: '',
      t_fin: '',
      id_cliente: ''
    }
    this.data.llamando = this.llamandoC ? this.dataLlamando: dataLlamd
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

  getCapmpanas(){
    if (this.activa) {
      const E$1 = this.campañaSer.getCampaña(this.coll).subscribe((snap) => {
        this.campanas = [];
        snap.forEach((stat:any) => {
          if (stat.payload.doc.data().activo == true) {
            this.modocampa = true;
            this.campanas.push({
              index: stat.payload.doc.data().indice ,
              id : stat.payload.doc.id,
              data : stat.payload.doc.data()
            });
          }
        });
        this.E$.push(E$1);
      });
    }
  }

  getCampaV2(){
    let data = [];
    this.campañaV2Ser.getCampagnas().then(r => {
      r.forEach(c => {
        if (c.activo == '1') {
          data.push(c);
        }
      })
      this.campV2 = data;
    });
  }

  getDataCampaV2(id_camp: string, item:ResCampañaV2){
    if (this.llamandoC) {
      this.funcSer.showSweetWarning('Bloqueado!', 'Cuando se esta LLamando no se Permite ver las demás campañas', 2500);
    } else {
      let data = [];
      this.campañaV2Ser.getDataCampagnas(id_camp).then(r => {
        r.forEach(c => {
          if (c.act_camp == '1' ) {
            data.push(c);
          }
        })
        this.dataCampV2 = data;
        this.selcampV2 = item;
      });
    }
  }

}
