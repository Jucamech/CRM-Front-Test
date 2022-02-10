import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-califico-tarjetas',
  templateUrl: './speech-califico-tarjetas.component.html',
  styleUrls: ['./speech-califico-tarjetas.component.css']
})
export class SpeechCalificoTarjetasComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  intro: string='intro';
  agente:string;

  constructor(private httpSer: AuthService)
  { this.agente = localStorage.getItem('nombre')}

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
