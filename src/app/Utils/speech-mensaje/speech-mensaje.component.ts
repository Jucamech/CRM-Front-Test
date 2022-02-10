import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-mensaje',
  templateUrl: './speech-mensaje.component.html',
  styleUrls: ['./speech-mensaje.component.css']
})
export class SpeechMensajeComponent  {
  //class
  intro:string='intro';
  dmensaje:string='none';
  mensajebn:string='none';
  llamadap:string='none';

  //toggle
  automovil: boolean;

  //select
  credi_BM: string = '';

    constructor() {
      this.automovil = false;
    }

    cambiarP(str: string) {
      switch (str) {
        case 'intro':
          this.intro = 'intro';
          break;

        case 'dmensaje':
          this.intro = 'none';
          this.dmensaje = 'dmensaje';
          break;

        case 'mensajebn':
          this.intro = 'none';
          this.mensajebn = 'mensajebn';
          break;

          case 'llamadap':
          this.intro = 'none';
          this.llamadap = 'llamadap';
          break;

      }
    }
    verBtns(str: string) {
      switch (str) {
      case 'auto':
          this.automovil = !this.automovil;
          break;

      }
  }

}
