import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { interval, Observable,  } from 'rxjs';
import { Campos_adicionales, ClienteModelGen, ClientModel, Fechas_pagos, RespUser } from '../models/usuario.model';
import { Token } from './citas-stack.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'node_modules/crypto-js';
import Swal from 'sweetalert2';
import { Base64 } from '../models/otros.model';

export enum TiposToast { error, info, success, warning }

@Injectable({
  providedIn: 'root',
})
export class FuncionesComunesService {
  PermisoLLamar: boolean;
  version = environment.production;
  puerta: number = 0;
  nombre_pros: string;
  ss: string;
  hoy = new Date();
  jwtP: Token;
  T_toast = TiposToast;

  constructor(private sanitizer: DomSanitizer,
              private toastr: ToastrService,) { }

  //////////////////////////////////////////////////////////////////////////
  ///////////////////// ↓↓↓ GENERADORES DE PERMISOS ↓↓↓ ////////////////////
  //////////////////////////////////////////////////////////////////////////

  /**Genera permisos de nivel 3 q son los supervisores */
  generarPermisos(): boolean {
    this.jwtP = this.parseJwt( localStorage.getItem('token') );
    if ( Number(this.jwtP.data.nivel) > 2 ) {
      return true;
    } else {
      return false;
    }
  }

  /**Genera permisos de nivel 2, q son permisos especiales */
  generarPermisosN2(): boolean {
    this.jwtP = this.parseJwt( localStorage.getItem('token') );
    if ( Number(this.jwtP.data.nivel) > 1 ) {
      return true;
    } else {
      return false;
    }
  }
  /**Genera permisos de nivel 2, q son permisos especiales */
  generarPermisosN3(): boolean {
    this.jwtP = this.parseJwt( localStorage.getItem('token') );
    if ( Number(this.jwtP.data.nivel) > 2 ) {
      return true;
    } else {
      return false;
    }
  }
  /**Genera permisos de nivel 4 , nivel admin */
  generarPermisosAdmin(): boolean {
    this.jwtP = this.parseJwt( localStorage.getItem('token') );
    if ( Number(this.jwtP.data.nivel) > 3 ) {
      return true;
    } else {
      return false;
    }
  }
  /**Genera permisos basados en un id */
  generarPermisosUnicos(id: string): boolean {
    this.jwtP = this.parseJwt( localStorage.getItem('token') );
    if ( this.jwtP.data.id == id ) {
      return true;
    } else {
      return false;
    }
  }

  //////////////////////////////////////////////////////////////////////////
  ///////////////////// ↑↑↑ GENERADORES DE PERMISOS ↑↑↑ ////////////////////
  //////////////////////////////////////////////////////////////////////////

  /**
   * Encriptador de contraseñas
   * @param val
   * @returns
   */
  enCrypt(val: string): string{
    return CryptoJS.SHA256(val).toString();
  }

   /**
  * Es un Observable de tipo interval
  * Uso de suscripcion y destruccíon.
  */
  interval(n:number): Observable<number> {
    const Interval = interval(n);
    return Interval;
  }

  //////////////////////////////////////////////////////////////////////////
  ///////////////////////////// ↓↓↓ ALERTAS ↓↓↓ ////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  /*~~~~~~~~~~~~~~~~~~~~~~~ Alertas de Tipo Toast ~~~~~~~~~~~~~~~~~~~~~~~*/

  /**
   *
   * @param txt Texto a declarar
   * @param tit Titulo de la alerta
   * @param time tiempo en milli
   * @param tipo TiposToast {0: error, 1: info, 2: success, 3: warning }
   */
  showToast(txt:string, tit: string, time: number, tipo: TiposToast = TiposToast.success) {
    if (tipo == TiposToast.error) {
      this.toastr.error(txt, tit, {
        timeOut:time,
      });
    } else if (tipo == TiposToast.info) {
      this.toastr.info(txt, tit, {
        timeOut:time,
      });
    } else if (tipo == TiposToast.warning) {
      this.toastr.warning(txt, tit, {
        timeOut:time,
      });
    } else if (tipo == TiposToast.success) {
      this.toastr.success(txt, tit, {
        timeOut:time,
      });
    }
  }

  /*~~~~~~~~~~~~~~~~~~~~~ Alertas de Tipo SweetAlert ~~~~~~~~~~~~~~~~~~~~~*/

  /**
   * @param title Titulo de alerta
   * @param texto
   * @param time milli
   */
  showSweetWarning(title: string, texto: string, time: number){
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      icon: 'warning',
      text: texto,
      showConfirmButton: false,
      timer: time
    });
  }

  /**
   * Loading Basico de Sweet alert
   */
  showSweetLoad(){
    Swal.showLoading();
  }
  /**
   * Alerta de Sweet Alert con icono de Error
   */
  showSweetError(title: string, texto: string = '', time: number){
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      icon: 'error',
      text: texto,
      timer: time
    });
  }
  /**
   * Alerta de Sweet Alert con icono de Success
   */
  showSweetSuccess(title: string, texto: string = '', time: number){
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      icon: 'success',
      text: texto,
      showConfirmButton: false,
      timer: time
    });
  }
  /**
   * Alerta de Sweet Alert con HTML
   */
  async showSweetHTML(title: string, HTMLnota: string, nameBtn: string = 'Acept'){
    return new Promise<boolean>((resolve)=> {
      Swal.fire({
        title: `<strong>${title}</strong>`,
        icon: 'warning',
        html: HTMLnota,
        showCancelButton: true,
/*         confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33', */
        confirmButtonText: nameBtn
      }).then((r)=> {
        if (r.isConfirmed) {
          resolve(true);
        }
      })
    })
  }
  /**
   * Alerta Asincrona de Sweet Alert , para esperar una confirmación
   */
  async showSweetX(title: string, texto: string, nameBtn: string = 'Acept'){
    return new Promise<boolean>((resolve)=> {
      Swal.fire({
        title: title,
        text: texto,
        icon: 'question',
        showCancelButton: true,
/*         confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33', */
        confirmButtonText: nameBtn
      }).then((r)=> {
        if (r.isConfirmed) {
          resolve(true);
        }
      })
    })
  }

  //////////////////////////////////////////////////////////////////////////
  ///////////////////////////// ↑↑↑ ALERTAS ↑↑↑ ////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  // Creo q no se usa
  getDatos(): string[] {
    let data = [this.nombre_pros, this.ss];
    return data;
  }

  postReintegroDeNota(nota_obli: string){
    setTimeout(() => {
      localStorage.setItem('013800ce', nota_obli);
      this.showToast('Se ha activado la nota Obligatoria', 'Atencion!', 3000);
    }, 1000);

  }

  ///////////////////////////////////////////////////////////////////////
  /////////////////////////////   FECHAS    /////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  /**
   * @param val Hora en Formato militar
   * @returns hora en formato Am/Pm
   */
  transformHora(val: string): string {
    let value: string;
    if (val) {
      let x = val.split(':');
      let h = Number(x[0]);
      let ap: string;
      if (h > 12) {
        ap = 'P.M.'
        h = h - 12;
      }else {
        ap = 'A.M.';
      }
      value = `${h}:${x[1]} ${ap}`;
    }
    return value;
  }

  /**
   * Retorna la fecha actual
   *  @returns yyyy-mm-dd */
  getFecha(): string {
    let mes: any = this.hoy.getMonth() + 1;
    let dia: any = this.hoy.getDate();
    if (mes < 10) mes = `0${mes}`;
    if (dia < 10) dia = `0${dia}`;
    return `${this.hoy.getFullYear()}-${mes}-${dia}`;
  }
  /** @returns  hh-mm-ss */
  getHora(): string {
    let min: any = this.hoy.getMinutes();
    let hora: any = this.hoy.getHours();
    let sec: any = this.hoy.getSeconds();

    if (min < 10) min = `0${min}`;
    if (hora < 10) hora = `0${hora}`;
    if (sec < 10) sec = `0${sec}`;

    return `${hora}:${min}:${sec}`;
  }
  /**
   * Retorna la hora actual
   * @hora debe ser la funciion de New Date()
   * @returns  hh-mm-ss
   * */
  getAhora(hoy: Date): string {
    let min: any = hoy.getMinutes();
    let hora: any = hoy.getHours();
    let sec: any = hoy.getSeconds();

    if (min < 10) min = `0${min}`;
    if (hora < 10) hora = `0${hora}`;
    if (sec < 10) sec = `0${sec}`;

    return `${hora}:${min}:${sec}`;
  }

  /** @returns  yyyy:mm:dd hh-mm-ss */
  // Retorna el dia de hoy con el primera hora y minuto cero
  getHoy(): string {
    return `${this.getFecha()} 00:00:01`;
  }

  /** Uso exclusivo para las alarmas */
  shoterAlert(t: number, h: string): string {
    const hoy = this.getFecha()
    let min: any = this.hoy.getMinutes();
    let hora: any = this.hoy.getHours();
    if (t > min) {
      min = min + 60;
      hora = hora - 1;
    }
    if (min < 10) min = `0${min}`;
    if (hora < 10) hora = `0${hora}`;
    min = min - t;
    const horaAlarma = `${hora}:${min}`
    return horaAlarma
  }

  /** @returns  yyyy:mm:dd */
  // Devuelve el dia de ayer solo año, mes y dia
  getYest(){
    const ayer = new Date(this.hoy.getTime() - 24 * 60 * 60 * 1000)
    let mes: any = ayer.getMonth() + 1;
    let dia: any = ayer.getDate();
    if (mes < 10) mes = `0${mes}`;
    if (dia < 10) dia = `0${dia}`;
    return `${this.hoy.getFullYear()}-${mes}-${dia}`;
  }
  /** @returns  yyyy:mm:dd hh-mm-ss */
  // Devuelve el dia del mañana con la primera hora y minutos cero
  getTomorrow() {
    let manana = this.toTimeStamp(this.getHoy());
    manana = manana + 86400000;

    let año: any = this.fromTimeStamp(manana).getFullYear();
    let mes: any = this.fromTimeStamp(manana).getMonth();
    let dia: any = this.fromTimeStamp(manana).getDate();
    let hora: any = this.fromTimeStamp(manana).getMonth();
    let min: any = this.fromTimeStamp(manana).getMinutes();
    let sec: any = this.fromTimeStamp(manana).getSeconds();

    mes = mes + 1;

    if (mes < 10) mes = `0${mes}`;
    if (dia < 10) dia = `0${dia}`;
    if (min < 10) min = `0${min}`;
    if (hora < 10) hora = `0${hora}`;
    if (sec < 10) sec = `0${sec}`;

    return `${año}-${mes}-${dia} 00:00:01`;
  }

  /** Uso exclusivo para las alarmas */
  generateHoraAlarma(hora: string, t: number) {
    let horaT = this.toTimeStamp(hora);
    const tM = t * 60000;
    const horaAlarma = this.fromTimeStamp(horaT - tM);
    let h: any = horaAlarma.getHours();
    let m: any = horaAlarma.getMinutes();
    if (m < 10) m = `0${m}`;
    if (h < 10) h = `0${h}`;
    return `${h}:${m}`;
  }

  toTimeStamp(time: string): number {
    let t = new Date(time);
    return t.getTime();
  }
  /** @returns  yyyy:mm:dd hh-mm-ss */
  // suma minutos a cualquier hora de tipo String
  addMinToDate(hor: string,mi: number){
    let x = this.toTimeStamp(hor);
    x = x + mi * 60000;
    let z = this.fromTimeStamp(x);
    let min: any = z.getMinutes();
    let hora: any = z.getHours();
    let sec: any = z.getSeconds();
    let mes: any = z.getMonth() + 1;
    let dia: any = z.getDate();
    let year: any = z.getFullYear();
    if (mes < 10) mes = `0${mes}`;
    if (dia < 10) dia = `0${dia}`;
    if (min < 10) min = `0${min}`;
    if (hora < 10) hora = `0${hora}`;
    if (sec < 10) sec = `0${sec}`;

    return `${year}-${mes}-${dia} ${hora}:${min}:${sec}`;

  }

  fromTimeStamp(time: number) {
    const date = new Date(time);
    return date;
  }
  /** @returns  yyyy:mm:dd hh-mm-ss */
  // Resta minutos a cualquier hora de tipo String
  restMinDate(hor: string,mi: number){
    let x = this.toTimeStamp(hor);
    x = x - mi * 60000;
    let z = this.fromTimeStamp(x);
    let min: any = z.getMinutes();
    let hora: any = z.getHours();
    let sec: any = z.getSeconds();
    let mes: any = z.getMonth() + 1;
    let dia: any = z.getDate();
    let year: any = z.getFullYear();
    if (mes < 10) mes = `0${mes}`;
    if (dia < 10) dia = `0${dia}`;
    if (min < 10) min = `0${min}`;
    if (hora < 10) hora = `0${hora}`;
    if (sec < 10) sec = `0${sec}`;

    return `${year}-${mes}-${dia} ${hora}:${min}:${sec}`;
  }

  ///////////////////////////////////////////////////////////////////////
  /////////////////////////////  FIN FECHAS /////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  // Uso para citas
  ordenar(data) {
    data.sort(function (a, b) {
      if (a.fechahora < b.fechahora) {
        return 1;
      }
      if (a.fechahora > b.fechahora) {
        return -1;
      }
      return 0;
    });
  }

  // Uso para citas
  ordenar2(data) {
    data.sort(function (a, b) {
      if (a.fechahora > b.fechahora) {
        return 1;
      }
      if (a.fechahora < b.fechahora) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Convierte archivods en base 64
   * @param file File de cualquier tipo
   */
  base64 = async (file: File) =>
    new Promise<Base64>((resolve, reject) => {
      try {
        let unsafeImg = window.URL.createObjectURL(file); // crea un DOMString que contiene una URL que representa al objeto pasado como parámetro.
        this.log('unsafeImg',unsafeImg)
        let image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        this.log('image',image)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve({
            blob: file,
            image,
            base: reader.result,
          });
          image = null;
          unsafeImg = null;
          reader = null;
        };
        reader.onerror = (err) => {
          resolve({
            blob: file,
            image,
            base: null,
          });
        };
      } catch (err) {
        reject(err)
        return null;
      }
    });

  /**
   * Parseador del token
   */
  parseJwt(token): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

/**
 * Elimina los elementos repetidos del array que se pase ne los parametros
 * @param arr array de tipo Any
 * @returns el array sin elementos repetidos
 */
  eliminarDuplicados(arr:Array<any>):Array<any>{
    return arr.filter((valor, ind) => {
      return arr.indexOf(valor) === ind;
    });
  }

  /**
   * Ordena la lista de clientes Alfabeticamente pero necesita tener los nombres Capitalizados
   * @param data lista clientes de modelo clientes
   */
  ordenarNombreClientes(data: ClientModel[] | ClienteModelGen[]) {
    data.sort(function (a, b) {
      if (a.nombres < b.nombres) {
        return -1;
      }
      if (a.nombres > b.nombres) {
        return 1;
      }
      return 0;
    });
  }
  ordenarNombreClientes2(data: ClienteModelGen[]) {
    return data.sort(function (a, b) {
      if (a.nombres < b.nombres) {
        return -1;
      }
      if (a.nombres > b.nombres) {
        return 1;
      }
      return 0;
    });
  }
  /**
   * Concatena Cualquier objeto con otro
   */
  jsonConcat(obj1: {}, obj2: {}): {} {
    for (const key in obj2) {
      obj1[key] = obj2[key];
    }
    return obj1;
  }


  /**
   * Ordenar cualquier Objeto recibiendo el parametros por el q se quiera ordenar y el tipo de orden
   * @param data Cualquier arreglo
   * @param param el parametro por el q se quiera ordenar
   * @param ord Asc || Desc
   */
  ordenarAny(data: any[], param: string, ord: string): void {
    if (ord == 'Asc') {
      data.sort(function (a, b) {
        if (a[param] < b[param]) {
          return -1;
        }
        if (a[param] > b[param]) {
          return 1;
        }
        return 0;
      });
    } else if (ord == 'Desc') {
      data.sort(function (a, b) {
        if (a[param] < b[param]) {
          return 1;
        }
        if (a[param] > b[param]) {
          return -1;
        }
        return 0;
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////
  ///////// ↓↓↓ ADMINISTRACION DE CAMPOS ADICIONALES DE CLIENTE ↓↓↓ ////////
  //////////////////////////////////////////////////////////////////////////

   /**
   * Crea un Campos adiconales de un cliente conservando los ya existentes
   * @param data un cliente con datos incompletos
   * @returns un Campos_adicionales con todos los campos
   */
  creadorDeCamposAd(data:Partial<ClientModel>):Campos_adicionales{
    let fg: Fechas_pagos;
    let f: Fechas_pagos;
    let fx = {
      v0: null, f0: null,
      v1: null, f1: null,
      v2: null, f2: null,
      v3: null, f3: null,
      v4: null, f4: null,
      v5: null, f5: null,
      v6: null, f6: null,
      v7: null, f7: null,
      v8: null, f8: null,
      v9: null, f9: null,
    }
    if (data && data.campos_adicionales && data.campos_adicionales.fechas_pagos_inscripcion) {
      fg = data.campos_adicionales.fechas_pagos_inscripcion? data.campos_adicionales.fechas_pagos_inscripcion: fx;
      f = {
        v0: fg.v0? fg.v0: null, f0: fg.f0? fg.f0: null,
        v1: fg.v1? fg.v1: null, f1: fg.f1? fg.f1: null,
        v2: fg.v2? fg.v2: null, f2: fg.f2? fg.f2: null,
        v3: fg.v3? fg.v3: null, f3: fg.f3? fg.f3: null,
        v4: fg.v4? fg.v4: null, f4: fg.f4? fg.f4: null,
        v5: fg.v5? fg.v5: null, f5: fg.f5? fg.f5: null,
        v6: fg.v6? fg.v6: null, f6: fg.f6? fg.f6: null,
        v7: fg.v7? fg.v7: null, f7: fg.f7? fg.f7: null,
        v8: fg.v8? fg.v8: null, f8: fg.f8? fg.f8: null,
        v9: fg.v9? fg.v9: null, f9: fg.f9? fg.f9: null
      };
    } else {
      f = fx;
    }

    let c_a: Campos_adicionales;
    if (data && data.campos_adicionales) {
      c_a = {

        redes:          data.campos_adicionales.redes ? data.campos_adicionales.redes  : null,
        emisora:        data.campos_adicionales.emisora ? data.campos_adicionales.emisora: null,

        last_trabajo:   data.campos_adicionales.last_trabajo ? data.campos_adicionales.last_trabajo: null,
        pago_renta:     data.campos_adicionales.pago_renta? data.campos_adicionales.pago_renta: null,
        carro:          data.campos_adicionales.carro? data.campos_adicionales.carro: null,
        casa:           data.campos_adicionales.casa? data.campos_adicionales.casa: null,
        call_trabajo:   data.campos_adicionales.call_trabajo? data.campos_adicionales.call_trabajo: null,
        credito_check:  data.campos_adicionales.credito_check? data.campos_adicionales.credito_check: null,
        tipo_ingreso:   data.campos_adicionales.tipo_ingreso? data.campos_adicionales.tipo_ingreso: null,
        sueldoS_Q:      data.campos_adicionales.sueldoS_Q? data.campos_adicionales.sueldoS_Q: null,
        direccion_reciente: data.campos_adicionales.direccion_reciente? data.campos_adicionales.direccion_reciente: null,

        id_tarjeta: data.campos_adicionales.id_tarjeta? data.campos_adicionales.id_tarjeta: null,
        exp: data.campos_adicionales.exp? data.campos_adicionales.exp: null,
        nombres_tarjeta: data.campos_adicionales.nombres_tarjeta? data.campos_adicionales.nombres_tarjeta: null,
        tipo_tarjeta: data.campos_adicionales.tipo_tarjeta? data.campos_adicionales.tipo_tarjeta: null,
        tipo_papeles: data.campos_adicionales.tipo_papeles? data.campos_adicionales.tipo_papeles: null,
        capacidad_ahorro: data.campos_adicionales.capacidad_ahorro? data.campos_adicionales.capacidad_ahorro: null,
        banco: data.campos_adicionales.banco? data.campos_adicionales.banco: null,
        cv: data.campos_adicionales.cv? data.campos_adicionales.cv: null,
        tipo_trabajo: data.campos_adicionales.tipo_trabajo? data.campos_adicionales.tipo_trabajo: null,
        dia_llamar: data.campos_adicionales.dia_llamar? data.campos_adicionales.dia_llamar: null,
        nota_supervisor: data.campos_adicionales.nota_supervisor? data.campos_adicionales.nota_supervisor: null,
        notas: data.campos_adicionales.notas? data.campos_adicionales.notas: null,
        dia_pagoS: data.campos_adicionales.dia_pagoS? data.campos_adicionales.dia_pagoS: null,
        dia_pago: data.campos_adicionales.dia_pago? data.campos_adicionales.dia_pago: null,
        dia_pago2: data.campos_adicionales.dia_pago2? data.campos_adicionales.dia_pago2: null,
        tipopago: data.campos_adicionales.tipopago? data.campos_adicionales.tipopago: null,
        compania_movil: data.campos_adicionales.compania_movil? data.campos_adicionales.compania_movil: null,
        nota_plan_inscripcion: data.campos_adicionales.nota_plan_inscripcion? data.campos_adicionales.nota_plan_inscripcion: null,
        colecciones: data.campos_adicionales.colecciones? data.campos_adicionales.colecciones: null,
        puntaje_experian: data.campos_adicionales.puntaje_experian? data.campos_adicionales.puntaje_experian: null,
        puntaje_equifax: data.campos_adicionales.puntaje_equifax? data.campos_adicionales.puntaje_equifax: null,
        puntaje_trans_u: data.campos_adicionales.puntaje_trans_u? data.campos_adicionales.puntaje_trans_u: null,
        apartamento: data.campos_adicionales.apartamento? data.campos_adicionales.apartamento: null,
        telwht: data.campos_adicionales.telwht? data.campos_adicionales.telwht: null,
        direccion_facturas: data.campos_adicionales.direccion_facturas? data.campos_adicionales.direccion_facturas: null,
        direccion_tarjeta: data.campos_adicionales.direccion_tarjeta? data.campos_adicionales.direccion_tarjeta: null,
        otro_ingreso: data.campos_adicionales.otro_ingreso? data.campos_adicionales.otro_ingreso: null,
        licencia_exp: data.campos_adicionales.licencia_exp? data.campos_adicionales.licencia_exp: null,
        cuotas_inscripcion: data.campos_adicionales.cuotas_inscripcion? data.campos_adicionales.cuotas_inscripcion: null,
        acredores:                data.campos_adicionales.acredores,
        acredores2:               data.campos_adicionales.acredores2,
        creditos:                 data.campos_adicionales.creditos,
        creditos2:                data.campos_adicionales.creditos2,
        deudas_pendientes:        data.campos_adicionales.deudas_pendientes,
        deudas_pendientes2:       data.campos_adicionales.deudas_pendientes2,
        mejor_hora_llamar:        data.campos_adicionales.mejor_hora_llamar,
        tel_wh_ok:                data.campos_adicionales.tel_wh_ok,
        banco_cheque:             data.campos_adicionales.banco_cheque,
        fechas_pagos_inscripcion: f,
        /* data innecessari al momento */
        puntaje:      data.campos_adicionales.puntaje? data.campos_adicionales.puntaje: null,
        motivacion:   data.campos_adicionales.motivacion? data.campos_adicionales.motivacion: null,
        dia_iglesia:  data.campos_adicionales.dia_iglesia? data.campos_adicionales.dia_iglesia: null,
        referido:     data.campos_adicionales.referido? data.campos_adicionales.referido: null,

        apartamento_reciente: data.campos_adicionales.apartamento_reciente ? data.campos_adicionales.apartamento_reciente: null,
        ciudad_reciente:      data.campos_adicionales.ciudad_reciente ? data.campos_adicionales.ciudad_reciente : null,
        estado_reciente:      data.campos_adicionales.estado_reciente ? data.campos_adicionales.estado_reciente : null,
        zipcode_reciente:     data.campos_adicionales.zipcode_reciente ? data.campos_adicionales.zipcode_reciente: null,
        problemas_credito:    data.campos_adicionales.problemas_credito ? data.campos_adicionales.problemas_credito: null
      }
    }else {
      c_a = {
        redes: null,
        emisora: null,

        last_trabajo:null,
        banco_cheque:null,
        tel_wh_ok: "no",
        pago_renta: null,
        carro: null,
        casa: null,
        call_trabajo: null,
        credito_check: null,
        tipo_ingreso: null,
        sueldoS_Q: null,
        direccion_reciente: null,
        id_tarjeta: null,
        exp: null,
        nombres_tarjeta: null,
        tipo_tarjeta: null,
        tipo_papeles: null,
        capacidad_ahorro: null,
        banco: null,
        cv: null,
        tipo_trabajo: null,
        dia_llamar: null,
        nota_supervisor: null,
        notas: null,
        dia_pagoS: null,
        dia_pago: null,
        dia_pago2: null,
        tipopago: null,
        compania_movil: null,
        nota_plan_inscripcion: null,
        colecciones: null,
        puntaje_experian: null,
        puntaje_equifax: null,
        puntaje_trans_u: null,
        apartamento: null,
        telwht: null,
        direccion_facturas: null,
        direccion_tarjeta: null,
        otro_ingreso: null,
        licencia_exp: null,
        cuotas_inscripcion: null,
        acredores: null,
        acredores2: null,
        creditos: null,
        creditos2: null,
        mejor_hora_llamar: null,
        deudas_pendientes: null,
        deudas_pendientes2: null,
        fechas_pagos_inscripcion: f,
        /* data innecessari al momento */
        puntaje: null,
        motivacion: null,
        dia_iglesia: null,
        referido: null,

        apartamento_reciente: null,
        ciudad_reciente: null,
        estado_reciente: null,
        zipcode_reciente: null,
        problemas_credito: null
      }
    }
    return c_a;
  }


  /**
   * Une los campos nuevos con datos completados ya existentes para evitar perdida pero permitiendo actualización de los mismos
   * @param arrP array del formulario q puede cambiar los valores
   * @param arr2 datos q ya tiene el cliente
   * @returns datos completos evitanndo q se pierda datos
   */
  unirCamposAdicionales(arrP:Partial<Campos_adicionales>, arr2:Partial<Campos_adicionales>): Campos_adicionales {

    let f_p: Fechas_pagos;
    let v0 = arrP.fechas_pagos_inscripcion.v0? arrP.fechas_pagos_inscripcion.v0: 0;
    let v1 = arrP.fechas_pagos_inscripcion.v1? arrP.fechas_pagos_inscripcion.v1: 0;
    let v2 = arrP.fechas_pagos_inscripcion.v2? arrP.fechas_pagos_inscripcion.v2: 0;
    let v3 = arrP.fechas_pagos_inscripcion.v3? arrP.fechas_pagos_inscripcion.v3: 0;
    let v4 = arrP.fechas_pagos_inscripcion.v4? arrP.fechas_pagos_inscripcion.v4: 0;
    let v5 = arrP.fechas_pagos_inscripcion.v5? arrP.fechas_pagos_inscripcion.v5: 0;
    let v6 = arrP.fechas_pagos_inscripcion.v6? arrP.fechas_pagos_inscripcion.v6: 0;
    let v7 = arrP.fechas_pagos_inscripcion.v7? arrP.fechas_pagos_inscripcion.v7: 0;
    let v8 = arrP.fechas_pagos_inscripcion.v8? arrP.fechas_pagos_inscripcion.v8: 0;
    let v9 = arrP.fechas_pagos_inscripcion.v9? arrP.fechas_pagos_inscripcion.v9: 0;

    let f0 = arrP.fechas_pagos_inscripcion.f0? arrP.fechas_pagos_inscripcion.f0: '';
    let f1 = arrP.fechas_pagos_inscripcion.f1? arrP.fechas_pagos_inscripcion.f1: '';
    let f2 = arrP.fechas_pagos_inscripcion.f2? arrP.fechas_pagos_inscripcion.f2: '';
    let f3 = arrP.fechas_pagos_inscripcion.f3? arrP.fechas_pagos_inscripcion.f3: '';
    let f4 = arrP.fechas_pagos_inscripcion.f4? arrP.fechas_pagos_inscripcion.f4: '';
    let f5 = arrP.fechas_pagos_inscripcion.f5? arrP.fechas_pagos_inscripcion.f5: '';
    let f6 = arrP.fechas_pagos_inscripcion.f6? arrP.fechas_pagos_inscripcion.f6: '';
    let f7 = arrP.fechas_pagos_inscripcion.f7? arrP.fechas_pagos_inscripcion.f7: '';
    let f8 = arrP.fechas_pagos_inscripcion.f8? arrP.fechas_pagos_inscripcion.f8: '';
    let f9 = arrP.fechas_pagos_inscripcion.f9? arrP.fechas_pagos_inscripcion.f9: '';

    if (arr2 && arr2.fechas_pagos_inscripcion) {
      v0 = arr2.fechas_pagos_inscripcion.v0? arr2.fechas_pagos_inscripcion.v0: v0;
      v1 = arr2.fechas_pagos_inscripcion.v1? arr2.fechas_pagos_inscripcion.v1: v1;
      v2 = arr2.fechas_pagos_inscripcion.v2? arr2.fechas_pagos_inscripcion.v2: v2;
      v3 = arr2.fechas_pagos_inscripcion.v3? arr2.fechas_pagos_inscripcion.v3: v3;
      v4 = arr2.fechas_pagos_inscripcion.v4? arr2.fechas_pagos_inscripcion.v4: v4;
      v5 = arr2.fechas_pagos_inscripcion.v5? arr2.fechas_pagos_inscripcion.v5: v5;
      v6 = arr2.fechas_pagos_inscripcion.v6? arr2.fechas_pagos_inscripcion.v6: v6;
      v7 = arr2.fechas_pagos_inscripcion.v7? arr2.fechas_pagos_inscripcion.v7: v7;
      v8 = arr2.fechas_pagos_inscripcion.v8? arr2.fechas_pagos_inscripcion.v8: v8;
      v9 = arr2.fechas_pagos_inscripcion.v9? arr2.fechas_pagos_inscripcion.v9: v9;

      f0 = arr2.fechas_pagos_inscripcion.f0? arr2.fechas_pagos_inscripcion.f0: f0;
      f1 = arr2.fechas_pagos_inscripcion.f1? arr2.fechas_pagos_inscripcion.f1: f1;
      f2 = arr2.fechas_pagos_inscripcion.f2? arr2.fechas_pagos_inscripcion.f2: f2;
      f3 = arr2.fechas_pagos_inscripcion.f3? arr2.fechas_pagos_inscripcion.f3: f3;
      f4 = arr2.fechas_pagos_inscripcion.f4? arr2.fechas_pagos_inscripcion.f4: f4;
      f5 = arr2.fechas_pagos_inscripcion.f5? arr2.fechas_pagos_inscripcion.f5: f5;
      f6 = arr2.fechas_pagos_inscripcion.f6? arr2.fechas_pagos_inscripcion.f6: f6;
      f7 = arr2.fechas_pagos_inscripcion.f7? arr2.fechas_pagos_inscripcion.f7: f7;
      f8 = arr2.fechas_pagos_inscripcion.f8? arr2.fechas_pagos_inscripcion.f8: f8;
      f9 = arr2.fechas_pagos_inscripcion.f9? arr2.fechas_pagos_inscripcion.f9: f9;
    }

    f_p = {
      v0, f0,
      v1, f1,
      v2, f2,
      v3, f3,
      v4, f4,
      v5, f5,
      v6, f6,
      v7, f7,
      v8, f8,
      v9, f9
    }

    let data: Campos_adicionales = {
      mejor_hora_llamar:      arr2.mejor_hora_llamar,
      banco_cheque:           arr2.banco_cheque,
      tel_wh_ok:              arr2.tel_wh_ok,
      last_trabajo:           arr2.last_trabajo,
      pago_renta:             arr2.pago_renta,
      carro:                  arr2.carro,
      casa:                   arr2.casa,
      call_trabajo:           arr2.call_trabajo,
      credito_check:          arr2.credito_check,
      tipo_ingreso: arr2.tipo_ingreso,
      sueldoS_Q: arr2.sueldoS_Q,
      direccion_reciente: arr2.direccion_reciente,
      id_tarjeta: arr2.id_tarjeta,
      exp: arrP.exp ? arrP.exp : arr2.exp,
      nombres_tarjeta: arrP.nombres_tarjeta ? arrP.nombres_tarjeta : arr2.nombres_tarjeta,
      cv: arrP.cv ? arrP.cv : arr2.cv,
      tipo_tarjeta: arrP.tipo_tarjeta ? arrP.tipo_tarjeta : arr2.tipo_tarjeta,
      tipo_papeles: arr2.tipo_papeles,
      capacidad_ahorro: arr2.capacidad_ahorro,
      banco: arr2.banco,
      tipo_trabajo: arr2.tipo_trabajo,
      dia_llamar: arr2.dia_llamar,
      nota_supervisor: arr2.nota_supervisor,
      notas: arr2.notas,
      dia_pagoS: arr2.dia_pagoS,
      dia_pago: arr2.dia_pago,
      dia_pago2: arr2.dia_pago2,
      tipopago: arr2.tipopago,
      compania_movil: arr2.compania_movil,
      nota_plan_inscripcion: arrP.nota_plan_inscripcion,
      colecciones: arr2.colecciones,
      puntaje_experian: arr2.puntaje_experian,
      puntaje_equifax: arr2.puntaje_equifax,
      puntaje_trans_u: arr2.puntaje_trans_u,
      apartamento: arrP.apartamento,
      telwht: arr2.telwht,
      direccion_facturas: arr2.direccion_facturas,
      direccion_tarjeta: arr2.direccion_tarjeta,
      otro_ingreso: arr2.otro_ingreso,
      licencia_exp: arr2.licencia_exp,
      cuotas_inscripcion: arrP.cuotas_inscripcion,
      acredores:          arr2.acredores,
      acredores2:         arr2.acredores2,
      creditos:           arr2.creditos,
      creditos2:          arr2.creditos2,
      deudas_pendientes:  arr2.deudas_pendientes,
      deudas_pendientes2: arr2.deudas_pendientes2,
      fechas_pagos_inscripcion: f_p,
      /* data innecessari al momento */
      puntaje:            arr2.puntaje,
      motivacion:         arr2.motivacion,
      dia_iglesia:        arr2.dia_iglesia,


      emisora:            arr2.emisora,
      redes:              arr2.redes,
      referido:           arr2.referido,
      /* nueva data speech 800 */
      apartamento_reciente: arr2.apartamento_reciente,
      ciudad_reciente:    arr2.ciudad_reciente,
      estado_reciente:    arr2.estado_reciente,
      zipcode_reciente:   arr2.zipcode_reciente,
      problemas_credito:  arr2.problemas_credito

    }

    return data;
  }

  /**
   * Crea un Campos obligatorios de tipo integer para la base de datos
   * @param data un cliente con datos incompletos
   * @returns
   */
  creadorDeCamposObligatorios(data:Partial<ClientModel>):Partial<ClientModel>{
    if (data) {
      data.zipcode = data.zipcode? data.zipcode: 0;
      data.tipo_id = data.tipo_id? data.tipo_id: 0;
      data.salario = data.salario? data.salario: 0;
      data.nacimiento = data.nacimiento? data.nacimiento: '2000-01-01';
    }
    return data;
  }


  //////////////////////////////////////////////////////////////////////////
  ///////// ↑↑↑ ADMINISTRACION DE CAMPOS ADICIONALES DE CLIENTE ↑↑↑ ////////
  //////////////////////////////////////////////////////////////////////////

    /**
   * Inyecta el nombre de agente asignado basandose en el id del agente q este en la DB
   * @param respC data a la q se le quiera intectar el agente
   * @param agentes data de agentes[]
   * @param param1 id_asignado | id_agente | id_user | id_creador
   * @returns
   */
  inyectarAgente(respC: any[], agentes: RespUser[], param1 ): any[] {
  let dataResp = [];
    for (const key in respC) {
      const el = respC[key];
      for (const key in agentes) {
        const elAg = agentes[key];
        if (el[param1] == String(elAg.id)) {
          el.asignado = `${elAg.nombre} ${elAg.apellido}`;
        }
      }
      dataResp.push(el);
    } return dataResp;
  }

  //////////////////////////////////////////////////////////////////////////
  /////////////////////////// ↓↓↓ CONSOLE LOG ↓↓↓ //////////////////////////
  //////////////////////////////////////////////////////////////////////////

  /**
   * Consolea solo en version de pruebas
   */
  log(k:string, v?:any){
    if (!this.version) {
      console.log(k,v);
    }
  }

  /**
   * Se usa con principalmente para lo errores en los HTTP
   */
  logWarn(k:string, v:any){
    console.warn(k,v);
  }

}
