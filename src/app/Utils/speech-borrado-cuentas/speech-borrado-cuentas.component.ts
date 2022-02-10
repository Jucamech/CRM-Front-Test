import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-borrado-cuentas',
  templateUrl: './speech-borrado-cuentas.component.html',
  styleUrls: ['./speech-borrado-cuentas.component.css']
})
export class SpeechBorradoCuentasComponent implements OnInit, OnDestroy {
  susb: Subscription;
  cliente: Partial<ClientModel>;

  //class
    intro: string='intro';

  //toggle
    cuentaborrada: boolean;
    solicitarreferidos: boolean;

  constructor(private httpSer: AuthService) {
    this.cuentaborrada = false;
    this.solicitarreferidos = false;
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }


  verBtns(str: string) {
    switch (str) {
    case 'cb':
        this.cuentaborrada = !this.cuentaborrada;
        break;
    case 'sr':
        this.solicitarreferidos = !this.solicitarreferidos;
        break;
    }
  }

}
