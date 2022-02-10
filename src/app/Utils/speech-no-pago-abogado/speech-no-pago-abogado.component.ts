import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-no-pago-abogado',
  templateUrl: './speech-no-pago-abogado.component.html',
  styleUrls: ['./speech-no-pago-abogado.component.css']
})
export class SpeechNoPagoAbogadoComponent {
  //class
  intro: string='intro';

  //togless

  butonYes: boolean;
  butonNon: boolean;
  btncumplio: boolean;


  constructor() {
    this.butonYes = false;
    this.butonNon = false;
    this.btncumplio = false;
    }

  verBtns(str: string) {
    switch (str) {
    case 'bnyes':
        this.butonYes = !this.butonYes;
        break;
    case 'bnnw':
        this.butonNon = !this.butonNon;
        break;
    case 'btncum':
        this.btncumplio = !this.btncumplio;
        break;
    }
}

}
