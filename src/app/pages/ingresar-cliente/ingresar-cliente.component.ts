import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { Campos_adicionales, ClientModel } from '../../shared/models/usuario.model';
import { DataStatusAgent, ErrorHttp, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { Subscription } from 'rxjs';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';

@Component({
  selector: 'app-ingresar-cliente',
  templateUrl: './ingresar-cliente.component.html',
  styleUrls: ['./ingresar-cliente.component.css']
})
export class IngresarClienteComponent implements OnInit, OnDestroy {
  id_A: string;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  data: RespStatusAgent;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  @Input() formuPostClient: Partial<ClientModel>;
  @Input() formuPostClient2: ClientModel;
  TipoPeticion: number;

  formuPostClient3 = {
    campos_adicionales: {
      id_tarjeta: '',
      cv: '',
      exp: '',
      tipo_tarjeta: '',
      nombres_tarjeta: '',
    }
  }
  cliente!: ClientModel;
  opcion: number;
  id!: number;

  campos_adicionales: Campos_adicionales;

  constructor(private auth: AuthService,
              private funcSer: FuncionesComunesService,
              private router: Router,
              private stalker: RastreadorAgentesService,
              private httpServ: AuthService)
  {
    this.auth.idC = '',
    this.TipoPeticion = httpServ.TipoPet;
    ////////////////////////////
    this.id_A = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.router.routerState.snapshot.url.split('/')[1];
    this.tiempoInicio = new Date().getTime();
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {}
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    this.httpServ.TipoPet = 1 // peticion tipo put
    this.opcion = 0;
    // this.generarRegistroStalker();
    const E$1 = this.funcSer.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    })
    this.E$.push(E$1);
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.id_A,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'Ingresar Cliente',
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

  jsonConcat(form1, form2) {
    for (const key in form2) {
      form1[key] = form2[key];
    }
    return form1;
  }

  Autenticar(): void {
    if (this.formuPostClient2) {
      this.formuPostClient.campos_adicionales = this.jsonConcat(this.formuPostClient2.campos_adicionales, this.formuPostClient.campos_adicionales);
      //this.formuPostClient.campos_adicionales = this.jsonConcat(this.formuPostClient.campos_adicionales, this.formuPostClient3.campos_adicionales);
      this.formuPostClient = this.jsonConcat(this.formuPostClient, this.formuPostClient2);
    }

    delete this.formuPostClient.fecha_creacion;
    if (this.formuPostClient.telmovil) {
      if (this.formuPostClient.nota_plan_inscripcion) {
        delete this.formuPostClient.nota_plan_inscripcion;
      }
      this.formuPostClient.campos_adicionales = this.funcSer.creadorDeCamposAd(this.formuPostClient);
      if (!this.formuPostClient.status) { this.formuPostClient.status = '6'; }
      if ( this.formuPostClient.telmovil.match(/[!"#$%& '()*+,\-./:;=?@a-zA-ZÑñ\[\]^_`{|}~<>¿¡]+/) ) {
        this.funcSer.showSweetError('FALLO!','Número no Válido! ', 2000);
      } else if (this.formuPostClient.telmovil.length == 10) {
        this.funcSer.log('datatotal client new ', this.formuPostClient);
        this.auth.putCliente(this.formuPostClient).subscribe(resp => {
          this.funcSer.showSweetSuccess('OK!','Guardado correcto',1300);
          this.router.navigateByUrl('/consultarcliente');
        }, (err: ErrorHttp ) => {
          if (err && err.status == 406) {
            if (err.error.Error.includes('Duplicate entry')) {
              this.funcSer.showSweetError('FALLO!','El número ya esta registrado', 2000);
            } else  {
              this.funcSer.logWarn('Error Atenticar DataCli', err);
              this.funcSer.showSweetError('FALLO!',`STATUS:${err.status} / ${err.error.Error}`, 2000);
            }
          } else if (err.status == 201 ) {
            this.funcSer.showSweetSuccess('OK!','Guardado correcto',1300);
            this.router.navigateByUrl('/consultarcliente');
          } else {
            this.funcSer.showSweetError('FALLO!',`STATUS:${err.status} / ${err.error.Error}`, 2000);
          }
        });
      } else {
        this.funcSer.showSweetError('FALLO!','Número no Válido! ', 2000);
      }
    }
  }
}
