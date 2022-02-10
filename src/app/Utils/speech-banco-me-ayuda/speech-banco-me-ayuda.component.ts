import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-banco-me-ayuda',
  templateUrl: './speech-banco-me-ayuda.component.html',
  styleUrls: ['./speech-banco-me-ayuda.component.css']
})
export class SpeechBancoMeAyudaComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
