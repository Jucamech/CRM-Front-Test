import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-rescate',
  templateUrl: './speech-rescate.component.html',
  styleUrls: ['./speech-rescate.component.css']
})
export class SpeechRescateComponent {
  //class
  intro: string = 'intro';

  //toggle

  seriedreclamaciones: boolean;
  faltandocumentos: boolean;

    constructor() {
      this.seriedreclamaciones = false;
      this.faltandocumentos = false;
    }
    verBtns(str: string) {
      switch (str) {
      case 'sdr':
          this.seriedreclamaciones = !this.seriedreclamaciones;
          break;
      case 'fdoc':
          this.faltandocumentos = !this.faltandocumentos;
          break;
      }
    }
}
