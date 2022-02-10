import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-evidencia-trackings',
  templateUrl: './speech-evidencia-trackings.component.html',
  styleUrls: ['./speech-evidencia-trackings.component.css']
})
export class SpeechEvidenciaTrackingsComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //class
  intro:string='intro';
  agente: string;

  constructor(private httpSer: AuthService) {this.agente = localStorage.getItem('nombre')}

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
