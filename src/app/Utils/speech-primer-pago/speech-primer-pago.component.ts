import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-primer-pago',
  templateUrl: './speech-primer-pago.component.html',
  styleUrls: ['./speech-primer-pago.component.css']
})
export class SpeechPrimerPagoComponent {
//class
  intro:string='intro';
  compromiso:string='none';
  precompromiso:string='none';
  noestaserio:string='none';

  //toggle
  habiendole: boolean = false;

  //propiedad
  hoy = new Date()
  pro: number;

  constructor() {
    this.pro = this.hoy.setMonth(this.hoy.getMonth() + 1)
  }
  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        break;

      case 'precompromiso':
        this.intro = 'none';
        this.precompromiso = 'precompromiso';
        break;

      case 'compromiso':
        this.precompromiso = 'none';
        this.compromiso = 'compromiso';
        break;

      case 'noestaserio':
        this.compromiso = 'none';
        this.noestaserio = 'noestaserio';
        break;
    }
  }

}
