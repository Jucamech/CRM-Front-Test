import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-no-han-hecho-nada',
  templateUrl: './speech-no-han-hecho-nada.component.html',
  styleUrls: ['./speech-no-han-hecho-nada.component.css']
})
export class SpeechNoHanHechoNadaComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  opc = 0;
  opc2 = 0;

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
