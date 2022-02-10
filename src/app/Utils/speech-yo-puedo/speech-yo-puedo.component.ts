import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RespCalling } from 'src/app/shared/models/otros.model';
import { ClientModel, RespPago, RespReporteCred } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech-yo-puedo',
  templateUrl: './speech-yo-puedo.component.html',
  styleUrls: ['./speech-yo-puedo.component.css']
})
export class SpeechYoPuedoComponent implements OnInit, OnDestroy {
  id$:string;
  data$: RespCalling;
  Hoy: string;
  E$: Subscription[];

  //class
  intro:string='intro';
  trabaja:string='none';
  notrabaja:string='none';
  // toggle
  dictamen: boolean = false;

  // data
  nombre:string;
  apellido:string;

  //tipo_deuda: string;
  cuenta_id?:string;
  estado?: string = '10';
  acreedor_origin?:string;
  balance_cuenta?:number;
  fecha_cuenta?:string;
  limite_cuenta: number;
  tipo_cuenta: string;
  buro?: number;
  razon?: string;

  sueldoS_Q: string;
  sueldo: number;
  proximo_pago: string;
  valor: number;
  comentario:string;
  dataC: any;

  constructor(private funcSer: FuncionesComunesService,
              private httpSer: AuthService,
              private CallSer: LlamadasService)
  {
    this.Hoy = `${this.funcSer.getFecha()}`;
  }
  ngOnDestroy(): void {
    this.E$.forEach( e => e.unsubscribe() )
  }

  ngOnInit(): void {
    const E$2 = this.httpSer.extLlamada$.subscribe((r) => this.data$ = r );
    const E$1 = this.CallSer.llamandoID$.subscribe((r) => {
      let emitID = localStorage.getItem('change');
      if (!emitID) {
        this.id$ = String(r);
      } else if (emitID && !r){
        this.id$ = emitID && emitID != '66.99' ? emitID : null;
      }
      if (!this.dataC) {
        this.getCliente();
      }
    });
    this.E$ = [E$1, E$2];
  }

  getCliente(){
    let id:string;
    if (this.id$ && this.id$ != 'null' ) {
      id = this.id$;
      this.httpSer.getCliente(id).subscribe(r => {
        this.dataC = r;
        this.nombre = this.dataC.nombres;
        this.apellido = this.dataC.apellidos;
        this.dataC.campos_adicionales = this.funcSer.creadorDeCamposAd(this.dataC);
      }, err => {

      });
    }
  }

  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        break;

      case 'trabaja':
        this.intro = 'none';
        this.trabaja = 'trabaja';
        this.enviarData();
        break;

      case 'siguiente':
        this.dictamen = true;
        this.enviarData();
        break;

      case 'notrabaja':
        this.intro = 'none';
        this.notrabaja = 'notrabaja';
        this.enviarData();
        break;
    }
  }

  atrasP(str: string) {
    switch (str) {
      case 'trabaja':
        this.intro = 'intro';
        this.trabaja = 'none';
        break;
      case 'notrabaja':
        this.intro = 'intro';
        this.notrabaja = 'none';
        break;

    }
  }

  enviarData(){
    let id = this.id$;
    let data: Partial<ClientModel> = {
      nombres: this.nombre,
      apellidos: this.apellido,
      salario: this.sueldo,
      campos_adicionales:{
        sueldoS_Q: this.sueldoS_Q
      }
    }
    data.campos_adicionales = this.funcSer.creadorDeCamposAd(data);
    if (id) {
      this.httpSer.pacthCliente(data, id).subscribe(
        res => {
          Swal.fire({
            title: 'Guardado',
            allowOutsideClick: false,
            icon: 'success',
            text: 'Datos Guardados Correctamente',
            showConfirmButton: false,
            timer: 700,
          });
        }, err => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000
          });
        }
      )
    };
  }

  enviarReporte(){
    let id = this.id$;
    if (id) {
      let dataDeuda:Partial<RespReporteCred> = {
        acreedor: this.acreedor_origin,
        cuenta: this.cuenta_id,
        estado: Number(this.estado),
        fecha: this.fecha_cuenta,
        buro: this.buro,
        tipo_cuenta: this.razon,
        //tipo_cuenta: this.tipo_cuenta,
        //balance_cuenta: this.balance_cuenta,
       // limite: this.limite_cuenta,
      }
      if (dataDeuda) {
        this.httpSer.postHistorCredi(id, dataDeuda).subscribe( r => {
          Swal.fire({
            title: 'Guardado',
            allowOutsideClick: false,
            icon: 'success',
            text: 'Reporte Guardado!',
            showConfirmButton: false,
            timer: 700,
          });
          this.resetReporte();
        }), err => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000
          });
        }
      }
    }
  }

  addCobro(){
    let id = this.id$;
    let dataCobro:Partial< RespPago >= {
      id_user: Number(this.id$),
      fecha_pago: this.proximo_pago,
      medio: '',
      descripcion: this.comentario,
      valor: Number(this.valor),
      tipo_pago: 2,
      color: '0',
      num_pago: 0
    };
    this.httpSer.postPago(id, dataCobro).subscribe( r => {
      Swal.fire({
        title: 'Guardado',
        allowOutsideClick: false,
        icon: 'success',
        text: 'Reporte Guardado!',
        showConfirmButton: false,
        timer: 700,
      });
    }), err => {
      Swal.fire({
        title: 'FALLO!',
        icon: 'error',
        text: 'error :' + err.status,
        timer: 2000
      });
    }

  }

  resetReporte(){
    this.acreedor_origin = '';
    this.cuenta_id = '';
    this.estado  = '';
    this.tipo_cuenta = '';
    this.fecha_cuenta = '';
    this.limite_cuenta = null;
    this.buro = 0;
    this.razon = '';
  }

}
