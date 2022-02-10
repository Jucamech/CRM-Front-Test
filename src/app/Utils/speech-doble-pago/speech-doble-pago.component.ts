import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-doble-pago',
  templateUrl: './speech-doble-pago.component.html',
  styleUrls: ['./speech-doble-pago.component.css']
})
export class SpeechDoblePagoComponent implements OnInit {
  cliente$: Partial<ClientModel>;

  constructor(private httpSer: AuthService, private title: Title)
  {
    title.setTitle('DOBLE PAGO');
  }

  ngOnInit(): void {
    this.httpSer.dataClienteE$.subscribe(r => this.cliente$ = r);
  }

}
