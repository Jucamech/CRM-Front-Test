import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-referido',
  templateUrl: './speech-referido.component.html',
  styleUrls: ['./speech-referido.component.css']
})
export class SpeechReferidoComponent implements OnInit, OnDestroy  {
  susb: any;
  cliente: Partial<ClientModel>;
  //class
  intro:string='intro';

  constructor(private httpSer: AuthService){}

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

}
