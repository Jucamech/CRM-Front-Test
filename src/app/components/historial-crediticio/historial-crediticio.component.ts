import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel, RespReporteCred } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-crediticio',
  templateUrl: './historial-crediticio.component.html',
  styleUrls: ['./historial-crediticio.component.css']
})
export class HistorialCrediticioComponent implements OnInit {
  @Input() cliente: Partial<ClientModel>;
  dataCliente: string;
  idCliente: string;
  /*  formPagos:RespPago */

  dataHistorial: Array<RespReporteCred>;
  reporte:RespReporteCred;
  is_Admin: boolean;
  verDatos:boolean = false;

  //////////DATOS DE LE ENVIO////////////////////

  fecha: string;
  acreedor: string;
  buro: number;// 1 , 2 , 3
  numero_cuenta: string = '';
  tipo_cuenta: string = '';
  estado: string = '';// 1 0 2
  comentarios: string = '';
  limite: number = 0;
  balance: number = 0;
  cierre: number = 10;

  verhist:boolean = false;
  edit:boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private funcSer: FuncionesComunesService,
              private httpServ: AuthService)
  {
    this.idCliente = this.route.snapshot.params['id'];
    this.is_Admin = this.funcSer.generarPermisosAdmin();
  }

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial(){
    let hist: RespReporteCred[] = [];
    this.httpServ.getHistorCredi(this.idCliente).subscribe(
      resDocum => {
        for (const clave in resDocum) {
          hist.push(resDocum[clave]);
        }
        this.dataHistorial = hist;
      }
    )
  }

  cerrarForm(): void {
    this.router.navigateByUrl('consultarcliente');
  }

  reset(){
    this.fecha = null;
    this.acreedor = null;
    this.buro = null;
    this.numero_cuenta = '';
    this.tipo_cuenta = '';
    this.estado = '';
    this.comentarios = '';
    this.limite = 0;
    this.balance = 0;
    this.cierre = 10;
  }

  agregarReporte() {
    let data: RespReporteCred = {
      fecha: this.fecha ?  this.fecha : '0000-00-00',
      acreedor: String(this.acreedor),
      buro: this.buro,
      cuenta: this.numero_cuenta,
      tipo_cuenta: this.tipo_cuenta,
      estado: Number(this.estado),
      comentarios: this.comentarios,
      limite: this.limite,
      balance: this.balance,
      cierre: this.cierre
    }
    this.httpServ.postHistorCredi(this.idCliente, data).subscribe(
      res => {
        if (res['id']) {
          this.funcSer.showSweetSuccess('OK!', 'Registro creado', 1500);
          this.getHistorial();
          this.reset();
        }
      }
    )
  }

  verReporte(item:RespReporteCred){
    this.verhist = true;
    this.reporte = item;
  }

  editR(item:RespReporteCred){
    this.edit = true;
    this.reporte = item;
  }

  editarHistorial(){
    const E$ = this.httpServ.pacthHistorCredi(this.reporte.id, this.reporte).subscribe(() => {
      this.funcSer.showSweetSuccess('OK!', '', 1200);
      E$.unsubscribe();
    }, err => {
      this.funcSer.showSweetError('ERROR', `${err}`, 2000);
      E$.unsubscribe();
    })
    this.cerrarM();
  }

  eliminarDoc(id: string){
    Swal.fire({
      title: 'Confirmar!',
      text: `Eliminar Registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar!',
    }).then((r) => {
      if (r.value) {
        const E$1 = this.httpServ.delHistorCred(id).subscribe((r) => {
          this.getHistorial();
          E$1.unsubscribe();
        },() => E$1.unsubscribe() )
      }
    });
  }

  cerrarM(){
    this.verhist = false;
    this.edit = false;
    this.reporte = null;
  }

}
