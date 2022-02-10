import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-verified-delete',
  templateUrl: './speech-verified-delete.component.html',
  styleUrls: ['./speech-verified-delete.component.css']
})
export class SpeechVerifiedDeleteComponent {
//class
intro:      string='intro';
objectivo:  string = 'none';
momentos:  string = 'none';

//toggle
veridelet: boolean;
segcuenta: boolean;

  constructor() {
    this.veridelet = false;
    this.segcuenta = false;
  }


  cambiarP(str: string) {
    switch (str) {

      case 'objectivo':
        this.objectivo = 'objectivo';
        this.intro = 'none';
        break;

        case 'momentos':
        this.momentos = 'momentos';
        this.objectivo = 'none';
        break;

    }
  }

  verBtns(str: string) {
    switch (str) {
      case 'dlte':
        this.veridelet = !this.veridelet;
        break;
        case 'cuentados':
          this.segcuenta = !this.segcuenta;
          break;
      }

  }

}
