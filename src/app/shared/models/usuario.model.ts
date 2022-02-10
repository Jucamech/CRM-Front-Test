export class UsuarioModel {
  user?: string;
  password?: string;
  nombre?: string;
  ext?: number;
}
/* ------------------------------ */
export interface RespPago {
  color: string,
  id: number,
  id_user: number,
  id_cliente: number,
  id_asesor: number,
  nombres: string,
  fecha_creacion: string,
  medio: string,
  valor: number,
  descripcion: string,
  valor_inscripcion: string,
  valor_mensualidad: string,
  plan_mes: number,
  tipo_pago: number,
  num_pagos: number,
  status: number | string,

  num_pago: number;
  fecha_pago: string,/////////////////

  debe?: number,
  fechaInincio? : string;
}
export interface DataPagos {
  id_cliente: string,
  nombre_completo: string,
  fecha_pago: string,
  tipo_pago: string,
  horario_pago: string,
  fecha_proximo: string,
  valor: number,
  inscripcion: string,
  mensualidad: number,
  medio: string,
  descripcion: string,
  id_asesor_cobro: number,
  fecha_confirmacion: string,
  id_asesor_confirmacion: number,
  valor_inscripcion: string,
  valor_mensualidad: string
}

/* -------------------------------------- */


export interface RespDocumentos {
  descripcion: string;
  documento: string;
  fecha_creacion?: string;
  id?: number;
  id_cliente?: string;
  id_user?: string;
  tipo_documento: string;
  vencimiento: string;
}

export interface RespDocFire {
  id: string;
  index: string;
  data:{
    descripcion: string;
    fecha_creacion: string;
    id_cliente: string;
    id_user: string;
    url: string;
    tipo_documento: string;
    vencimiento: string;
    name: string;
  }
}

export class RespUser {
  nombre!: string;
  apellido!: string;
  ext!: string;
  nombre_departamento!: string;
  departamento!: string;
  isAdmin!: string;
  id!: number ;
  login!: string;
  token!: string;
}
export class RespCart {
  buro!: string;
  carta!: string;
  cuentas!: string;
  fecha_creacion!: string;
  fecha_envio!: string;
  id!: string;
  id_cliente!: string;
  id_user!: string;
  ronda!: string;
  tracking!: string;
}

export interface RespReporteCred {
  id?: string;
  id_cliente?: string;
  id_user?: string;
  fecha_creacion?: string; //datetime
  fecha: string; //date
  acreedor: string; // 200
  buro: number; //1
  cuenta: string;// 30
  tipo_cuenta: string; //80
  estado: number; //1
  comentarios: string; //500
  limite: number; //9
  balance: number; //9
  cierre: number; //9

}

export interface RespCitas {
  campos_adicionales: CitaCampAd[],//////////////////////////////////
  id: string,
  id_cliente: string,
  id_user: string,
  id_asignado: string,
  fechahora: string,
  asignado: string, ///
  estado: string,
  motivo: string,
  notas: string,
  fecha_creacion: string,
  apellidos: string,
  nombres: string,
  mesEl: string,
  horaAlarma: string,
  horaAlarma2: string,
  horaAlarma22: string,
  horaAlarmaF: string,
  tempo: number,
  tempo2: number,
  tempo22: number,
  tempo3: number,
  limit: number,
}

export interface CitaCampAd {
  asigador?: string;
  asigado: string;
  resultado: string;
  hora_asig: string;
  nota: string;
  did?: string;
}

export interface RespCitasM {
  asignado?: string;
  apellidos?: string;
  campos_adicionales: CitaCampAd[],
  estado: string;
  fecha_creacion?: string;
  fechahora: string;
  id?: string;
  id_cliente?: string;
  id_asignado?: string; ///
  id_user?: string; ///
  motivo: string;
  notas: string;
  nombres?: string;
}

export interface ClienteModelGen {
  nombres: string,
  apellidos: string,
  asignado: string,
  id: string,
  telcasa?: string,
  telmovil?: string,
  telotro?: string,
  teltrabajo?: string
  estado?: string;
  status?: string;
  fecha_inicio?: string;
  actualizacion?: string;
  campagna ?: string;
}

export interface ClientModel {
  nota_cli?: string;
  actualizacion?: string;
  campagna ?: string;
  nota_plan_inscripcion?: any,
  id: string,
  nombres: string,
  apellidos: string,
  asignado: number,
  ciudad: string,
  creadopor: number,
  contrato_firmado: number,
  contrato_enviado: number,
  dialibre: string,
  direccion: string,
  email: string,
  email2: string,
  empleador: string,
  estado: string,
  fecha_creacion: string,
  horaduerme: string,
  horalevanta: string,
  horariotrabajo: string,
  licencia: number,
  motivacion: string,
  nacimiento: string,
  numero_id: string,
  ocupacion: string,
  otraactividad: string,
  propiedades: string,
  robo_identidad: number,
  reportex3: number,
  salario: number,
  status: string,
  plan_mes: number,
  teltrabajo: string,
  telmovil: string,
  telcasa: string,
  telotro: string,
  tipo_id: number,
  valor_inscripcion: number,
  valor_mensualidad: number,
  zipcode: number,
  fecha_inicio: string,

  campos_adicionales: Campos_adicionales,
}

export interface Ca_ad {
  inicio: string,
  rating: string,
}

export interface Campos_adicionales {
  problemas_credito?: string;
  apartamento_reciente?: string;
  ciudad_reciente?: string;
  estado_reciente?: string;
  zipcode_reciente?: string;

  referido?: string;
  emisora?: string;
  redes?: string;
  last_trabajo?: string,

  tel_wh_ok?: string,
  banco_cheque?: string,
  pago_renta?: number,
  carro?: number,
  casa?: number,
  call_trabajo?: string,
  credito_check?: string,
  tipo_ingreso?: string,
  sueldoS_Q?: string,
  direccion_reciente?: string,
  id_tarjeta?: string,
  exp?: string,
  nombres_tarjeta?: string,
  tipo_tarjeta?: number,
  tipo_papeles?: number,
  capacidad_ahorro?: number,
  banco?: string,

  cv?: string,

  /*  */
  tipo_trabajo?: string,
  dia_llamar?: string,
  nota_supervisor?: string,
  notas?: string,
  dia_pagoS?: string,
  dia_pago?: string,
  dia_pago2?: string,
  tipopago?: string,
  compania_movil?: string,
  nota_plan_inscripcion?: string,

 /* no creo relevante */
  puntaje?: string,
  motivacion?: string,
  dia_iglesia?: string,

  colecciones?: string,
  /* data de credit report */

  puntaje_experian?: string,
  puntaje_equifax?: string,
  puntaje_trans_u?: string,

  /*  */
  apartamento?: string,
  telwht?: string,
  direccion_facturas?: string,
  direccion_tarjeta?: string,
  otro_ingreso?: string,
  mejor_hora_llamar?: string,

  licencia_exp?: string,
  /*  */

  /* deudas */
  acredores?: string,
  acredores2?: string,
  creditos?: string,
  creditos2?: string,
  deudas_pendientes?: string,
  deudas_pendientes2?: string,

  cuotas_inscripcion?: number,
  fechas_pagos_inscripcion?: Fechas_pagos
}
export interface Fechas_pagos {
    v0: number, f0: string,
    v1: number, f1: string,
    v2: number, f2: string,
    v3: number, f3: string,
    v4: number, f4: string,
    v5: number, f5: string,
    v6: number, f6: string,
    v7: number, f7: string,
    v8: number, f8: string,
    v9: number, f9: string,
}

export interface CuentasInterf {
  acreedor_origin?: string; // acreedor-creditos-duedas
  cuenta_id?:string,
  estado?: string;
  tipo_cuenta?:string;
  balance_cuenta?:number;
  fecha_cuenta?:string;
  limite_cuenta?: number;
  buro?: string;
}

export class RadioHorarios {
  emisora: string;
  dial: string;
  estado_ubicacion: string;
  hora_inicio: string;
  hora_fin: string;
}

export class citaPosp {
  hora!: string;
  cliente!: string;
  horaCita!: string;
  notaRapida!: string;
}
