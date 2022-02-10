import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-cree-que-paga-acredor-original',
  templateUrl: './speech-cree-que-paga-acredor-original.component.html',
  styleUrls: ['./speech-cree-que-paga-acredor-original.component.css']
})
export class SpeechCreeQuePagaAcredorOriginalComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  intro: string ='intro';

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }
  //class

}
