import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-tiene-no-tiene-tiempo',
  templateUrl: './speech-tiene-no-tiene-tiempo.component.html',
  styleUrls: ['./speech-tiene-no-tiene-tiempo.component.css']
})
export class SpeechTieneNoTieneTiempoComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  agente: string;
  tiempo: boolean;
  noti: boolean;
  mas45D: boolean;
  buzon: boolean;
  reclamaciones: number = 3;

  constructor(private httpSer: AuthService) { this.agente = localStorage.getItem('nombre')}

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }


}
