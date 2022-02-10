import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RespCalling } from 'src/app/shared/models/otros.model';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech-tax-id',
  templateUrl: './speech-tax-id.component.html',
  styleUrls: ['./speech-tax-id.component.css']
})
export class SpeechTaxIdComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  data$: RespCalling;
  cliente$: Partial<ClientModel>;
  idR$: number;
  idClientePost: number;
  verCli: string;
  Hoy: string;
  E$: Subscription[];
  /* ------------ TOGGLE ------------- */
  intro: string = 'intro';
  segreglita: string = 'none';
  introT: string = 'none';
  tax1_1: string = 'none';
  tax2: string = 'none';
  tax2_1: string = 'none';
  tax2_2: string = 'none';
  tax3: string = 'none';
  tax3_1: string = 'none';
  tax3_2: string = 'none';
  problem: boolean = false;
  conces: boolean = false;
  abrirP: boolean = false;
  aparen: boolean = false;
  menosmal: boolean = false;
  proceso: boolean = false;
  document: boolean = false;
  /* ------------ TOGGLE ------------- */

  /* ------------ diarrea-------------- */
  carro_pagando: string;
  tipo_estadia: string;
  tipo_permiso: string;
  papeles_pareja: string;
  papeles_hijos: string;
  hijos_estado_u: string;
  edad_hijo: string;
  dejar_hijos: string;
  pariente: string;
  /* ------------ diarrea-------------- */
  metodo: string;
  //telmovil: string;
  /* ---------------------------------- */
  acredores: string;
  acredores2: string;
  creditos: string;
  creditos2: string;
  deudas_pendientes: string;
  deudas_pendientes2: string;
  casa: string;
  carro: string;

  //propiedades: string;

  //cita
  fecha_cita: string;
  hora_cita: string;
  asignado: string;
  estado_cita: string = '1';
  nombre: string;
  motivo_cita: string;
  nota_cita: string;

  cita: boolean = false;
  agente: string;

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService,
              private CallSer: LlamadasService,
              private title: Title)
  {
    title.setTitle('TAX ID');
    this.Hoy = `${this.funcSer.getFecha()}`
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() )
    } catch (error) {}
  }

  ngOnInit(): void {
    const E$2 = this.httpSer.extLlamada$.subscribe(r => this.data$ = r);
    const E$3 = this.httpSer.dataClienteE$.subscribe(r => this.cliente$ = r);
    const E$1 = this.CallSer.llamandoID$.subscribe(r => {
      let emitID = localStorage.getItem('change');
      if (!emitID) {
        this.idR$ = r;
        this.verCli = `/vercliente/${this.idR$}`;

      } else if (emitID && !r){
        this.idR$ = Number(emitID && emitID != '66.99' ? emitID : null);
        this.verCli = `/vercliente/${this.idR$}`;
      }
      if (!this.cliente$) {
        this.getCliente();
      }
    });
    this.E$ = [E$1, E$2, E$3];
    this.agente = localStorage.getItem('nombre');
  }

  getCliente(){
    let id:string;
    if (this.idR$ ) {
      id = String(this.idR$);
      this.httpSer.getCliente(id).subscribe(
        (r: Partial<ClientModel>) => {
        this.cliente$ = r;
      }, err => {;
      });
    }
  }


  putClient() {
    this.metodo = 'POST'
    this.cliente$.campos_adicionales.acredores = this.acredores;
    this.cliente$.campos_adicionales.acredores2 = this.acredores2;
    this.cliente$.campos_adicionales.creditos = this.creditos;
    this.cliente$.campos_adicionales.creditos2 = this.creditos2;
    this.cliente$.campos_adicionales.deudas_pendientes = this.deudas_pendientes;
    this.cliente$.campos_adicionales.deudas_pendientes2 = this.deudas_pendientes2;
    this.cliente$.campos_adicionales.carro = Number(this.carro);
    this.cliente$.campos_adicionales.casa = Number(this.casa);

    this.cliente$.campos_adicionales = this.funcSer.creadorDeCamposAd(this.cliente$);

    if (this.data$ && this.data$.numero_entrante) {
      if (!this.idClientePost && this.metodo == 'POST') {
        this.httpSer.putCliente(this.cliente$).subscribe(
          res => {
            this.idClientePost = res['id'];
            this.metodo = 'PACH'
            this.verCli = `/vercliente/${this.idClientePost}`;
            this.httpSer.idClienteE$.emit(this.idClientePost);
            Swal.fire({
              title: 'Guardado',
              allowOutsideClick: false,
              icon: 'success',
              text: 'Cliente Guardado Correctamente',
              showConfirmButton: false,
              timer: 500
            });
          }
        )
      }
      if (this.idR$) {
        this.httpSer.pacthCliente(this.cliente$, String(this.idR$)).subscribe(
          res => {
            this.httpSer.dataClienteE$.emit(this.cliente$);
            Swal.fire({
              title: 'Guardado',
              allowOutsideClick: false,
              icon: 'success',
              text: 'Nuevos Datos Guardados',
              showConfirmButton: false,
              timer: 500
            });
          }
        ), err => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000
          });
        };

      } else if (this.idClientePost) {
        let id = String(this.idClientePost);
        this.httpSer.pacthCliente(this.cliente$, id).subscribe(
          res => {
            this.httpSer.dataClienteE$.emit(this.cliente$);
            Swal.fire({
              title: 'Guardado',
              allowOutsideClick: false,
              icon: 'success',
              text: 'Nuevos Datos Guardados',
              showConfirmButton: false,
              timer: 500
            });
          }
        ), err => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000
          });
        };;
      }
    }
  }


  agregarCita() {
    let id_asig = localStorage.getItem('id_agente')
    let id = this.cliente$.id;
    let cita = {
      id_cliente: id,
      fechahora: `${this.fecha_cita} ${this.hora_cita}`,
      motivo: this.motivo_cita,
      notas: this.nota_cita,
      estado: '1',
      id_asignado: id_asig
    }

    if (this.cliente$.id) {
      this.httpSer.postCita(this.cliente$.id, cita).subscribe(
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

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  cambiarP(str: string) {
    switch (str) {

      case 'introT':
        this.scrollToBottom();
        this.intro = 'none';
        this.introT = 'introT';
        break;

      case 'tax1_1':
        this.scrollToBottom();
        this.introT = 'none';
        this.tax1_1 = 'tax1_1';
        break;

      case 'tax2':
        this.scrollToBottom();
        this.tax1_1 = 'none';
        this.introT = 'none';
        this.tax2 = 'tax2';
        this.putClient();
        break;

      case 'tax2_1':
        this.scrollToBottom();
        this.tax2 = 'none';
        this.tax2_1 = 'tax2_1';
        break;

      case 'tax2_2':
        this.scrollToBottom();
        this.tax2_1 = 'none';
        this.tax2_2 = 'tax2_2';
        break;

      case 'tax3':
        this.scrollToBottom();
        this.tax2_2 = 'none';
        this.tax3 = 'tax3';
        break;

      case 'tax3_1':
        this.scrollToBottom();
        this.tax3 = 'none';
        this.tax3_1 = 'tax3_1';
        break;

      case 'tax3_2':
        this.scrollToBottom();
        this.tax3_1 = 'none';
        this.tax3_2 = 'tax3_2';
        break;

      default:
        break;
    }
  }

  regresarP(str: string) {
    switch (str) {
      case 'introT':
        this.introT = 'none';
        this.intro = 'intro';
        break;

      case 'tax1_1':
        this.tax1_1 = 'none';
        this.introT = 'introT';
        break;

      case 'tax2':
        this.tax2 = 'none';
        this.introT = 'introT';
        break;

      case 'tax2_1':
        this.tax2_1 = 'none';
        this.tax2 = 'tax2';
        break;

      case 'tax2_2':
        this.tax2_2 = 'none';
        this.tax2_1 = 'tax2_1';
        break;

      case 'tax3':
        this.tax3 = 'none';
        this.tax2_2 = 'tax2_2';
        break;

      case 'tax3_1':
        this.tax3_1 = 'none';
        this.tax3 = 'tax3';
        break;

      case 'tax3_2':
        this.tax3_2 = 'none';
        this.tax3_1 = 'tax3_1';
        break;

    }
  }
}
