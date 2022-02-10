import { Component, Input, OnInit } from '@angular/core';
import { ClientesService, RespTelCli } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-monitor-estado-call',
  templateUrl: './monitor-estado-call.component.html',
  styleUrls: ['./monitor-estado-call.component.css']
})

export class MonitorEstadoCallComponent implements OnInit {
  @Input() modal: boolean;

  id_cli: string;
  est_v: boolean = true;
  id_as_conf: any;
  isSupervisor: boolean = false;
  tel: string;
  respID: RespTelCli[];


  constructor(private funcSer: FuncionesComunesService,
              private ClientSer: ClientesService) { }

  ngOnInit(): void {
    this.generarPermiso();
  }

  getCliTel(){
    this.ClientSer.getIdCliente(this.tel).then(r => {
      this.respID = r;
    });
  }

  generarPermiso() {
    const tok = localStorage.getItem('token');
    const Token = this.funcSer.parseJwt(tok)
    this.id_as_conf = Token.data.id
    if (Token.data.nivel > 1) {
      this.isSupervisor = true
    }
  }

  abrirModal(id: string){
    this.id_cli = id;
    this.modal = true;
  }

}
