import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-cobro',
  templateUrl: './speech-cobro.component.html',
  styleUrls: ['./speech-cobro.component.css']
})
export class SpeechCobroComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  // class
  intro: string = 'intro';

  //toggle
  credi_CB: boolean;
  credi_CB2: boolean;

  constructor(private httpSer: AuthService){
    this.credi_CB = false;
    this.credi_CB2 = false;
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  verBtns(str: string) {
    switch (str) {
      case 'ndeposito':
        this.credi_CB = !this.credi_CB;
        break;
      case 'sdeposito':
        this.credi_CB2 = !this.credi_CB2;
        break;
    }
  }
}
