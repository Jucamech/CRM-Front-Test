import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-no-he-hecho-nada',
  templateUrl: './speech-no-he-hecho-nada.component.html',
  styleUrls: ['./speech-no-he-hecho-nada.component.css']
})
export class SpeechNoHeHechoNadaComponent  {
  //class
  intro:string='intro';

  //toggle
  ss: boolean;
  sslic: boolean;
  sslicbill: boolean;

  constructor() {
    this.ss = false;
    this.sslic = false;
    this.sslicbill = false;
  }

  verBtns(str: string) {
    switch (str) {
      case 's':
        this.ss = !this.ss;
        break;

      case 'sl':
        this.sslic = !this.sslic;
        break;

      case 'slb':
        this.sslicbill = !this.sslicbill;
        break;
    }
  }



}
