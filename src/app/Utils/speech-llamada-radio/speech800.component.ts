import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RespCalling } from 'src/app/shared/models/otros.model';
import { Campos_adicionales, ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech800',
  templateUrl: './speech800.component.html',
  styleUrls: ['./speech800.component.css'],
})
export class Speech800Component implements OnInit, OnDestroy, OnChanges {
  @Input() llamando$: boolean;
  @Input() idPadre: string;
  @Output() atrasEmit = new EventEmitter<boolean>();
  @ViewChild('content') content: ElementRef;
  idClientePost: number;
  susb: Subscription[] = [];
  dataC: Partial<ClientModel>;
  num$ : string;
  agente: string;
  metodo: string;
  data$: RespCalling;
  id$: string;

  /* Clases */
  pp: boolean = false;
  llamadasP: string = '';
  llamadaventa2: string = 'llamadaventa2';
  consulta_credito: string = 'consultar credito';
  lamadaventa6: string = 'none';
  ganaSml: string = 'none';
  papeles: string = 'none';
  tieneCasa: string = 'none';
  radio: string = 'none';
  pagRenta: string = 'none';
  autoPago: string = 'none';
  investigacion: string = 'none';
  sueldoSQ: string = 'none';
  propiedades: string = 'none';
  propiedades2: string = 'none';
  resolucion: string = 'none';
  resolucion2: string = 'none';
  resolucion3: string = 'none';
  resolucion4: string = 'none';
  resolucion5: string = 'none';
  resolucion6: string = 'none';
  resolucion7: string = 'none';
  resolucion8: string = 'none';
  resolucion9: string = 'none';
  resolucion10: string = 'none';

  /* Toggles */

  open: boolean;
  credi_BM: string = '';
  //comTax: string = '';
  sicontes: string = '';
  tieneCar: string = '';
  tieneCas: number = 0;
  interesClient: string = '';
  //comTaxImp: string = '';
  //comTaxver: string = '';
  ahorro_anual: number;
  ver_investigacion: number = 0;
  ver_credito: string = '';
  ver_creditoM: string = '';
  peligroso: boolean = false;
  problema: boolean = false;
  dire_toggle: boolean = false;
  dire_rec: boolean;
  wht_ok: boolean;


  exp_m:string;
  exp_y:string;
  h_entra:string;
  h_sale:string;
  mejor_hora_llamar:string;

  /* Save data */
  nombres: string;
  apellidos: string;
  pago_renta: number; //Si
  casa: number = 0; //Si
  carro: number = 0; //Si
  nombres_tarjeta: string; //si
  nacimiento: string; //si
  numero_id: string; //si
  direccion: string; //si
  direccion_reciente: string; //si
  email: string; //si
  id_tarjeta: string; //si
  tipo_tarjeta: number; //si
  tipo_papeles: number;
  cv: string; //si
  //exp: string; //si
  banco: string; //si
  telmovil: string; //si
  telotro: string; //si
  compania_movil: string; //si
  //horariotrabajo: string; //si
  motivacion: string; //si
  tipopago: string; //si
  tipo_ingreso: string; //si
  salario: number; //si
  credito_check: string; //si
  sueldoS_Q: string; //si
  call_trabajo: string; //si
  valor_inscripcion: number; //si
  valor_mensualidad: number; //si
  plan_mes: number; //si
  capacidad_ahorro: number; //si

  apartamento: string; //pendiente
  ciudad: string; //pendiente
  estado: string; //pendiente
  zipcode: string; //pendiente
  banco_cheque: string; //pendiente

  apartamento_reciente: string;  // datos nuevos for mack
  ciudad_reciente: string; // datos nuevos for mack
  estado_reciente: string; // datos nuevos for mack
  zipcode_reciente: string; // datos nuevos for mack


  verCli: string;
  puntaje: string;
  //colecciones: string;

  puntaje_experian: string;
  puntaje_equifax: string;
  puntaje_trans_u: string;
//////////////////////
  x:any;
  teltrabajo: any;
  telcasa: any;
  tel_wh_ok: string;
  last_trabajo: any;

  constructor(  private funcionC: FuncionesComunesService,
                private CallSer: LlamadasService,
                private httpSer: AuthService,
                private title: Title )
  {
    title.setTitle('LLAMADA DE RADIO');
    this.ahorro_anual = this.capacidad_ahorro * 12 * 30;
    this.open = false;
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c.llamando$.currentValue) {
      this.llamando$ = c.llamando$.currentValue;
    }
  }

  ngOnDestroy(): void {
    try {
      this.susb.forEach(a => a.unsubscribe());
    } catch (error) {}
  }

  ngOnInit(): void {
    const E$1 = this.httpSer.llamadaSaliente$.subscribe(r => {
      this.llamando$ = r;
    });
    this.agente = localStorage.getItem('nombre');
    this.susb.push(E$1)
    this.observers();
  }

  scrollToBottom(): void {
    try {
      this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  observers(){
    const s1$ = this.CallSer.llamandoID$.subscribe((r) => {
      let emitID = localStorage.getItem('change');
      if (!emitID) {
        this.id$ = String(r);
        this.verCli = `/vercliente/${this.id$}`;

      } else if (emitID && !r){
        this.id$ = emitID && emitID != '66.99' ? emitID : null;
        this.verCli = `/vercliente/${this.id$}`;
      }
      if (!this.dataC) {
        this.getCliente();
      }
    });
    const s2$ = this.httpSer.dataClienteE$.subscribe(r => {
      this.dataC = r;

    });
    const s3$ = this.httpSer.extLlamada$.subscribe((r) =>{
      this.data$ = r;
      this.num$ = r? r.numero_entrante: '';
    });
    this.susb = this.susb.concat([s1$, s2$, s3$], this.susb);
  }

  getCliente(){
    let id:string;
    if (this.id$ && this.id$ != '0' && this.id$ != 'undefined' && this.id$ != 'null' ) {
      id = this.id$;
      this.httpSer.getCliente(id).subscribe(r => {
        this.dataC = r;
        this.nombres = this.dataC.nombres;
        this.apellidos = this.dataC.apellidos;
        this.dataC.campos_adicionales = this.funcionC.creadorDeCamposAd(this.dataC);

      }, err => {
        this.funcionC.logWarn('Error GetClient', err)
      });
    }else if (this.idPadre) {
      id = this.idPadre;
    }
  }

  putCliente() {
    this.metodo = 'POST';
    let dataX:Partial<ClientModel>;
    if (!this.dataC) {
      dataX = {
        nombres: this.nombres? this.nombres: '',
        apellidos: this.apellidos? this.apellidos: '',
        telmovil: this.telmovil? this.telmovil: this.data$.numero_entrante,
        salario: this.salario ? Number(this.salario) : 0,
        nacimiento: this.nacimiento ? this.nacimiento : '2000-01-01',
        numero_id: this.numero_id ? this.numero_id : '',
        direccion: this.direccion ? this.direccion : '',
        email: this.email ? this.email : '',
        telotro: this.telotro ? this.telotro : '',
        telcasa: this.telcasa ? this.telcasa : '',
        teltrabajo: this.teltrabajo ? this.teltrabajo : '',
        horariotrabajo: this.h_entra && this.h_sale ? `${this.h_entra} a ${this.h_sale}` : '',
        valor_inscripcion: this.valor_inscripcion ? this.valor_inscripcion : 0,
        valor_mensualidad: this.valor_mensualidad ? this.valor_mensualidad : 0,
        plan_mes: this.plan_mes ? this.plan_mes : 0,
        zipcode: 0,
        tipo_id: 0,

        campos_adicionales: {
          apartamento_reciente: this.apartamento_reciente ? this.apartamento_reciente : '' ,
          ciudad_reciente: this.ciudad_reciente ? this.ciudad_reciente : '', // datos nuevos for mack
          estado_reciente: this.estado_reciente ? this.estado_reciente: '', // datos nuevos for mack
          zipcode_reciente: this.zipcode_reciente ? this.zipcode_reciente : '', // datos nuevos for mack

          last_trabajo: this.last_trabajo? this.last_trabajo: '',
          mejor_hora_llamar: this.mejor_hora_llamar? this.mejor_hora_llamar: '',
          tel_wh_ok: this.tel_wh_ok? this.tel_wh_ok: '',
          telwht: this.telmovil? this.telmovil: '',
          id_tarjeta: this.id_tarjeta ? this.id_tarjeta : '',
          motivacion: this.motivacion ? this.motivacion : '',
          tipopago: this.tipopago ? this.tipopago : '',
          banco: this.banco ? this.banco : '',
          call_trabajo: this.call_trabajo ? this.call_trabajo : '',
          carro: this.carro ? Number(this.carro) : 0,
          casa: this.casa ? Number(this.casa) : 0,
          compania_movil: this.compania_movil ? this.compania_movil : '',
          credito_check: this.credito_check ? this.credito_check : '',
          cv: this.cv ? this.cv : '',
          direccion_reciente: this.direccion_reciente
            ? this.direccion_reciente
            : '',
          exp: this.exp_m && this.exp_y ? `${this.exp_m}/${this.exp_y}` : '',
          nombres_tarjeta: this.nombres_tarjeta ? this.nombres_tarjeta : '',
          pago_renta: this.pago_renta ? Number(this.pago_renta) : null,
          sueldoS_Q: this.sueldoS_Q ? this.sueldoS_Q : '',
          tipo_ingreso: this.tipo_ingreso ? this.tipo_ingreso : '',

          tipo_tarjeta: this.tipo_tarjeta ? Number(this.tipo_tarjeta) : null,
          tipo_papeles: this.tipo_papeles ? Number(this.tipo_papeles) : null,
          capacidad_ahorro: this.capacidad_ahorro ? this.capacidad_ahorro : 0,

          puntaje_experian: this.puntaje_experian? this.puntaje_experian: '',
          puntaje_equifax: this.puntaje_equifax? this.puntaje_equifax: '',
          puntaje_trans_u: this.puntaje_trans_u? this.puntaje_trans_u: '',
        },
      };
      dataX.campos_adicionales = this.funcionC.creadorDeCamposAd(dataX);
    }

    if (this.id$) {
      this.idClientePost = Number(this.id$)
    }
    if (this.idPadre) {
      this.idClientePost = Number(this.idPadre);
      this.getCliente();
    }

    /// REGISTRA EL NUEVO CLIENTE
    if (!this.idClientePost && this.metodo == 'POST'&& this.data$ && this.data$.numero_entrante) {
      this.httpSer.putCliente(dataX).subscribe((res) => {
        /// GUARDA EL ID DEL CLIENTE RECIEN REGISTRADO
        this.idClientePost = res['id'];
        this.metodo = 'PACH';
        this.verCli = `/vercliente/${this.idClientePost}`;
        this.httpSer.idClienteE$.emit(this.idClientePost);
        Swal.fire({
          title: 'Guardado',
          allowOutsideClick: false,
          icon: 'success',
          text: 'Cliente Guardado Correctamente',
          showConfirmButton: false,
          timer: 500,
        });
      });
    }

    if (this.idClientePost) {
      let id = String(this.idClientePost);
      this.httpSer.pacthCliente(dataX, id).subscribe((res) => {
        Swal.fire({
          title: 'Guardado',
          allowOutsideClick: false,
          icon: 'success',
          text: 'Nuevos Datos Guardados',
          showConfirmButton: false,
          timer: 500,
        });
      }),
        (err) => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000,
          });
        };
    }
  }

  cambiarP(str: string) {
    switch (str) {
      case 'consulta_credito':
        this.scrollToBottom();
        this.consulta_credito = 'consulta_credito pb-3';
        this.llamadaventa2 = 'none';
        //this.putCliente();
        break;

      case 'radio':
        this.scrollToBottom();
        this.radio = 'none';
        this.lamadaventa6 = 'lamadaventa6';
        //this.putCliente();
        break;

      case 'papeles':
        this.scrollToBottom();
        this.lamadaventa6 = 'none';
        this.papeles = 'papeles';
       // this.putCliente();
        break;

      case 'ganaSml':
        this.scrollToBottom();
        this.lamadaventa6 = 'none';
        this.ganaSml = 'ganaSml';
       // this.putCliente();
        break;

      case 'autoPago':
        this.scrollToBottom();
        this.lamadaventa6 = 'none';
        this.ganaSml = 'none';
        this.autoPago = 'autoPago';
       // this.putCliente();
        break;

      case 'autoPagoX':
        this.scrollToBottom();
        this.lamadaventa6 = 'none';
        this.ganaSml = 'none';
        this.papeles = 'none';
        this.autoPago = 'autoPago';
       // this.putCliente();
        break;

      case 'tieneCasa':
        this.scrollToBottom();
        this.autoPago = 'none';
        this.pagRenta = 'none';
        this.tieneCasa = 'tieneCasa';
       // this.putCliente();
        break;

      case 'pagRenta':
        this.scrollToBottom();
        this.autoPago = 'none';
        this.pagRenta = 'pagRenta';
       // this.putCliente();
        break;

      case 'consulta_credito2':
        this.scrollToBottom();
        this.radio = 'consulta_credito2';
        this.consulta_credito = 'none';
       // this.putCliente();
        break;

      case 'consulta_credito2Emplazado':
        this.peligroso = true;
        this.radio = 'consulta_credito2';
        this.consulta_credito = 'none';
        this.scrollToBottom();
       // this.putCliente();
        break;

      case 'investigacion':
        this.scrollToBottom();
        this.investigacion = 'investigacion';
        this.consulta_credito = 'none';
       // this.putCliente();
        break;

      case 'sueldoSQ':
        this.scrollToBottom();
        this.investigacion = 'none';
        this.sueldoSQ = 'sueldoSQ';
       // this.putCliente();
        break;

      case 'propiedades':
        this.scrollToBottom();
        this.sueldoSQ = 'none';
        this.propiedades = 'propiedades';
       // this.putCliente();
        break;

        case 'propiedades2':
        this.scrollToBottom();
        this.propiedades = 'none';
        this.propiedades2 = 'propiedades2';
       // this.putCliente();
        break;

      case 'resolucion':
        this.scrollToBottom();
        this.propiedades2 = 'none';
        this.resolucion = 'resolucion';
       // this.putCliente();
        break;

      case 'resolucion2':
        this.scrollToBottom();
        this.resolucion = 'none';
        this.resolucion2 = 'resolucion2';
       // this.putCliente();
        break;

      case 'resolucion3':
        this.scrollToBottom();
        this.tieneCasa = 'none';
        this.pagRenta = 'none';
        this.resolucion3 = 'resolucion3';
       // this.putCliente();
        break;

      case 'resolucion4':
        this.scrollToBottom();
        this.resolucion3 = 'none';
        this.resolucion4 = 'resolucion4';
       // this.putCliente();
        break;

      case 'resolucion5':
        this.scrollToBottom();
        this.resolucion4 = 'none';
        this.resolucion5 = 'resolucion5';
       // this.putCliente();
        break;

      case 'resolucion6':
        this.scrollToBottom();
        this.resolucion5 = 'none';
        this.resolucion6 = 'resolucion6';
       // this.putCliente();
        break;

      case 'resolucion7':
        this.scrollToBottom();
        this.resolucion6 = 'none';
        this.resolucion7 = 'resolucion7';
       // this.putCliente();
        break;

      case 'resolucion8':
        this.wht_ok = true;
        this.scrollToBottom();
        this.resolucion7 = 'none';
        this.resolucion8 = 'resolucion8';
       // this.putCliente();
        break;

      case 'resolucion9':
        this.scrollToBottom();
        this.resolucion8 = 'none';
        this.resolucion9 = 'resolucion9';
       // this.putCliente();
        break;

      case 'resolucion10':
        this.scrollToBottom();
        this.resolucion9 = 'none';
        this.resolucion10 = 'resolucion10';
       // this.putCliente();
        break;

      default:
        break;
    }
  }

  regresarP(str: string) {
    switch (str) {
      case 'radio':
        this.radio = 'none';
        this.consulta_credito = 'consulta_credito';
        console.log('atras');
        this.atrasEmit.emit(false);
        break;

      case 'lamadaventa6':
        this.lamadaventa6 = 'none';
        this.radio = 'radio';
        break;

      case 'ganaSml':
        this.ganaSml = 'none';
        this.lamadaventa6 = 'lamadaventa6';
        break;

      case 'papeles':
        this.papeles = 'none';
        this.ganaSml = 'ganaSml';
        break;

      case 'autoPago':
        this.autoPago = 'none';
        this.papeles = 'papeles';
        break;

      case 'tieneCasa':
        ///////////
        this.tieneCasa = 'none';
        //this.autoPago = 'autoPago';
        this.pagRenta = 'pagRenta'
        break;

      case 'tieneCasa2':
        this.tieneCasa = 'tieneCasa';
        this.resolucion3 = 'none';
        break;

      case 'pagRenta':
        this.pagRenta = 'none';
        this.autoPago = 'autoPago';
        break;

      case 'resolucion3':
        this.resolucion3 = 'none';
        this.pagRenta = 'pagRenta';
        break;

      case 'resolucion4':
        this.resolucion4 = 'none';
        this.resolucion3 = 'resolucion3';
        break;

      case 'resolucion5':
        this.resolucion5 = 'none';
        this.resolucion4 = 'resolucion4';
        break;

      case 'resolucion6':
        this.resolucion6 = 'none';
        this.resolucion5 = 'resolucion5';
        break;

      case 'resolucion7':
        this.resolucion7 = 'none';
        this.resolucion6 = 'resolucion6';
        break;

      case 'resolucion8':
        this.resolucion8 = 'none';
        this.resolucion7 = 'resolucion7';
        break;

      case 'resolucion9':
        this.resolucion9 = 'none';
        this.resolucion8 = 'resolucion8';
        break;

      case 'resolucion10':
        this.resolucion10 = 'none';
        this.resolucion9 = 'resolucion9';
        break;
    }
  }

  creadorData(): Partial<ClientModel>{
    let dataADC: Campos_adicionales = this.dataC.campos_adicionales;

    this.dataC.nombres = this.nombres? this.nombres: this.dataC.nombres;
    this.dataC.apellidos = this.apellidos? this.apellidos: this.dataC.apellidos;
    this.dataC.telmovil =  this.data$.numero_entrante;
    this.dataC.salario = this.salario? this.salario: this.dataC.salario;
    this.dataC.nacimiento = this.nacimiento? this.nacimiento: this.dataC.nacimiento;
    this.dataC.numero_id = this.numero_id? this.numero_id: this.dataC.numero_id;
    this.dataC.direccion = this.direccion? this.direccion: this.dataC.direccion;
    this.dataC.telotro = this.telotro? this.telotro: this.dataC.telotro;
    this.dataC.horariotrabajo =this.h_entra && this.h_sale ? `${this.h_entra} a ${this.h_sale}`: this.dataC.horariotrabajo;
    this.dataC.valor_inscripcion = this.valor_inscripcion? this.valor_inscripcion: this.dataC.valor_inscripcion;
    this.dataC.valor_mensualidad = this.valor_mensualidad? this.valor_mensualidad: this.dataC.valor_mensualidad;
    this.dataC.plan_mes = this.plan_mes? this.plan_mes: this.dataC.plan_mes;
    this.dataC.zipcode = this.dataC.zipcode? this.dataC.zipcode: 0;
    this.dataC.salario = this.dataC.salario? this.dataC.salario: 0;
    this.dataC.plan_mes = this.dataC.plan_mes? this.dataC.plan_mes: 0;
    this.dataC.tipo_id = this.dataC.tipo_id? this.dataC.tipo_id: 0;

    this.dataC.campos_adicionales.id_tarjeta = this.id_tarjeta ? this.id_tarjeta : dataADC.id_tarjeta;
    this.dataC.campos_adicionales.motivacion = this.motivacion ? this.motivacion : dataADC.motivacion;
    this.dataC.campos_adicionales.tipo_ingreso = this.tipopago ? this.tipopago : dataADC.tipopago;
    this.dataC.campos_adicionales.banco = this.banco ? this.banco : dataADC.banco;
    this.dataC.campos_adicionales.call_trabajo = this.call_trabajo ? this.call_trabajo : dataADC.call_trabajo;
    this.dataC.campos_adicionales.carro = this.carro ? Number(this.carro) : dataADC.carro;
    this.dataC.campos_adicionales.casa = this.casa ? Number(this.casa) : dataADC.casa;
    this.dataC.campos_adicionales.compania_movil = this.compania_movil ? this.compania_movil : dataADC.compania_movil;
    this.dataC.campos_adicionales.credito_check = this.credito_check ? this.credito_check : dataADC.credito_check;
    this.dataC.campos_adicionales.cv = this.cv ? this.cv : dataADC.cv;
    this.dataC.campos_adicionales.direccion_reciente = this.direccion_reciente? this.direccion_reciente : dataADC.direccion_reciente;
    this.dataC.campos_adicionales.exp = this.exp_m && this.exp_y ? `${this.exp_m}/${this.exp_y}` : dataADC.exp;
    this.dataC.campos_adicionales.nombres_tarjeta = this.nombres_tarjeta ? this.nombres_tarjeta : dataADC.nombres_tarjeta;
    this.dataC.campos_adicionales.pago_renta = this.pago_renta ? Number(this.pago_renta) : dataADC.pago_renta;
    this.dataC.campos_adicionales.sueldoS_Q =  this.sueldoS_Q ? this.sueldoS_Q : dataADC.sueldoS_Q;
    this.dataC.campos_adicionales.tipo_ingreso = this.tipo_ingreso ? this.tipo_ingreso : dataADC.tipo_ingreso;
    this.dataC.campos_adicionales.tipo_tarjeta = this.tipo_tarjeta ? Number(this.tipo_tarjeta) : dataADC.tipo_tarjeta;
    this.dataC.campos_adicionales.tipo_papeles = this.tipo_papeles ? Number(this.tipo_papeles) : dataADC.tipo_papeles;
    this.dataC.campos_adicionales.capacidad_ahorro =  this.capacidad_ahorro ? Number(this.capacidad_ahorro) : dataADC.capacidad_ahorro;
    this.dataC.campos_adicionales.puntaje_experian = this.puntaje_experian? this.puntaje_experian: dataADC.puntaje_experian;
    this.dataC.campos_adicionales.puntaje_equifax = this.puntaje_equifax? this.puntaje_equifax: dataADC.puntaje_equifax;
    this.dataC.campos_adicionales.puntaje_trans_u = this.puntaje_trans_u? this.puntaje_trans_u: dataADC.puntaje_trans_u;
    this.dataC.campos_adicionales.telwht = this.telmovil? this.telmovil: dataADC.telwht;
    this.dataC.campos_adicionales.tel_wh_ok = this.tel_wh_ok? this.tel_wh_ok: dataADC.tel_wh_ok;
    this.dataC.campos_adicionales.mejor_hora_llamar = this.mejor_hora_llamar? this.mejor_hora_llamar: dataADC.mejor_hora_llamar;

    return this.dataC;
  }

}
