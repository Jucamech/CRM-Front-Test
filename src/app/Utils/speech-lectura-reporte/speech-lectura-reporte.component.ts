import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-lectura-reporte',
  templateUrl: './speech-lectura-reporte.component.html',
  styleUrls: ['./speech-lectura-reporte.component.css']
})
export class SpeechLecturaReporteComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  agente: string;

  constructor(private httpSer: AuthService) { this.agente = localStorage.getItem('nombre'); }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
