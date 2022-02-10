import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel, RespPago } from 'src/app/shared/models/usuario.model';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { DataCobro, DataPago, PagosCobrosService } from 'src/app/shared/services/pagos-cobros.service';
import { Subscription } from 'rxjs';
import { METODO } from 'src/app/shared/constants/pagos';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit, OnDestroy {
  @Input() Cliente: Partial<ClientModel>;
  tooglePop3: boolean;
  dataCliente: string;
  idCliente: string;
  formPagos: RespPago;

  dataPago: Array<RespPago>;
  dataCobro: Array<RespPago>;
  medios = METODO;
  Hoy: string;

  id_as_conf: string;
  is_kim: boolean;
  isSupervisor: boolean = false;
  is_admin: boolean;
  toogle: boolean = false;
  modal: boolean = false;

  //////////DATOS DE LE ENVIO////////////////////

  tipo_pago: string;
  fecha_pago: string;
  fecha_proximo: string;//fecha
  valor: string;
  estado_pago: number; // 1 o 0
  descripcion: string;
  medio: string;

  color: string;
  status: string = '0';

  pago_mensualidad: number = 0;
  pago_inscripcion: number = 0;

  comprobante_pago: string; // archivo
  E$1: Subscription;

  totalM: number = 0;
  totalI: number = 0;
  totalG: number = 0;
  totalE: number = 0;

  item: RespPago;
  item2: RespPago;
  modalRecic: boolean;
  fecharRecicl: string;
  super_adm: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private Pay: PagosCobrosService,
              private funcSer: FuncionesComunesService)
  {
    this.idCliente = this.route.snapshot.params['id'];
    this.Hoy = `${this.funcSer.getFecha()}`;
    this.tipo_pago = '1';
    this.is_admin = this.funcSer.generarPermisos();
    this.isSupervisor = this.funcSer.generarPermisosN2();
    this.is_kim = this.funcSer.generarPermisosUnicos('110');
    this.super_adm = this.funcSer.generarPermisosAdmin();
  }

  ngOnDestroy(): void {
    try {
      this.E$1.unsubscribe();
    } catch (err) { }
  }

  ngOnInit(): void {
    this.getDataClient();
    this.E$1 = this.Pay.ClientPagosCobros$.subscribe(r => {
      this.dataCobro = r[0];
      this.dataPago = r[1];
      this.ttlPayM_i(this.dataPago);
    })
  }

  confirmarPago(item:RespPago){
    this.item = item;
    this.tooglePop3 = true;
  }

  ttlPayM_i(data: RespPago[]){
    let m:number = 0;
    let i:number = 0;
    data.forEach(p => {
      if (p.tipo_pago == 1 ) {
        m = (m + Number(p.valor));
      } else if (p.tipo_pago == 2) {
        i = (i + Number(p.valor));
      }
    });
    this.totalG = this.dataPago.length + this.dataCobro.length;
    this.totalI = i;
    this.totalM = m;
  }

  reset(){
    this.fecha_pago = '';
    this.medio = null;
    this.descripcion = '';
    this.valor = null;
    this.tipo_pago = '1';
    this.color = null;
    this.status = '0';
  }

  getDataClient(){
    this.Pay.CallDataCli(this.idCliente).then(r => {
      this.funcSer.log('data pagos', r);
      this.toogle = false;
      this.dataCobro = r[0];
      this.dataPago = r[1];
    }).catch(err => {
      this.funcSer.logWarn('Error', err);
      this.toogle = false;
      this.dataCobro = [];
      this.dataPago = [];
    });
  }

  async delCobro(item:RespPago){
    this.funcSer.showSweetX( 'Eliminar', `Confirma La Eliminación`,'OK!')
    .then(() => {
      this.eliminar(item);
    });
  }

  async eliminar(item:RespPago){
    await this.Pay.delCobro(String(item.id)).then(( r ) => {
      this.getDataClient();
    });
  }

  reciclarCobro(item: RespPago){
    this.item2 = item;
    this.modalRecic = true;
  }

  cambiarLaFecha(){
    if (this.item2 && this.fecharRecicl) {
      let id = String(this.item2.id);
      let data: DataCobro = {
        descripcion: this.item2.descripcion,
        id_asesor: this.id_as_conf,
        status: String(this.item2.status),
        tipo_pago: String(this.item2.tipo_pago),
        fecha_pago: this.fecharRecicl,
        valor: this.item2.valor
      };
      if (this.fecharRecicl >= this.Hoy ) {
        this.Pay.editarPagoCobro(id, data).then((r) => {
          this.item2 = null;
          this.modalRecic = false;
          this.getDataClient();
          localStorage.removeItem('b292e6b3');
        });
      } else {
        this.funcSer.showSweetWarning('No aceptable', 'La fecha mínima es de Hoy', 2000);
      }
    }
  }

  agregarCobro() {
    const id = this.idCliente;
    const idUs = localStorage.getItem('id_agente');/////// pendiente a mejorar
    let formCobro: DataPago = {
      id_user: idUs,
      fecha_pago: this.fecha_pago,
      medio: this.medio ? this.medio : '0',
      descripcion: this.descripcion,
      valor: this.valor,
      tipo_pago: this.tipo_pago,
      num_pago: this.dataPago ? this.dataPago.length + 1 : 0,
      color: this.color,//'0'
      status: this.status// '0'
    }
    this.Pay.generarCobro(id, formCobro).then(() => {
      this.toogle = false
      this.getDataClient();
      this.reset();
      localStorage.removeItem('b292e6b3');
    });
  }

  cerrarForm(): void {
    this.router.navigateByUrl(('consultarcliente'));
  }

  cerrarModal(){
    this.modal = false;
  }

  refresh(){
    this.ngOnInit();
  }

  pasarCobros(item: RespPago){
    let data: DataCobro = {
      descripcion: item.descripcion,
      id_asesor: item.id_asesor? String(item.id_asesor) : this.idCliente,
      status: '0',
      tipo_pago: String(item.tipo_pago),
      fecha_pago: item.fecha_pago,
      valor: item.valor
    };
    this.funcSer.showSweetX('Confirmar', 'Seguro de Cambiar de Pagos A Cobros ?')
    .then(() => {
      this.Pay.editarPagoCobro(String(item.id), data).then(() => {
        this.getDataClient();
      });
    })
  }
  //
}
