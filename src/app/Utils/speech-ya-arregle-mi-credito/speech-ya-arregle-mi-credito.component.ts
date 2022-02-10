import { Component, OnDestroy, OnInit } from '@angular/core';
import { Campos_adicionales, ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-ya-arregle-mi-credito',
  templateUrl: './speech-ya-arregle-mi-credito.component.html',
  styleUrls: ['./speech-ya-arregle-mi-credito.component.css']
})
export class SpeechYaArregleMiCreditoComponent implements OnInit, OnDestroy {
  cliente: Partial<ClientModel>;
  susb:any;

  puntaje_experian: string;
  puntaje_equifax: string;
  puntaje_trans_u: string;

  constructor(private httpSer: AuthService) { }
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r)
  }

  sendData(){
    let camposAd: Campos_adicionales = {
      puntaje_experian: this.puntaje_experian,
      puntaje_equifax: this.puntaje_equifax,
      puntaje_trans_u: this.puntaje_trans_u,
    }
  }

}
