import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-robo-identidad',
  templateUrl: './speech-robo-identidad.component.html',
  styleUrls: ['./speech-robo-identidad.component.css']
})
export class SpeechRoboIdentidadComponent  {
//class
intro:string='intro';

//toggle
bloqueo: boolean;
informac: boolean;

  constructor() {
    this.bloqueo = false;
    this.informac = false;
  }
  
  verBtns(str: string) {
    switch (str) {
    case 'si':
        this.bloqueo = !this.bloqueo;
        break;
        
    case 'no':
        this.informac = !this.informac;
        break;
    
    }
}

}
