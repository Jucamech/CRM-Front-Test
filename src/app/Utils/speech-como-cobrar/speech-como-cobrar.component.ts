import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-como-cobrar',
  templateUrl: './speech-como-cobrar.component.html',
  styleUrls: ['./speech-como-cobrar.component.css']
})
export class SpeechComoCobrarComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //class
  intro: string= 'intro';

  //toggle
  vermodal: boolean;
  recomendaciones: boolean;

  constructor(private httpSer: AuthService) {
    this.vermodal = false;
    this.recomendaciones = false;
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  verBtns(str: string) {
    switch (str) {
    case 'reco':
        this.recomendaciones = !this.recomendaciones;
        break;

    }
}


}
