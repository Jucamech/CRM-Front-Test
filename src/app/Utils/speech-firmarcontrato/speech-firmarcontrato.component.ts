import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-firmarcontrato',
  templateUrl: './speech-firmarcontrato.component.html',
  styleUrls: ['./speech-firmarcontrato.component.css']
})
export class SpeechFirmarcontratoComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //class
  intro: string='intro';
  sitiene: string='none';
  notiene: string='none';
  notienept2: string='none';

  //toggle
  sillegoelcorreo: boolean;
  nollegoelcorreo: boolean;

  constructor(private httpSer: AuthService) {
    this.sillegoelcorreo = false;
    this.nollegoelcorreo = false;
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  verBtns(str: string) {
    switch (str) {
    case 'sillego':
        this.sillegoelcorreo = !this.sillegoelcorreo;
        break;
    case 'nollego':
        this.nollegoelcorreo = !this.nollegoelcorreo;
        break;
    }
  }

  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        break;

      case 'sitiene':
        this.intro = 'none';
        this.sitiene = 'sitiene';
        break;

      case 'notiene':
        this.intro = 'none';
        this.notiene = 'notiene';
        break;

      case 'notienept2':
        this.notiene = 'none';
        this.notienept2 = 'notienept2';
        break;
    }
  }

}
