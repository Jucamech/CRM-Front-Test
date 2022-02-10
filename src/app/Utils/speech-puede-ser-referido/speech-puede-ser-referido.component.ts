import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-puede-ser-referido',
  templateUrl: './speech-puede-ser-referido.component.html',
  styleUrls: ['./speech-puede-ser-referido.component.css']
})
export class SpeechPuedeSerReferidoComponent implements OnDestroy, OnInit {
  cliente: Partial<ClientModel>;
  susb:any;

  //Class
  intro:string='intro';

  //toggle
  butonvisa: boolean;
  butonmaster: boolean;

  //data
  parentesco:string;
  nombre_referido: string;
  telefono_referido: string;

  constructor(private httpSer: AuthService) {
    this.butonvisa = false;
    this.butonmaster = false;
  }
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r)
  }

  verBtns(str: string) {
    switch (str) {
    case 'buvis':
        this.butonvisa = !this.butonvisa;
        break;
    case 'bumas':
        this.butonmaster = !this.butonmaster;
        break;
    }
  }



}
