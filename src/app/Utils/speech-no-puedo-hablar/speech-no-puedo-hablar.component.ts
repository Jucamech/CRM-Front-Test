import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-no-puedo-hablar',
  templateUrl: './speech-no-puedo-hablar.component.html',
  styleUrls: ['./speech-no-puedo-hablar.component.css']
})
export class SpeechNoPuedoHablarComponent implements OnInit, OnDestroy {

  susb: any;
  cliente: Partial<ClientModel>;
  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

}
