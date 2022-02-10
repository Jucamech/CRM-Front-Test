import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPostHistorial, DiasRespHistorial, FechasPost, RespHistorial } from 'src/app/shared/models/otros.model';
import { CalendarioService } from 'src/app/shared/services/calendario.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { ClientModel, RespCitasM, RespPago, RespUser } from 'src/app/shared/models/usuario.model';
import { PagosCobrosService } from 'src/app/shared/services/pagos-cobros.service';
import { MOTIVOS_CITA } from 'src/app/shared/models/citas.model';
import { CitasService } from 'src/app/shared/services/citas.service';


@Component({
  selector: 'app-calendario-cliente',
  templateUrl: './calendario-cliente.component.html',
  styleUrls: ['./calendario-cliente.component.css']
})
export class CalendarioClienteComponent implements OnInit {
  @Input() wei: string = '70%'; // para recibir las dimensiones desde el padre
  @Input() hei: string = '100%'; // para recibir las dimensiones desde el padre
  @Input() cliente:Partial<ClientModel>;

  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  dias:number[] = []
  MOTIVOS = MOTIVOS_CITA;

  hora: Date = new Date();
  mes = new Date().getMonth();
  year = new Date().getFullYear();
  d:Number[];
  ds: number;
  hoy: string;
  dataCalend: RespHistorial[];
  diasData: DiasRespHistorial[];

  id_cli: string;
  fulldataDia: DiasRespHistorial;
  agentes: RespUser[];
  copiaDataDia: DiasRespHistorial;
  dataCobro:RespPago[];
  dataPago:RespPago[];
  inicio_mes: number;
  vermas: boolean;
  c_cita: boolean;
  c_nota: boolean;
  mensaje: string;

  //////////////////////////////////
  estado_cita: string;
  motivo_cita: string;
  fecha: string;
  hora_c: string;
  nota_cita: string;
  id_asignado: string;
  nota: string;

  constructor(private funcSer: FuncionesComunesService,
              private activateRoute: ActivatedRoute,
              private agentSer: AgentesService,
              private Pay: PagosCobrosService,
              private citasServ: CitasService,
              private CalendarSer: CalendarioService)
  {
    this.hoy = this.funcSer.getFecha();
    this.id_cli = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.generarDias();
    this.getDataMes();
    this.getAgentes();
    this.getDataClientPagos();
  }

  getDataClientPagos(){
    this.Pay.CallDataCli(this.id_cli).then(r => {
      this.funcSer.log('data pagos', r);
      this.dataCobro = r[0];
      this.dataPago = r[1];
      this.ultimoPago();

    }).catch(err => {
      this.dataCobro = [];
      this.dataPago = [];
    });
  }

  pagoHoy():number{
    let m = new Date().getMonth();
    let y = new Date().getFullYear();
    let x:number;
    if (this.dataPago) {
      let l = this.dataPago.length
      if (l) {
        let datPay = this.dataPago[l -1].fecha_pago;
        x = new Date(datPay).getDate();
        if  (m == this.mes && y == this.year ) {
          x = x;
        } else { x = 55 }
      }
    }
    return x ? x : 55;
  }

  ultimoPago():number{
    let m = new Date().getMonth();
    let y = new Date().getFullYear();
    let x:number;
    if (this.dataCobro){
      if (this.dataCobro.length > 1) {
        this.funcSer.ordenarAny(this.dataCobro, 'fecha_pago', 'Desc');
      }
      let l = this.dataCobro.length
      if (l) {
        let datPay = this.dataCobro[l -1].fecha_pago;
        x = new Date(datPay).getDate();
        if  (m == this.mes && y == this.year ) {
          x = x;
        } else { x = 55 }

      }
    }
    return x ? x : 55;
  }

  private getAgentes(){
    this.agentSer.callAgentes().then(res => {
      this.agentes = res;
    })
  }

  public marcarHoy(n: number): boolean{
    if (this.year == new Date().getFullYear()) {
      if (this.mes == new Date().getMonth()) {
        let dia = new Date().getDate()
        if (dia == n) {
          return true;
        }
      }
    }
    return false;
  }

  nextM(){
    if (this.mes < 11) {
      this.mes += 1;
    } else {
      this.year += 1;
      this.mes = 0;
    }
    this.getDataMes();
    this.generarDias();
  }

  prevM(){
    if (this.mes > 0) {
      this.mes -= 1;
    } else {
      this.year -= 1;
      this.mes = 11;
    }
    this.getDataMes();
    this.generarDias();
  }

  generarDias(){
    let dx = new Date(this.year, this.mes + 1, 0).getDate();
    this.dias = [...Array(dx).keys() ];
    let m = this.mes > 9 ? `${this.mes + 1}`: `0${this.mes + 1}`;
    let f = `${this.year}-${m}-01 12:00:00`;
    let d = new Date(f).getUTCDay();
    this.d =  [ ...Array(d).keys() ];
    this.ds = null;
  }

  selecionarDia(d:number, dat?: DiasRespHistorial){
    this.ds = d;
    if (dat) {
      this.fulldataDia = dat;

      this.copiaDataDia = dat;
    } else {
      this.fulldataDia = {
        dia: d-1,
        dia_pago: false,
        data : []
      };
    }
    this.funcSer.log('data del dia 1', this.fulldataDia);
  }

  getDataMes(){
    let m = this.mes > 9 ? `${this.mes + 1}`: `0${this.mes + 1}`;
    let data: FechasPost = {
      fecha_inicio: `${this.year}-${m}-01`,
      fecha_final: `${this.year}-${m}-31`
    }
    this.inicio_mes = new Date(`${this.year}-${m}-01 12:00:00`).getDay();
    this.CalendarSer.getDataMes(this.id_cli, data, this.dias).then(res => {
      this.dataCalend = res;
      this.diasData = this.CalendarSer.generarDiasconData(res, this.dias, this.cliente, this.inicio_mes );
      if(this.diasData){
        this.dias = null;
      }
    }).catch(() => {
      this.diasData = null;
    })
  }

  //////////////////////////////////////////////////////
  ///////////// GENERAR DATA EN CALENDARIO /////////////

  crearNota(){

    let d = (this.fulldataDia.dia + 1) < 10  ? `0${this.fulldataDia.dia + 1}`: `${this.fulldataDia.dia + 1}`;
    let m = this.mes < 10 ? `0${this.mes + 1}`: `${this.mes + 1}`;

    let data: DataPostHistorial = {
      id_cliente: Number(this.id_cli),
      import: 6,
      tipo: 'Nota C',
      mensaje: this.mensaje,
      fecha: `${this.year}-${m}-${d} 12:00:00`
    }
    this.CalendarSer.postData(data).then(() => {
      this.funcSer.showToast('Nota creada', 'OK!', 1400);
      this.vermas = false;
      this.getDataMes();
      this.generarDias();
    });
  }

  crearCita(){
    let cita: RespCitasM = {
      campos_adicionales: [],
      estado: '1',
      fechahora: `${this.fecha} ${this.hora_c}`,
      motivo: this.motivo_cita,
      notas: this.nota,
      id_asignado: this.id_asignado
    }
    console.log(cita);

    this.citasServ.crearCita(this.id_cli, cita)
  }

}
/*
llamadas
citas
pagos
cambios data
contestaciones
servicio al cliente
cartas
documentos
*/

/*
dia pago = borde negro
dia q ya pago = fondo azul claro
 */

