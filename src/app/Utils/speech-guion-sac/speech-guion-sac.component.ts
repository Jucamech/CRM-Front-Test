import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-guion-sac',
  templateUrl: './speech-guion-sac.component.html',
  styleUrls: ['./speech-guion-sac.component.css']
})
export class SpeechGuionSACComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  agent: string;

  constructor(private httpSer: AuthService) { this.agent = localStorage.getItem('nombre')}

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
