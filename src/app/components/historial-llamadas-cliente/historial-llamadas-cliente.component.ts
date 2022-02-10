import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LlamadasResp } from 'src/app/shared/models/otros.model';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';

@Component({
  selector: 'app-historial-llamadas-cliente',
  templateUrl: './historial-llamadas-cliente.component.html',
  styleUrls: ['./historial-llamadas-cliente.component.css']
})
export class HistorialLlamadasClienteComponent implements OnInit {
  id_cli: string;
  llamadas: LlamadasResp[];

  constructor(private callSer: LlamadasPerdidasService,
              private funcSer: FuncionesComunesService,
              private activateRoute: ActivatedRoute)
  {
    this.id_cli = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getLLamadas();
  }

  getLLamadas(): void{
    this.callSer.getLLamadasCliente(this.id_cli).then((res) => {
      this.llamadas = res;
    });
  }

}
