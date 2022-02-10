import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-compras',
  templateUrl: './speech-compras.component.html',
  styleUrls: ['./speech-compras.component.css']
})
export class SpeechComprasComponent {
  //class
  intro:string='intro';
  agente: string;

  constructor() {this.agente = localStorage.getItem('agente')}

}
