import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-documentos-cliente-ay-n',
  templateUrl: './speech-documentos-cliente-ay-n.component.html',
  styleUrls: ['./speech-documentos-cliente-ay-n.component.css']
})
export class SpeechDocumentosClienteAyNComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;
  //class
  intro: string='intro';
  cviejo: string='none';
  cnuevo: string='none';
  lioso: string='none';
  lioso2: string='none';
  bill: string='none';
  bill2: string='none';
  AhoraNoPuede: string='none';

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  cambiarP(str: string) {
    switch (str) {

      case 'cviejo':
        this.cviejo = 'cviejo';
        this.intro = 'none';
        break;

        case 'cnuevo':
        this.cnuevo = 'cnuevo';
        this.intro = 'none';
        break;

        case 'lioso':
        this.lioso = 'lioso';
        this.cnuevo = 'none';
        break;

        case 'bill':
        this.bill = 'bill';
        this.cnuevo = 'none';
        break;

        case 'lioso2':
        this.lioso2 = 'lioso2';
        this.cviejo = 'none';
        break;

        case 'bill2':
        this.bill2 = 'bill2';
        this.cviejo = 'none';
        break;

        case 'AhoraNoPuede':
        this.AhoraNoPuede = 'AhoraNoPuede';
        this.lioso2 = 'none';
        break;

        case 'bill2':
        this.bill2 = 'bill2';
        this.cviejo = 'none';
        break;

        case 'AhoraNoPuede2':
        this.AhoraNoPuede = 'AhoraNoPuede';
        this.bill2 = 'none';
        break;

    }
  }


}
