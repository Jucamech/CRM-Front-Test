import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-nosotros-cumplimos',
  templateUrl: './speech-nosotros-cumplimos.component.html',
  styleUrls: ['./speech-nosotros-cumplimos.component.css']
})
export class SpeechNosotrosCumplimosComponent implements OnInit, OnDestroy {
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
