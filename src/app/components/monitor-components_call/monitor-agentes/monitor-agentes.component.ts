import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgentModel } from 'src/app/shared/models/otros.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-monitor-agentes',
  templateUrl: './monitor-agentes.component.html',
  styleUrls: ['./monitor-agentes.component.css']
})
export class MonitorAgentesComponent implements OnInit, OnDestroy {
  agentes: AgentModel[];
  E$: Subscription;

  constructor(private AgentSer: AgentesService,
              private funcSer: FuncionesComunesService) { }
  ngOnDestroy(): void {
    try {
      this.E$.unsubscribe()
    } catch (error) {}
  }

  ngOnInit(): void {
    this.callAgentes();
    this.E$ = this.funcSer.interval(4000).subscribe(()=> {
      this.callAgentes();
    })
  }

  callAgentes(){
    this.AgentSer.getUsersPhone().then(r => {
      this.agentes = r;
    })
  }

}
