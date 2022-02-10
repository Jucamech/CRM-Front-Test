import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-division-credito',
  templateUrl: './speech-division-credito.component.html',
  styleUrls: ['./speech-division-credito.component.css']
})
export class SpeechDivisionCreditoComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //class
  intro:string='intro';
  cuentaA:string='none';
  limite:string='none';
  balance:string='none';
  palabras:string='none';

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

        case 'cuentaA':
          this.intro = 'none';
          this.cuentaA = 'cuentaA';
          break;

        case 'limite':
          this.cuentaA = 'none';
          this.limite = 'limite';
          break;

        case 'balance':
          this.limite = 'none';
          this.balance = 'balance';
          break;

        case 'palabras':
          this.balance = 'none';
          this.palabras = 'palabras';
          break;
      }
    }

  }
