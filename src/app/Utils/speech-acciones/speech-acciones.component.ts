import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-acciones',
  templateUrl: './speech-acciones.component.html',
  styleUrls: ['./speech-acciones.component.css']
})
export class SpeechAccionesComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //class
  intro: string = 'intro';
  deposito: string = 'none';

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        break;

      case 'deposito':
        this.intro = 'none';
        this.deposito = 'deposito';
        break;
    }
  }
}
