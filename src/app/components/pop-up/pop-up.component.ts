import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { METODO } from 'src/app/shared/constants/pagos';
import { RespPago, RespUser } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit, OnChanges {
  @Output() metodoEmit = new EventEmitter<number>()
  @Input() dataItem: RespPago;
  @Input() dataPagoH: RespPago[];
  @Input() toogle: boolean;
  @Input() usuariosList: RespUser[];

  isSupervisor: boolean = false;
  dataPagoHist: RespPago[];
  asesor_confirmacion: string;
  asesor_cobro: string;
  valor: string;
  medio: string;
  id_as_conf: number;
  medios = METODO;

  debe: number;


  totalIns: number;
  totalMen: number;
  fecha_pago: string;
  tipo_pago: string;

  constructor(private httpServ: AuthService,
              private functC: FuncionesComunesService) {
    this.toogle = false;
    this.isSupervisor = functC.generarPermisosN2();
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c.dataPagoH) {
      this.dataPagoHist = [];
      for (const key in c.dataPagoH.currentValue) {
        const el = c.dataPagoH.currentValue[key];
        this.dataPagoHist.push(el);
      }
    }
    this.toogle = true;
    this.totalizar();
  }


  ngOnInit(): void {
    if (this.dataItem) {
      this.cuantoDebe(this.dataItem);
      this.toogle = true;
    } else {
      this.toogle = false;
    }
  }

  /**Calcula cuanto debe el cliente  */
  cuantoDebe(item: RespPago): number{
    return this.debe = Number(item.plan_mes) * Number(item.valor_mensualidad);
  }

  cerrar() {
    let x: RespPago;
    this.toogle = false;
  }

  /**No esta en uso */
/*   reversarCobro(item: RespPago ){
    let id = String(this.dataItem.id);
    let newData = {
      color : item.color,
      fecha_pago: item.fecha_pago,
      status: '0',
      tipo_pago: item.tipo_pago,
      id_asesor: localStorage.getItem('id_agente')
    };
    if (this.isSupervisor) {
      Swal.fire({
        title: 'ATENCION!',
        text: `Desea reversar a cobros?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK!',
        cancelButtonText: 'Atras',
      }).then((resultado) => {
        if (resultado.value) {
          this.httpServ.patchPago(id, newData).subscribe(res => {
            if (res['rows'] == 1) {
              this.toogle = false;
              this.functC.showSweetSuccess('Guardado', 'Regresión a Pago',1500);
            } else {
              this.functC.showSweetError('ERROR','Fallo en regresion',2000);
            }
          });
        }
      });
    }
  } */

  /**Editor de cpbros y pagos !pronto a desabilitar! */
  editarPago() {
    let id = String(this.dataItem.id);////////
    if (this.isSupervisor) {
      let newData = {
        valor: this.valor,
        color: this.dataItem.color,
        descripcion: this.dataItem.descripcion,
        fecha_pago: this.fecha_pago,
        id_asesor: this.id_as_conf,
        tipo_pago: this.tipo_pago,
        medio: this.medio
      }
      this.httpServ.patchPago(id, newData).subscribe(res => {
        this.toogle = false;
        this.functC.showSweetSuccess('Guardado','Pago Editado',1500);
      })
    } else {
      let newDatax = {
        descripcion: this.dataItem.descripcion,
      }
      this.httpServ.patchPago(id, newDatax).subscribe(res => {
        this.toogle = false;
        this.functC.showSweetSuccess('Guardado','Pago Editado',1500);
      })
    }
    this.cerrar();
  }

  /**Totaliza los pagos y los cobros del cliente */
  private totalizar(): void {
    let ti: number = 0;
    let tm: number = 0;
    for (const key in this.dataPagoH) {
      const el = this.dataPagoH[key];
      if (el.status == 1 ) {
        if (el.tipo_pago == 2) {
          ti = ti + Number(el.valor);
        } else if (el.tipo_pago == 1) {
          tm = tm + Number(el.valor);
        }
      }
    }
    this.totalIns = ti;
    this.totalMen = tm;
  }

}
