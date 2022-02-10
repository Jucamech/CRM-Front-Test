import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RespCalling } from 'src/app/shared/models/otros.model';
import { ClientModel, Fechas_pagos } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech-llamada-venta',
  templateUrl: './speech-llamada-venta.component.html',
  styleUrls: ['./speech-llamada-venta.component.css']
})
export class SpeechLlamadaVentaComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  data$: RespCalling;
  idR$: number;
  Hoy: string;
  dataCliente:Partial<ClientModel>;
  agente: string;

  /* Clases */
  intro: string = 'intro';
  segreglita: string = 'none';
  cuentaimpor: string = 'none';
  pregunt0: string = 'none';
  preguntita: string = 'none';
  nofunciona: string = 'none';
  ustedsies: string = 'none';

  // toggle
  cita: boolean;
  reglita: boolean = false;
  pregun: boolean = false;
  diarrea: boolean = false;
  funciona: boolean = false;
  sinembargo: boolean = false;
  toggle_parte: boolean = false;
  seg_re: boolean = false;
  f_pago: boolean = false;
  plan_de_pago: number = 0;
  excusa: number = 0;

  //selects
  tipopago: string;
  ssfirmado: string;

  /* --- data---  */
  tipo_id: string;
  numero_id: string;
  licencia_exp: string;


  fecha_cita: string;
  hora_cita: string;
  asignado: string;
  estado_cita: string = '1';
  nombre: string;
  motivo_cita: string;
  nota_cita: string;
  /* data plan pagos */
  nota_plan_inscripcion: string;
  valor_inscripcion: number;
  cuotas_inscripcion: number;
  v0: number = 0;
  v1: number = 0;
  v2: number = 0;
  v3: number = 0;
  v4: number = 0;
  v5: number = 0;
  v6: number = 0;
  v7: number = 0;
  v8: number = 0;
  v9: number = 0;

  f0: string = '';
  f1: string = '';
  f2: string = '';
  f3: string = '';
  f4: string = '';
  f5: string = '';
  f6: string = '';
  f7: string = '';
  f8: string = '';
  f9: string = '';

  /* get data */
  direccion: string;
  puntaje_experian: string;
  puntaje_equifax: string;
  puntaje_trans_u: string;
  nombres: string;
  apellidos: string;
  renta: number;

  ////////////////////////////////////
  id$: string;
  verCli: string;


  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService,
              private CallSer: LlamadasService,
              private router: Router,
              private title: Title)
  {
    title.setTitle('LLAMADAS VENTAS')
    this.Hoy = `${this.funcSer.getFecha()}`
  }

  ngOnInit(): void {
    const s1$ = this.CallSer.llamandoID$.subscribe((r) => {
      let emitID = localStorage.getItem('change');
      if (!emitID) {
        this.id$ = String(r);
        this.verCli = `/vercliente/${this.id$}`;

      } else if (emitID && !r){
        this.id$ = emitID && emitID != '66.99' ? emitID : null;
        this.verCli = `/vercliente/${this.id$}`;
      }
      if (!this.dataCliente) {
        this.getCliente();
      }
    });
    this.httpSer.dataClienteE$.subscribe(
      r => {
        this.dataCliente = r;
        this.puntaje_equifax = r.campos_adicionales.puntaje_equifax? r.campos_adicionales.puntaje_equifax: '';
        this.puntaje_experian = r.campos_adicionales.puntaje_experian? r.campos_adicionales.puntaje_experian: '';
        this.puntaje_trans_u = r.campos_adicionales.puntaje_trans_u? r.campos_adicionales.puntaje_trans_u: '';
        this.renta = r.campos_adicionales.pago_renta? r.campos_adicionales.pago_renta: 0;
        this.direccion = r.direccion? r.direccion: '';
        this.nombres = r.nombres? r.nombres: '';
        this.numero_id = r.numero_id? r.numero_id: '';
        this.apellidos = r.apellidos? r.apellidos: '';
      });
    this.agente = localStorage.getItem('nombre');

  }

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  getCliente(){
    let id:string;
    if (this.id$ && this.id$ != '0' && this.id$ != 'undefined' && this.id$ != 'null' ) {
      id = this.id$;
      this.httpSer.getCliente(id).subscribe(r => {
        this.dataCliente = r;/////// PENDIENTE POR CHECK
        this.nombres = this.dataCliente.nombres;
        this.apellidos = this.dataCliente.apellidos;
        this.dataCliente.campos_adicionales = this.funcSer.creadorDeCamposAd(this.dataCliente);
      }, err => {
        this.funcSer.logWarn('Error GetClient', err)
      });
    }
  }



  agregarCita() {
    let id_asig = localStorage.getItem('id_agente')
    let id = this.dataCliente.id;
    let cita = {
      id_cliente: id,
      fechahora: `${this.fecha_cita} ${this.hora_cita}`,
      motivo: this.motivo_cita,
      notas: this.nota_cita,
      estado: '1',
      id_asignado: id_asig
    }

    if (this.dataCliente.id) {
      this.httpSer.postCita(this.dataCliente.id, cita).subscribe(
        res => {
          Swal.fire({
            title: 'Cita Guardada',
            allowOutsideClick: false,
            icon: 'success',
            text: '',
            showConfirmButton: false,
            timer: 1000
          });
        }, err => {
          Swal.fire({
            title: 'Fallo!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 4000
          });
        }
      )
    }
  }

  enviarData() {
    this.dataCliente.numero_id = this.numero_id;
    this.dataCliente.campos_adicionales.licencia_exp = this.licencia_exp;
    this.dataCliente.nombres = this.nombres;
    this.dataCliente.apellidos = this.apellidos;
    let id = this.id$


    this.httpSer.pacthCliente(this.dataCliente, id).subscribe(
      r => {
        Swal.fire({
          title: 'Datos Guardados',
          allowOutsideClick: false,
          icon: 'success',
          text: '',
          showConfirmButton: false,
          timer: 1000
        });
      }, err => {
        Swal.fire({
          title: 'Fallo!',
          icon: 'error',
          text: 'Ir a Borrador',
          timer: 4000
        });
      }
    );
  }

  enviarPlanPago(){
    let id: string;
    if (this.idR$) id = String(this.idR$);
    if (this.dataCliente) id = this.dataCliente.id;

    let f_p_i:Fechas_pagos = {
      v0: this.v0, f0: this.f0,
      v1: this.v1, f1: this.f1,
      v2: this.v2, f2: this.f2,
      v3: this.v3, f3: this.f3,
      v4: this.v4, f4: this.f4,
      v5: this.v5, f5: this.f5,
      v6: this.v6, f6: this.f6,
      v7: this.v7, f7: this.f7,
      v8: this.v8, f8: this.f8,
      v9: this.v9, f9: this.f9
    }

    this.dataCliente.campos_adicionales.fechas_pagos_inscripcion = f_p_i;
    this.dataCliente.valor_inscripcion = this.valor_inscripcion;
    this.dataCliente.campos_adicionales.cuotas_inscripcion = this.cuotas_inscripcion;
    this.dataCliente.campos_adicionales.nota_plan_inscripcion = this.nota_plan_inscripcion;

    this.httpSer.pacthCliente(this.dataCliente, id).subscribe(
      r => {
        Swal.fire({
          title: 'Datos Guardados',
          allowOutsideClick: false,
          icon: 'success',
          text: '',
          showConfirmButton: false,
          timer: 1000
        });
        this.resetForm();
      }, err => {
        Swal.fire({
          title: 'Fallo!',
          icon: 'error',
          text: 'Ir a Borrador',
          timer: 4000
        });
      }
    );
  }

  resetForm(){
    this.v0 = null; this.f0 = null;
    this.v1 = null; this.f1 = null;
    this.v2 = null; this.f2 = null;
    this.v3 = null; this.f3 = null;
    this.v4 = null; this.f4 = null;
    this.v5 = null; this.f5 = null;
    this.v6 = null; this.f6 = null;
    this.v7 = null; this.f7 = null;
    this.v8 = null; this.f8 = null;
    this.v9 = null; this.f9 = null;
    this.valor_inscripcion = null;
    this.nota_plan_inscripcion = '';
    this.cuotas_inscripcion = null;
    this.f_pago = false;
  }


  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.scrollToBottom();
        this.intro = 'intro';
        break;

      case 'segreglita':
        this.intro = 'none';
        this.segreglita = 'segreglita';
        this.scrollToBottom();
        break;

      case 'cuentaimpor':
        this.cuentaimpor = 'cuentaimpor';
        this.segreglita = 'none';
        this.scrollToBottom();
        this.enviarData();
        break;

      case 'pregunt0':
        this.pregunt0 = 'pregunt0';
        this.cuentaimpor = 'none';
        this.scrollToBottom();
        break;

      case 'preguntita':
        this.scrollToBottom();
        this.preguntita = 'preguntita';
        this.pregunt0 = 'none';
        break;

      case 'nofunciona':
        this.scrollToBottom();
        this.nofunciona = 'nofunciona';
        this.preguntita = 'none';
        break;

      case 'ustedsies':
        this.ustedsies = 'ustedsies';
        this.nofunciona = 'none';
        this.scrollToBottom();
        break;

    }
  }

  regresarP(str: string) {
    switch (str) {

      case 'segreglita':
        this.segreglita = 'none';
        this.intro = 'intro';
        break;

      case 'cuentaimpor':
        this.segreglita = 'segreglita';
        this.cuentaimpor = 'none';
        break;

      case 'pregunt0':
        this.cuentaimpor = 'cuentaimpor';
        this.pregunt0 = 'none';
        break;

      case 'preguntita':
        this.pregunt0 = 'pregunt0';
        this.preguntita = 'none';
        break;

      case 'nofunciona':
        this.preguntita = 'preguntita';
        this.nofunciona = 'none';
        break;


      case 'ustedsies':
        this.nofunciona = 'nofunciona';
        this.ustedsies = 'none';
        break;
    }
  }


}
