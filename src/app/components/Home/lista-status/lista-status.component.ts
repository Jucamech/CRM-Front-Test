import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MOTIVOS } from 'src/app/shared/constants/citas';
import { METODO } from 'src/app/shared/constants/pagos';
import { ClienteModelGen, RespCitasM, RespPago, RespUser } from 'src/app/shared/models/usuario.model';
import { DataAnalizarInterf2, RastreadorClientesService, SinPagos } from 'src/app/shared/others/hook/rastreador-clientes.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-lista-status',
  templateUrl: './lista-status.component.html',
  styleUrls: ['./lista-status.component.css']
})
export class ListaStatusComponent implements OnInit, OnDestroy {
  @ViewChild('FullPantalla') FullPantalla: ElementRef;
  @Input() agentes: RespUser[];
  agentesFilt: RespUser[];
  fullData2: RespPago[][];

  Metodo = METODO;
  txto = 'Cobros Pendientes por Pagar '

  cobros: RespPago[];
  cobrosCopia: RespPago[];
  pagos: RespPago[][];
  pagosCopia: RespPago[][];
  pagosHoy: RespPago[];
  detallePago: RespPago;
  E$: Subscription[] = [];
  clientes: ClienteModelGen[];
  clienteSinPago: SinPagos[];
  clienteAlDia: RespPago[][] = [];
  full_p: boolean = false;
  spinner: boolean = false;
  minmodal: boolean = false;
  minmodalCita: boolean = false;
  is_admin: boolean;
  verpagos: string = 'tabla1';
  hoy: string;
  d = 1440;
  dia30: string;
  motivos_cita = MOTIVOS;

  totalizado = {
    pagos : 0,
    cobros : 0
  }
  selectFilt:string;
  selectFilt2:string;
  selectFilt3:string;
  itemCita: RespPago;
  estado: string;
  nota: string;
  motivo: string;
  fecha: string;
  hora: string;
  agt: string;
  search: string;
  search2: string;
  search3: string;
  page: number = 0;
  fechalimite: string;
  dataInit: boolean =false;

  constructor(private followCli : RastreadorClientesService,
              private funcSer: FuncionesComunesService,
              private citaSer: CitasService)
  {
    this.dia30 = this.funcSer.restMinDate( this.hoy, this.d * 30 ).slice(0,10);
    this.hoy  = this.funcSer.getFecha();
    this.is_admin = this.funcSer.generarPermisosN2();
  }

  ngOnDestroy(): void {
    try {
      this.followCli.destruirObserverYdata();
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {}
  }

  ngOnInit(): void {
    const E$1 = this.followCli.cobros$.subscribe( res => {
      this.cobros = res;
      this.cobrosCopia = res;
      this.pagos = this.followCli.AllPagos;
      this.pagosCopia = this.followCli.AllPagos;
    });
    const E$3 = this.followCli.ClientesEmiter$.subscribe( res => this.clientes = res);
    this.filtrarAgent();
    this.E$ = [E$1, E$3];
  }

  iniciarLIst(){
    this.dataInit = true;
    this.followCli.getClientes();
  }

  filtrarAgent(){
    this.agentesFilt = [];
    let extF = /332|345|321|555|556/;
    if (this.agentes) {
      this.agentes.forEach(a => {
        if (String(a.ext).length == 3) {
          if (!String(a.ext).match(extF)) {
            this.agentesFilt.push(a);
          }
        }
      });
    }
  }

  buscador(str: string,n: number){
    switch (n) {
      case 1:
        this.search = str;
        break;
      case 2:
        this.search2 = str;
        break;
      case 3:
        this.search3 = str;
        break;

    }
  }

  scrollToBottom(): void {
    try {
      this.FullPantalla.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  refrescar(){
    this.followCli.destruirObserverYdata();
    this.followCli.getClientes();
    this.txto = 'Cobros Pendientes por Pagar ';
  }

  analizarData(){
    this.followCli.analizarCobros();
  }

  getFullData(){
    this.scrollToBottom();
    this.verpagos = 'tabla2' ;
    this.page = 0;
    this.spinner = true;
    this.fullData2 = this.followCli.setDataAn();
    this.funcSer.log('clientes', this.clientes);
    if (this.fullData2.length > 0) {
      this.spinner = false;
    } else {
      setTimeout(() => {
        this.funcSer.showSweetError(' Error', 'No hay respuesta', 2000);
        this.spinner = false;
      }, 10000);
    }
  }

  getCobrosHoy(){
    this.scrollToBottom();
    this.txto = 'Cobros Pedientes Hoy';
    this.cobros = [];
    this.cobrosCopia.forEach( c => {
      if (c.fecha_pago.match(this.hoy) ) {
        this.cobros.push( c );
      }
    });
    this.verpagos = 'tabla1';
    this.funcSer.ordenarAny(this.cobros, 'fecha_pago', 'Desc');
  }

  getPagosHoy(){
    this.scrollToBottom();
    this.pagosHoy = [];
    this.totalizado.pagos =0;
    this.txto = 'Pagos Realizados Hoy';
    this.funcSer.log('copia de pagos', this.pagosCopia);

    this.pagosCopia.forEach( data => {
      data.forEach( p => {
        if  (p.fecha_pago.match(this.hoy) ) {
          this.totalizado.pagos =( Number(this.totalizado.pagos) + Number(p.valor));
          this.pagosHoy.push(p)
        }
      });
    });
    this.verpagos = 'tabla4';
    this.funcSer.ordenarAny(this.pagosHoy, 'fecha_pago', 'Desc');
  }

  getTodos(): void{
    this.scrollToBottom();
    this.txto = 'Cobros Pendientes por Pagar ';
    this.verpagos = 'tabla1';
    this.cobros = this.cobrosCopia;
    // this.total = this.cobros.length
  }
  getProximos(): void{
    this.scrollToBottom();
    this.txto = 'Proximos Cobros';
    let dia1 = this.funcSer.addMinToDate( this.hoy, this.d * 2 ).slice(0,10);
    let dia2 = this.funcSer.addMinToDate( this.hoy, this.d * 3 ).slice(0,10);
    let dia3 = this.funcSer.addMinToDate( this.hoy, this.d * 4 ).slice(0,10);
    let dia4 = this.funcSer.addMinToDate( this.hoy, this.d * 5 ).slice(0,10);
    let dia5 = this.funcSer.addMinToDate( this.hoy, this.d * 6 ).slice(0,10);
    let dia6 = this.funcSer.addMinToDate( this.hoy, this.d * 7 ).slice(0,10);
    let dia7 = this.funcSer.addMinToDate( this.hoy, this.d * 8 ).slice(0,10);
    const regex = new RegExp(`${dia1}|${dia2}|${dia3}|${dia4}|${dia5}|${dia6}|${dia7}`);
    this.cobros = [];
    this.cobrosCopia.forEach( c => {
      if (c.fecha_pago.match(regex) ) {
        this.cobros.push( c );
      }
    });
    this.verpagos = 'tabla1';
    this.funcSer.ordenarAny(this.cobros, 'fecha_pago', 'Asc');
  }

  getRecientes(): void{
    this.scrollToBottom();
    this.txto = 'Cobros Recientes';
    let dia1 = this.funcSer.restMinDate( this.hoy, 1 ).slice(0,10);
    let dia2 = this.funcSer.restMinDate( this.hoy, this.d ).slice(0,10);
    let dia3 = this.funcSer.restMinDate( this.hoy, this.d * 2 ).slice(0,10);
    let dia4 = this.funcSer.restMinDate( this.hoy, this.d * 3 ).slice(0,10);
    let dia5 = this.funcSer.restMinDate( this.hoy, this.d * 4 ).slice(0,10);
    let dia6 = this.funcSer.restMinDate( this.hoy, this.d * 5 ).slice(0,10);
    let dia7 = this.funcSer.restMinDate( this.hoy, this.d * 6 ).slice(0,10);
    const regex = new RegExp(`${this.hoy}|${dia1}|${dia2}|${dia3}|${dia4}|${dia5}|${dia6}|${dia7}`);
    this.cobros = [];
    this.cobrosCopia.forEach( c => {
      if (c.fecha_pago.match(regex) ) {
        this.cobros.push( c );
      }
    });
    this.verpagos = 'tabla1';
    this.funcSer.ordenarAny(this.cobros, 'fecha_pago', 'Desc');
  }

  getAtrasado30(): void{
    this.scrollToBottom();
    this.txto = 'Atrasados hasta 30 Dias';
    let dia30 = this.funcSer.restMinDate( this.hoy, this.d * 30 ).slice(0,10);
    this.cobros = [];
    this.cobrosCopia.forEach( c => {
      if (c.fecha_pago > dia30 && c.fecha_pago <= this.hoy ) {
        this.cobros.push( c );
      }
    });
    this.verpagos = 'tabla1';
    this.funcSer.ordenarAny(this.cobros, 'fecha_pago', 'Desc');
  }

  getAtrasadoMas30(): void{
    this.scrollToBottom();
    this.txto = 'Atrasados más de 30 Dias';
    let dia30 = this.funcSer.restMinDate( this.hoy, this.d * 30 ).slice(0,10);
    this.cobros = [];
    this.cobrosCopia.forEach( c => {
      if (c.fecha_pago < dia30 ) {
        this.cobros.push( c );
      }
    });
    this.verpagos = 'tabla1';
    this.funcSer.ordenarAny(this.cobros, 'fecha_pago', 'Desc');
  }

  getSinPagos(){
    this.scrollToBottom();
    this.verpagos = 'tabla3';
    this.clienteSinPago = this.followCli.clientesSinPagos;
  }

  getAlDia(): void{
    this.clienteAlDia = [];
    this.scrollToBottom();
    this.page = 0;
    this.verpagos = 'tabla5';
    this.spinner = true;
    this.fullData2 = this.followCli.setDataAn();
    if (this.fullData2.length > 0) {
      this.fullData2.forEach( dat => {
        const el = this.totalizar(dat);
        if (el.alDia) {
          this.clienteAlDia.push(dat);
        }
      });
      this.spinner = false;
    } else {
      setTimeout(() => {
        this.funcSer.showSweetError(' Error', 'No hay respuesta', 2000);
        this.spinner = false;
      }, 10000);
    }
  }

  verdetalle(item: RespPago){
    this.minmodal = true;
    this.detallePago = item;
  }

  nextP(){
    if ( this.fullData2.length >= this.page + 20) {
      this.page = this.page + 20;
    }
  }
  prevP(){
    if (this.page > 0) {
      this.page = this.page - 20;
    }
  }

  getPagosExtras(): void{}

  totalizar(data: RespPago[]): DataAnalizarInterf2{
    let t:DataAnalizarInterf2 = {
      pagosTotal: 0,
      fechaInicio: '',
      pagosInsc: 0,
      pagosMen: 0,
      ultimo_Pago: '',
      alDia: false,
      proximo_Pago: '',
      fecha_sac: ''
    }
    data.forEach( (d, i) => {
      if (d.status == 1 ) {
        if (d.fecha_pago && i == 0) {
          t.ultimo_Pago = d.fecha_pago;
        } else if (d.fecha_pago && i == 1) {
          if (!t.ultimo_Pago){
            t.ultimo_Pago = d.fecha_pago;
          }
        } else {
          if (!t.ultimo_Pago) {
            t.ultimo_Pago = 'ERROR EN DATOS!'
          }
        }
        if (d.tipo_pago == 1 ) {
          t.pagosMen = Number(t.pagosMen) + Number(d.valor);
        } else if (d.tipo_pago == 2) {
          t.pagosInsc = Number(t.pagosInsc) + Number(d.valor);
        }
      }
    });
    t.pagosTotal = Number(t.pagosMen) + Number(t.pagosInsc);
    t.proximo_Pago = this.funcSer.addMinToDate( t.ultimo_Pago, 43200 ).slice(0,10);
    t.fecha_sac = this.funcSer.restMinDate( t.proximo_Pago, 10080 ).slice(0,10);
    if (t.proximo_Pago != 'NaN-NaN-Na' && t.fecha_sac > this.hoy.slice(0,10) ) { t.alDia = true }
    else { t.alDia = false; };

    return t;
  }

  pedirCita( item :RespPago ){
    this.filtrarAgent();
    this.minmodalCita = true;
    this.itemCita = item;
  }

  crearCita(){
    if (this.nota, this.motivo, this.fecha, this.hora, this.agt, this.estado) {
      let id = String( this.itemCita.id_cliente );
      let data: RespCitasM = {
        id_asignado: this.agt,
        campos_adicionales: [],
        estado: this.estado,
        fechahora: `${this.fecha} ${this.hora}`,
        motivo: this.motivo,
        notas: this.nota
      }
      this.citaSer.crearCita(id, data);
      this.cerrarModal();
    } else {
      this.funcSer.showSweetError('ERROR', 'Faltan campos!', 2000);
    }
  }

  cerrarModal(){
    this.minmodalCita = false;
    this.estado = null;
    this.fecha = null;
    this.hora = null;
    this.motivo = null;
    this.nota = null;
    this.agt = null;
    this.itemCita = null;
  }

}

  /*
    let r = new Date(hoy);
    let dia1 = this.funcSer.fromTimeStamp( r.setDate(r.getDate() - 1 ) );
  */
