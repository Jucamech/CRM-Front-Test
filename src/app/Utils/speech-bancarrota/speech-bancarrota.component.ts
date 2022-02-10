import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-bancarrota',
  templateUrl: './speech-bancarrota.component.html',
  styleUrls: ['./speech-bancarrota.component.css']
})
export class SpeechBancarrotaComponent implements OnInit, OnDestroy {
//class
intro:string='intro';

//toggle
  capsiete: boolean;
  caponce: boolean;
  captrece: boolean;
  susb: Subscription;
  cliente: Partial<ClientModel>;

  constructor(private httpSer: AuthService) {
    this.capsiete = false;
    this.caponce = false;
    this.captrece = false;
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  verBtns(str: string) {
    switch (str) {
    case 'siete':
        this.capsiete = !this.capsiete;
        this.caponce = false;
        this.captrece = false;
        break;

    case 'once':
        this.caponce = !this.caponce;
        this.capsiete = false;
        this.captrece = false;
        break;

    case 'trece':
        this.captrece = !this.captrece;
        this.caponce = false;
        this.capsiete = false;
        break;
    }
  }

}
