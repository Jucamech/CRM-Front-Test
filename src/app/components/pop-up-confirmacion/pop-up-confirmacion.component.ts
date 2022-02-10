import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { COLOR, METODO } from 'src/app/shared/constants/pagos';
import { RespPago, RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { DataCobro, PagosCobrosService } from 'src/app/shared/services/pagos-cobros.service';

@Component({
  selector: 'app-pop-up-confirmacion',
  templateUrl: './pop-up-confirmacion.component.html',
  styleUrls: ['./pop-up-confirmacion.component.css']
})
export class PopUpConfirmacionComponent implements OnInit, OnChanges {
  @Output() toogle3Emit = new EventEmitter<boolean>()
  @Input() dataItem: RespPago;
  @Input() toogle3: boolean;

  usuariosList: Array<RespUser>;
  totalInscripcion: number;
  totalMensualidad: number;
  Hoy: string;
  medios = METODO;
  colores = COLOR;

  id_as_conf: number;
  isSupervisor: boolean = false;

  valor: number;
  medio: string
  fecha_pago: string;
  nota_cita: string;
  color: string;

  ids_from_select = {
    id_cli: '',
    id_agent: ''
  }

  constructor(private funcSer: FuncionesComunesService,
              private AgentSer: AgentesService,
              private Pay: PagosCobrosService) {
    this.Hoy = `${this.funcSer.getFecha()}`
  }

  ngOnInit(): void {
    this.getAgentes();
    this.generarPermiso();
    this.valor = this.dataItem.valor;
    this.fecha_pago = this.Hoy;
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c.dataItem.currentValue) {
      this.toogle3 = true;
    }
  }

  getAgentes() {
    this.usuariosList = []
    this.AgentSer.callAgentes().then(
      (res: RespUser[]) => {
        this.usuariosList = this.AgentSer.filtrarAgentesconExt(res);
      });
  }

  editarCobro() {
    let id = String(this.dataItem.id);
    if (this.isSupervisor) {
      let newData: DataCobro = {
        medio: this.medio,
        descripcion: this.nota_cita,
        id_asesor: String(this.id_as_conf),
        status: '1',
        tipo_pago: String(this.dataItem.tipo_pago),
        fecha_pago: this.fecha_pago,
        valor : this.valor,
        color: this.color,
      }
      if (this.nota_cita && this.medio) {
        this.Pay.generarPagoOnCobro(id, newData).then(() => {
          localStorage.removeItem('b292e6b3');
          this.cerrar();
        });
      } else {
        this.funcSer.showSweetError('ERROR', 'Faltan Campos!', 2000);
      }
    }
  }

  cerrar() {
    this.toogle3Emit.emit(true)
    this.toogle3 = false;
    let x: RespPago;
    this.dataItem = x;
  }

  log2(id_user: string) {
    this.ids_from_select.id_agent = id_user;
  }

  generarPermiso() {
    const tok = localStorage.getItem('token');
    const Token = this.funcSer.parseJwt(tok);
    this.id_as_conf = Token.data.id
    if (Token.data.nivel > 1) {
      this.isSupervisor = true;
    }
  }

}
