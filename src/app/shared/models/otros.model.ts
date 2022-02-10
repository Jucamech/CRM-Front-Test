import { SafeUrl } from "@angular/platform-browser";
import { DataLLamadaCli } from "./citas.model";

export class DataNotaModel {
  cliente!: string;
  nota!: string;
  motivo!: string;
  fecha!: string;
  asignado!: string;
}

export interface AgentModel {
  id_user: string;
  ext: string;
  ipaddress: string;
  nombres: string;
  status: string;
  departamento: string;
}

export interface AgentModel2 {
  prior: number;
  id_user: string;
  ext: string;
  ipaddress: string;
  nombres: string;
  status: string;
  departamento: string;
}

export interface RespCalling {
  did_local: string
  ext?: string
  id_cliente: string
  numero_entrante: string
  estado?: string
}

export interface FechasPagos {
  fecha_inicio: string,
  fecha_final: string
}

export interface DataNotaCita {
  cliente: string,
  estado: string,
  motivo: string,
  fecha: string,
  asignado: string,
  nota: string,
  id: string,
  id_user: string
}

export interface Dids {
  did: string,
  numero: string,
  estado: string
}
////////////////////////////////////////////////////
export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface AgenteData {
  id?: string,
  user?: string,
  nivel?: string,
  nombre: string,
  apellido: string,
  departamento: string,
  ext: string
  password?: string
}

export interface Reacciones {
  id_cita: string;
  fecha_cita: string;
  r3?: string;
  r4?: string;
  r5?: string;
}

export interface FechasPost {
  fecha_inicio: string;
  fecha_final: string;
}
export interface FechasPostParam {
  params: string;
  val?: string;
  fecha_inicio: string;
  fecha_final: string;
}
/* -----------------llamadas ----------------- */
export interface FechasLlamadas {
  inicio: string;
  fin: string;
}

export interface LlamadasResp {
/*   asignado?: string;
  asignado2?: string;
  id_cli?: string;
  status?: string;
  nombre?: string;
  /////////////////////
  destino: string;
  duracion: string;
  estado: string;
  fecha: string;
  origen: string;
  tipo: string; */
  asignado?: string;
  asignado2?: string;
  destino: string;
  duracion: string;
  estado: string;
  fecha: string;
  id: string;
  nombre?: string;
  nombres?: string;
  origen: string;
  tipo: string;
  id_cliente?: string;
}

/* ------------------------------------- */

export interface DataNotas {
  resultado: string;
  did: string;
  llamada: string;
  nota: string;
  speech: string;
  reacciones: Reacciones;
}


export interface RespNotas {
  did: string;
  fecha_llamada: string;
  id: string;
  resultado: string;
  id_cliente: string;
  id_user: string;
  llamada: string;
  nombres: string;
  nota: string;
  reacciones: Reacciones;
  asignado?: string;
}

export interface Base64 {
  blob: any,
  image: SafeUrl,
  base: ArrayBuffer | string;
}

export interface ErrorHttp {
  error: {Error: string},
  message: string,
  name: string,
  ok: boolean,
  status: number,
  statusText: string,
  url: string
}


export interface RickM {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ImagenFirebase {
  id_cliente: string;
  id_user: string;
  fecha_creacion: string;
  url: string;
  tipo_documento: string;
  vencimiento: string;
  descripcion: string;
  type: string;
  name: string;
}
/* RASTREADOR DE AGENTE */

export interface DataStatusAgent {
  id_user: string;
  key_login: string;
  key_component: String;
  hora_final?: string;
  visible: string;
  url_id: string;
  url_comp: string;
  llamando: LLamadaAgente;
}
export interface RespStatusAgent {
  id: string;
  id_user: string;
  key_login: string;
  key_component: String;
  hora_inicio: string;
  hora_final: string;
  visible: string;
  url_id: string;
  url_comp: string;
  llamando: LLamadaAgente;
}

export interface LLamadaAgente {
  tipo: string;
  t_inicio: string;
  t_fin: string;
  id_cliente: string;
}

export interface GetDataStatusAgt {
  id:string;
  fecha_inicio: string;
  fecha_final: string;
}


/* //////*************************////// */
export interface DataContestaciones {
  ronda: number;
  nota: string;
  buro: number;
  document: string[];
  fecha_resp: string;
}

export interface RespContestaciones {
  id: string;
  id_cliente: string
  id_user: string
  ronda: number;
  nota: string;
  buro: number;
  document: string[];
  fecha_resp: string;
}

/* ************** CAMPAÑAS V2 ************** */

export interface ResCampañaV2 {
  id? : string;
  name: string;
  activo: string;
  did: string;
  name_did: string;
  time :number;
  del?: string;
}

export interface DataPostCampaV2 {
  id_cliente: string;
  id_campagna: string;
  id_user: string;
  id_nota: string;
  act_camp: string;
  cuadros: DataLLamadaCli[];
}

export interface RespDataCampaV2 {
  id: string;
  id_cliente: string;
  id_campagna: string;
  id_agente: string;
  id_user: string;
  compl: string;
  nombres: string;
  estado: string;
  status: string;
  status_camp: string;
  resultado: string;
  nota: string;
  ultima_llamada: string;
  llamando: string;
  act:string;
  act_camp: string;
  cuadros: DataCuadros[];
}
export interface DataPachCampaV2 {
  id_cliente: string;
  compl: string;
  status_camp: string;
  resultado: string;
  ultima_llamada: string;
  llamando: string;
  act:string;
  act_camp: string;
  crear_nota: string;
  data_nota: DataNotas;
  cuadros: DataCuadros[];
}

export interface DataCuadros {
  inicio: string;
  fin: string;
  resultado: string;
  nota: string;
  agente: string;
}

export interface RespHistorial {
  id: string;
  id_user: string;
  id_cliente: string;
  import: string;
  fecha: string;
  tipo: string;
  mensaje: string;
}
export interface DiasRespHistorial {
  dia: number,
  dia_pago:boolean,
  data :RespHistorial[]
}

export interface DataPostHistorial {
  id_cliente: number,
  import: number,
  tipo: string,
  mensaje: string,
  fecha: string
}

export interface MsgWhatsapp {
  phone: string,
  body: string
}



