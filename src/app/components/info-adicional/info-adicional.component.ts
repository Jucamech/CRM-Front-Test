import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DIA_PAY, ESTADOS, SUELDO_S_Q, TIPO_ID, TIPO_INGRESO } from 'src/app/shared/constants/clientes';
import { CANTI_N, DIAL_ALEY, DIAL_LAMEGA, DIAL_LATINA, DIAL_RPODER, EMISORAS, REDES } from 'src/app/shared/constants/emisoras';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-info-adicional',
  templateUrl: './info-adicional.component.html',
  styleUrls: ['./info-adicional.component.css']
})
export class InfoAdicionalComponent implements OnInit {
  @Output() enviarForm = new EventEmitter<ClientModel>();
  @Output() emitReset = new EventEmitter<boolean>();
  @Input() formuPostClient2: Partial<ClientModel>;

  @Input() set reset(val: boolean){
    if (val) {
      this.ngOnInit();
      this.emitReset.emit(false);
    }
  };
  tipos_id = TIPO_ID;
  dataCliente: any;
  TipoPeticion: number;

  cliInfoA: ClientModel;
  dataX;

  id_ref: string;
  nombre_ref: string;
  is_ref: boolean = false;
  mostrar_btn_ref: boolean = true;

  tipo_id: number;
  numero_id: string;
  licencia: number;
  robo_identidad: number;

  salario: number;
  tipopago: string;
  empleador: string;
  horariotrabajo: string;

  dialibre: string;
  otraactividad: string;
  horaduerme: string;
  horalevanta: string;

  reportex3: number;
  contrato_enviado: number;
  contrato_firmado: number;



  //campos adicionales
  sueldoS_Q: number;
  dia_llamar: string;
  dia_pagoS: number;
  dia_pago: number;
  dia_pago2: number;
  pago_renta: number;
  carro: number;
  casa: number;
  compania_movil: string;
  call_trabajo: string;
  credito_check: string;
  tipo_ingreso: string;
  mejor_hora_llamar: string;
  tel_wh_ok: string;
  referido: string;

  acredores: string;
  acredores2: string;
  creditos: string;
  creditos2: string;
  deudas_pendientes: string;
  deudas_pendientes2: string;

  puntaje_equifax: string;
  puntaje_experian: string;
  puntaje_trans_u: string;
  capacidad_ahorro: number;

  id_tarjeta: string;
  cv: string;
  exp: string;
  nombres_tarjeta: string;
  tipo_tarjeta: string;
  banco: string;
  banco_cheque: string;

  emisora: string;
  redes: string;
  dial: string;

  direccion_reciente: string;
  apartamento_reciente: string;
  ciudad_reciente: string;
  estado_reciente: string;
  zipcode_reciente: string;

  id_tarjetaE: boolean = false;
  cvE: boolean = false;
  expE: boolean = false;
  nombres_tarjetaE: boolean = false;
  tipo_tarjetaE: boolean = false;
  bancoE: boolean = false;
  banco_chequeE: boolean = false;

  // min campos ad
  rating: string;
  inicio: string;

  arrDias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  E$: Subscription[] = [];
  emisoras = EMISORAS;
  redesE = REDES;
  aly = DIAL_ALEY;
  l_m = DIAL_LAMEGA;
  ltn = DIAL_LATINA;
  pod = DIAL_RPODER;
  ca_n = CANTI_N;
  tipo_ing = TIPO_INGRESO;
  suelSQ =SUELDO_S_Q;
  dias_p = DIA_PAY;
  estados = ESTADOS;
  copia: ClientModel;
  idSuper: string;

  constructor(private httpServ: AuthService,
              private router: Router,
              private clientSer: ClientesService,
              private funcSer: FuncionesComunesService,
              private activateRoute: ActivatedRoute)
  {
    this.dataCliente = httpServ.idC;
    this.idSuper = localStorage.getItem('id_agente');
  }

  ngOnInit(): void {
    this.TipoPeticion = this.httpServ.TipoPet
    let idp = this.activateRoute.snapshot.params.id;
    const E$2 = this.clientSer.ClientEmit$.subscribe( res => {
      this.copia = res;
      this.cliInfoA = res;
      E$2.unsubscribe();
    });
    if (!this.TipoPeticion && !this.cliInfoA) {
      this.getCliente(idp);
    } else if (this.TipoPeticion == 1) {
      this.completarDataForm2();
    }
  }
  /** Inyecta la data devuelve ver Cliente */
  private completarDataForm2():void{
    if (this.formuPostClient2) {

      this.tipo_id = Number(this.formuPostClient2.tipo_id ? this.formuPostClient2.tipo_id : 0);
      this.numero_id = this.formuPostClient2.numero_id ? this.formuPostClient2.numero_id : '';
      this.licencia = Number(this.formuPostClient2.licencia ? this.formuPostClient2.licencia : 0);
      this.robo_identidad = Number(this.formuPostClient2.robo_identidad ? this.formuPostClient2.robo_identidad : 0);

      this.salario = Number(this.formuPostClient2.salario ? this.formuPostClient2.salario : 0);
      this.empleador = this.formuPostClient2.empleador ? this.formuPostClient2.empleador : '';
      this.horariotrabajo = this.formuPostClient2.horariotrabajo ? this.formuPostClient2.horariotrabajo : '';

      this.dialibre = this.formuPostClient2.dialibre ? this.formuPostClient2.dialibre : '';
      this.otraactividad = this.formuPostClient2.otraactividad ? this.formuPostClient2.otraactividad : '';
      this.horaduerme = this.formuPostClient2.horaduerme ? this.formuPostClient2.horaduerme : '';
      this.horalevanta = this.formuPostClient2.horalevanta ? this.formuPostClient2.horalevanta : '';

      this.reportex3 = Number(this.formuPostClient2.reportex3 ? this.formuPostClient2.reportex3 : 0);
      this.contrato_enviado = Number(this.formuPostClient2.contrato_enviado ? this.formuPostClient2.contrato_enviado : 0);
      this.contrato_firmado = Number(this.formuPostClient2.contrato_firmado ? this.formuPostClient2.contrato_firmado : 0);

      /* campos adicionales */
      this.capacidad_ahorro = Number(this.formuPostClient2.campos_adicionales.capacidad_ahorro ? this.formuPostClient2.campos_adicionales.capacidad_ahorro : null);

      this.sueldoS_Q = Number(this.formuPostClient2.campos_adicionales.sueldoS_Q ? this.formuPostClient2.campos_adicionales.sueldoS_Q : 0);
      this.dia_llamar = this.formuPostClient2.campos_adicionales.dia_llamar ? this.formuPostClient2.campos_adicionales.dia_llamar : '';
      this.dia_pagoS = Number(this.formuPostClient2.campos_adicionales.dia_pagoS ? this.formuPostClient2.campos_adicionales.dia_pagoS : 0);
      this.dia_pago = Number(this.formuPostClient2.campos_adicionales.dia_pago ? this.formuPostClient2.campos_adicionales.dia_pago : 0);
      this.dia_pago2 = Number(this.formuPostClient2.campos_adicionales.dia_pago2 ? this.formuPostClient2.campos_adicionales.dia_pago2 : 0);
      this.pago_renta = Number(this.formuPostClient2.campos_adicionales.pago_renta ? this.formuPostClient2.campos_adicionales.pago_renta : 0);
      this.carro = Number(this.formuPostClient2.campos_adicionales.carro ? this.formuPostClient2.campos_adicionales.carro : 0);
      this.casa = Number(this.formuPostClient2.campos_adicionales.casa ? this.formuPostClient2.campos_adicionales.casa : 0);
      this.call_trabajo = this.formuPostClient2.campos_adicionales.call_trabajo ? this.formuPostClient2.campos_adicionales.dia_llamar : '';
      this.credito_check = this.formuPostClient2.campos_adicionales.credito_check ? this.formuPostClient2.campos_adicionales.credito_check : '';
      this.tipo_ingreso = this.formuPostClient2.campos_adicionales.tipo_ingreso ? this.formuPostClient2.campos_adicionales.tipo_ingreso : '';
      this.compania_movil = this.formuPostClient2.campos_adicionales.compania_movil ? this.formuPostClient2.campos_adicionales.compania_movil : '';
      this.mejor_hora_llamar = this.formuPostClient2.campos_adicionales.mejor_hora_llamar ? this.formuPostClient2.campos_adicionales.mejor_hora_llamar : '';
      this.tel_wh_ok = this.formuPostClient2.campos_adicionales.tel_wh_ok ? this.formuPostClient2.campos_adicionales.tel_wh_ok : 'no';
      this.banco_cheque = this.formuPostClient2.campos_adicionales.banco_cheque ? this.formuPostClient2.campos_adicionales.banco_cheque : '';

      this.acredores = this.formuPostClient2.campos_adicionales.acredores? this.formuPostClient2.campos_adicionales.acredores: '';
      this.acredores2 = this.formuPostClient2.campos_adicionales.acredores2? this.formuPostClient2.campos_adicionales.acredores2: '';
      this.creditos = this.formuPostClient2.campos_adicionales.creditos? this.formuPostClient2.campos_adicionales.creditos: '';
      this.creditos2 = this.formuPostClient2.campos_adicionales.creditos2? this.formuPostClient2.campos_adicionales.creditos2: '';
      this.deudas_pendientes = this.formuPostClient2.campos_adicionales.deudas_pendientes? this.formuPostClient2.campos_adicionales.deudas_pendientes: '';
      this.deudas_pendientes2 = this.formuPostClient2.campos_adicionales.deudas_pendientes2? this.formuPostClient2.campos_adicionales.deudas_pendientes2: '';
      this.puntaje_equifax = this.formuPostClient2.campos_adicionales.puntaje_equifax? this.formuPostClient2.campos_adicionales.puntaje_equifax: '';
      this.puntaje_experian = this.formuPostClient2.campos_adicionales.puntaje_experian ? this.formuPostClient2.campos_adicionales.puntaje_experian: '';
      this.puntaje_trans_u = this.formuPostClient2.campos_adicionales.puntaje_trans_u? this.formuPostClient2.campos_adicionales.puntaje_trans_u: '';
      this.emisora = this.formuPostClient2.campos_adicionales.emisora? this.formuPostClient2.campos_adicionales.emisora: '';
      this.redes = this.formuPostClient2.campos_adicionales.redes? this.formuPostClient2.campos_adicionales.redes: '';

      this.direccion_reciente = this.formuPostClient2.campos_adicionales.direccion_reciente ? this.formuPostClient2.campos_adicionales.direccion_reciente : '';
      this.apartamento_reciente = this.formuPostClient2.campos_adicionales.apartamento_reciente ? this.formuPostClient2.campos_adicionales.apartamento_reciente : '';
      this.ciudad_reciente = this.formuPostClient2.campos_adicionales.ciudad_reciente ? this.formuPostClient2.campos_adicionales.ciudad_reciente : '';
      this.zipcode_reciente = this.formuPostClient2.campos_adicionales.zipcode_reciente ? this.formuPostClient2.campos_adicionales.zipcode_reciente : '';
      this.estado_reciente = this.formuPostClient2.campos_adicionales.estado_reciente ? this.formuPostClient2.campos_adicionales.estado_reciente : '';

    }
  }

  private getCliente(id: string) {
    this.clientSer.getCliente(id).then(( res: ClientModel ) => {
      this.cliInfoA = res;
      this.tipo_id = Number(this.cliInfoA.tipo_id ? this.cliInfoA.tipo_id : 0);
      this.numero_id = this.cliInfoA.numero_id ? this.cliInfoA.numero_id : '';
      this.licencia = this.cliInfoA.licencia ? this.cliInfoA.licencia : 0;
      this.robo_identidad = this.cliInfoA.robo_identidad ? this.cliInfoA.robo_identidad : 0;

      this.salario = Number(this.cliInfoA.salario ? this.cliInfoA.salario : 0);
      this.empleador = this.cliInfoA.empleador ? this.cliInfoA.empleador : '';
      this.horariotrabajo = this.cliInfoA.horariotrabajo ? this.cliInfoA.horariotrabajo : '';

      this.dialibre = this.cliInfoA.dialibre ? this.cliInfoA.dialibre : '';
      this.otraactividad = this.cliInfoA.otraactividad ? this.cliInfoA.otraactividad : '';
      this.horaduerme = this.cliInfoA.horaduerme ? this.cliInfoA.horaduerme : '';
      this.horalevanta = this.cliInfoA.horalevanta ? this.cliInfoA.horalevanta : '';

      this.reportex3 = this.cliInfoA.reportex3 ? this.cliInfoA.reportex3 : null;
      this.contrato_enviado = this.cliInfoA.contrato_enviado ? this.cliInfoA.contrato_enviado : 0;
      this.contrato_firmado = this.cliInfoA.contrato_firmado ? this.cliInfoA.contrato_firmado : 0;

      this.capacidad_ahorro = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.capacidad_ahorro ? this.cliInfoA.campos_adicionales.capacidad_ahorro : null);

      ///campos adicionales
      this.sueldoS_Q = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.sueldoS_Q ? this.cliInfoA.campos_adicionales.sueldoS_Q : 0);
      this.dia_llamar = this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.dia_llamar ? this.cliInfoA.campos_adicionales.dia_llamar : '';
      this.dia_pagoS = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.dia_pagoS ? this.cliInfoA.campos_adicionales.dia_pagoS : '');
      this.dia_pago = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.dia_pago ? this.cliInfoA.campos_adicionales.dia_pago : 0);
      this.dia_pago2 = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.dia_pago2 ? this.cliInfoA.campos_adicionales.dia_pago2 : 0);
      this.pago_renta = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.pago_renta ? this.cliInfoA.campos_adicionales.pago_renta : 0);
      this.carro = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.carro ? this.cliInfoA.campos_adicionales.carro : 0);
      this.casa = Number(this.cliInfoA.campos_adicionales && this.cliInfoA.campos_adicionales.casa ? this.cliInfoA.campos_adicionales.casa : 0);
      this.call_trabajo = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.call_trabajo ? this.cliInfoA.campos_adicionales.call_trabajo : '';
      this.credito_check = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.credito_check ? this.cliInfoA.campos_adicionales.credito_check : '';
      this.tipo_ingreso = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.tipo_ingreso ? this.cliInfoA.campos_adicionales.tipo_ingreso : '';
      this.compania_movil = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.compania_movil ? this.cliInfoA.campos_adicionales.compania_movil : '';
      this.mejor_hora_llamar = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.mejor_hora_llamar ? this.cliInfoA.campos_adicionales.mejor_hora_llamar : '';
      this.tel_wh_ok = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.tel_wh_ok ? this.cliInfoA.campos_adicionales.tel_wh_ok : 'no';
      this.banco_cheque = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.banco_cheque ? this.cliInfoA.campos_adicionales.banco_cheque : '';

      this.acredores = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.acredores? this.cliInfoA.campos_adicionales.acredores: '';
      this.acredores2 = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.acredores2? this.cliInfoA.campos_adicionales.acredores2: '';
      this.creditos = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.creditos? this.cliInfoA.campos_adicionales.creditos: '';
      this.creditos2 = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.creditos2? this.cliInfoA.campos_adicionales.creditos2: '';
      this.deudas_pendientes = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.deudas_pendientes? this.cliInfoA.campos_adicionales.deudas_pendientes: '';
      this.deudas_pendientes2 = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.deudas_pendientes2? this.cliInfoA.campos_adicionales.deudas_pendientes2: '';
      this.puntaje_equifax = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.puntaje_equifax? this.cliInfoA.campos_adicionales.puntaje_equifax: '';
      this.puntaje_experian = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.puntaje_experian ? this.cliInfoA.campos_adicionales.puntaje_experian: '';
      this.puntaje_trans_u = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.puntaje_trans_u? this.cliInfoA.campos_adicionales.puntaje_trans_u: '';

      this.emisora      = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.emisora ? this.cliInfoA.campos_adicionales.emisora: '';
      this.redes        = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.redes   ? this.cliInfoA.campos_adicionales.redes: '';
      this.referido     = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.referido? this.cliInfoA.campos_adicionales.referido: '';

      this.id_tarjeta = null;
      this.cv = null;
      this.exp = null;
      this.nombres_tarjeta = null;
      this.tipo_tarjeta = null;
      this.banco = null;

      this.id_tarjetaE = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.id_tarjeta ? true : false;
      this.cvE =  this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.cv ? true : false;
      this.expE =  this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.exp ? true : false;
      this.nombres_tarjetaE =  this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.nombres_tarjeta ? true : false;
      this.tipo_tarjetaE =  this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.tipo_tarjeta ? true : false;
      this.bancoE =  this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.banco ? true : false;

      this.direccion_reciente = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.direccion_reciente ? this.cliInfoA.campos_adicionales.direccion_reciente : '';
      this.apartamento_reciente = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.apartamento_reciente ? this.cliInfoA.campos_adicionales.apartamento_reciente : '';
      this.ciudad_reciente = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.ciudad_reciente ? this.cliInfoA.campos_adicionales.ciudad_reciente : '';
      this.zipcode_reciente = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.zipcode_reciente ? this.cliInfoA.campos_adicionales.zipcode_reciente : '';
      this.estado_reciente = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.estado_reciente ? this.cliInfoA.campos_adicionales.estado_reciente : '';

      this.estado_reciente = this.cliInfoA.campos_adicionales &&  this.cliInfoA.campos_adicionales.estado_reciente ? this.cliInfoA.campos_adicionales.estado_reciente : '';


      if (res.campos_adicionales.referido && res.campos_adicionales.referido.length > 10) {
        this.mostrar_btn_ref = false;
        this.is_ref = true
      }

      this.sendCliente();
    });
  }

  cerrarForm(): void {
    this.router.navigateByUrl('consultarcliente');
  }

  editor(){
    this.funcSer.showSweetX('Corfirmar', 'Habilitar el Modo Editor ?', 'Confirmar')
    .then(() => this.copia = null);
  }

  /** Organiza y emite la informacion hacia ver Cliente */
  sendCliente(): void {
    this.dataX = {
      salario: this.salario ? Number(this.salario) : 0,
      numero_id: this.numero_id ? this.numero_id : '',
      horariotrabajo: this.horariotrabajo ? this.horariotrabajo : '',
      tipo_id: this.tipo_id,
      licencia: this.licencia,
      robo_identidad: this.robo_identidad,
      tipopago: this.tipopago,
      empleador: this.empleador,
      dialibre: this.dialibre,
      otraactividad: this.otraactividad,
      horaduerme: this.horaduerme,
      horalevanta: this.horalevanta,
      reportex3: this.reportex3,
      contrato_enviado: this.contrato_enviado,
      contrato_firmado: this.contrato_firmado,
      campos_adicionales: {
        referido: this.nombre_ref && this.id_ref ? `ID ${this.id_ref} - ${this.nombre_ref}` : this.referido,
        emisora: this.dial && this.emisora? `${this.emisora}-${this.dial}`: this.emisora,
        redes: this.redes,
        sueldoS_Q: this.sueldoS_Q,
        dia_llamar: this.dia_llamar,
        capacidad_ahorro: this.capacidad_ahorro? this.capacidad_ahorro: 0,
        dia_pago: this.dia_pago,
        dia_pago2: this.dia_pago2,
        dia_pagoS: this.dia_pagoS,
        pago_renta: this.pago_renta,
        carro: this.carro,
        casa: this.casa,
        compania_movil: this.compania_movil,
        call_trabajo: this.call_trabajo,
        credito_check: this.credito_check,
        tipo_ingreso: this.tipo_ingreso,
        mejor_hora_llamar: this.mejor_hora_llamar,
        tel_wh_ok: this.tel_wh_ok,

        acredores: this.acredores,
        acredores2: this.acredores2,
        creditos: this.creditos,
        creditos2: this.creditos2,
        deudas_pendientes: this.deudas_pendientes,
        deudas_pendientes2: this.deudas_pendientes2,

        puntaje_equifax: this.puntaje_equifax,
        puntaje_experian: this.puntaje_experian,
        puntaje_trans_u: this.puntaje_trans_u,

        id_tarjeta: this.id_tarjeta,
        cv: this.cv,
        exp: this.exp,
        nombres_tarjeta: this.nombres_tarjeta,
        tipo_tarjeta: this.tipo_tarjeta,
        banco: this.banco,
        banco_cheque: this.banco_cheque,

        direccion_reciente: this.direccion_reciente,
        apartamento_reciente: this.apartamento_reciente,
        ciudad_reciente: this.ciudad_reciente,
        estado_reciente: this.estado_reciente,
        zipcode_reciente: this.zipcode_reciente
      }
    }

    if ( !this.dataX.id_tarjeta ) { delete this.dataX.id_tarjeta }
    if ( !this.dataX.cv ) { delete this.dataX.cv }
    if ( !this.dataX.exp ) { delete this.dataX.exp }
    if ( !this.dataX.tipo_tarjeta ) { delete this.dataX.tipo_tarjeta }
    if ( !this.dataX.banco ) { delete this.dataX.banco }

    this.enviarForm.emit(this.dataX)

  }

}
