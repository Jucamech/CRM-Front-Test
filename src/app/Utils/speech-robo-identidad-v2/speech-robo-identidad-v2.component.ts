import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-robo-identidad-v2',
  templateUrl: './speech-robo-identidad-v2.component.html',
  styleUrls: ['./speech-robo-identidad-v2.component.css']
})
export class SpeechRoboIdentidadV2Component implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;

  no_usa: boolean;
  cancelar: boolean;

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
