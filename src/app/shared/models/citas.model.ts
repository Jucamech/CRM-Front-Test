

export interface ModoCampaña {
  estado : string;
  name: string;
  activo: boolean;
  did: string;
  nameDid: string;
}

export interface RespCampaña {
  index: string;
  id: string;
  data: ModoCampaña;
}

//////////////////////////////////////////////////

export interface DataClientcamp {
  id: string;
  compl: boolean; // si la campaña termino o no se llamado debe estar en true
  nombre: string;
  estado: string;
  status: string;
  telefonos: string[];
  status_camp: string;
  resultado: string;
  nota: string;
  agente: string;
  user: string;
  ultima_llamada: number;
  disponible: boolean;
  llamando?: boolean;
  /////////////
  act?: boolean;
  act_camp: boolean;
  coll?: string;
  cuadros?: DataLLamadaCli[];
}

export interface ResDatapCampCli {
  id: string;
  data: DataClientcamp ;
}

export interface DataLLamadaCli {
  inicio: number;
  fin: number;
  resultado: string;
  nota: string;
  agente: string;
}

export const CAMP_RESULT = [

  ['Busy', 'B' , 'rojo'],
  ['No Contesta', 'NC', 'rojo'],
  ['LLamada Colgada', 'LLC', 'rojo'],
  ['LLamada Rechazada', 'LLR', 'rojo'],
  ['Mensaje de Voz', 'G', 'amarillo'],
  ['Cliente nos LLama', 'D', 'amarillo'],
  ['Prospecto Positivo', 'PP', 'amarillo' ],
  ['Prospecto Negativo', 'PN', 'amarillo' ],
  ['Asigno Cita', 'AC', 'amarillo' ],
  ['Satisfactoria con Datos', 'LL8OK', 'verde'],
  ['Venta', 'VEN', 'verde'],
  ['SAC', 'SAC', 'verde']

]

export const MOTIVOS_CITA = [
  ['1', 'Lectura de reporte'],
  ['2', 'Hablar de caso'],
  ['3', 'Documentos pendientes'],
  ['4', 'Firmar contrato'],
  ['5', 'Cobro'],
  ['6', 'Trackings'],
  ['7', 'Llamada 800'],
  ['8', 'Venta']
]

//////////////////////////////////////////////////

