import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RespCampaña } from 'src/app/shared/models/citas.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CampaignSaleService } from 'src/app/shared/services/campaign-sale.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, OnDestroy {
  url: string;
  tiempoInicio: number;
  key_L: string;
  id: string;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  coll = 'Campañas_creditoMejor'
  campanas: RespCampaña[] = [];
  modocampa: boolean = false;

  ocultarNav: boolean = true
  toggle: boolean = false
  ttBtn = 'Ver más'
  hab800: boolean;
  opcionVer: number = 0;
  E$: Subscription[] = [];
  key_c: string;
  is_Vis: boolean = true;

  constructor(private httpServ: AuthService,
              private stalker: RastreadorAgentesService,
              private activateRoute: ActivatedRoute,
              private funcSer: FuncionesComunesService)
  {
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.activateRoute.snapshot.url[0].path;
    this.tiempoInicio = new Date().getTime();
  }


  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {}
    //this.stalker.insertDataComponent(false, this.status, this.url, this.key_c, this.tiempoInicio,);
  }

  ngOnInit(): void {
    this.httpServ.idC = '';
    //this.getStatus();
    //this.getCapmpanas();
    const E$1 = this.funcSer.interval(5000).subscribe(() => {
      //this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    })
    this.E$.push(E$1);
    //this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
  }

  checkActivity(){
   /*  if (document.hidden){
      this.is_Vis = false;
      this.stalker.insertDataComponent(false, this.status,this.url, this.key_c, this.tiempoInicio);
    } else {
      this.is_Vis = true;
      this.stalker.insertDataComponent(true, this.status,this.url, this.key_c, this.tiempoInicio);
    } */
  }

/*   getStatus(){
    let coll = this.stalker.generarCollUser(this.id);
    const E$3 =this.stalker.getStatus(coll).subscribe((snap) => {
      snap.forEach((stat:any) => {
        if (stat.payload.doc.data().key_login == this.key_L) {
          this.status = ({
            id : stat.payload.doc.id,
            data : stat.payload.doc.data()
          });
        }
      })
    });
    //this.stalker.insertDataComponent(this.is_Vis, this.status,this.url, this.key_c, this.tiempoInicio);
    this.E$.push(E$3);
  } */

  /* ******************************************************* */



}
