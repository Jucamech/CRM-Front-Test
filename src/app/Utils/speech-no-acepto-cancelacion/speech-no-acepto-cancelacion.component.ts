import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-no-acepto-cancelacion',
  templateUrl: './speech-no-acepto-cancelacion.component.html',
  styleUrls: ['./speech-no-acepto-cancelacion.component.css']
})
export class SpeechNoAceptoCancelacionComponent {
  //class
  intro:string='intro';

  //toggle
  contrato: boolean;

  constructor() {
    this.contrato = false;
  }

  verBtns(str: string) {
      switch (str) {
      case 'contr':
          this.contrato = !this.contrato;
          break;
      }
  }

}
