import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-cuenta-disputada',
  templateUrl: './speech-cuenta-disputada.component.html',
  styleUrls: ['./speech-cuenta-disputada.component.css']
})
export class SpeechCuentaDisputadaComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //Class
  intro:string='intro';

  //toggle
  INQUIRY: boolean;

  constructor(private httpSer: AuthService) {
    this.INQUIRY = false;
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  verBtns(str: string) {
    switch (str) {
    case 'inkiri':
        this.INQUIRY = !this.INQUIRY;
        break;

    }
  }

}
