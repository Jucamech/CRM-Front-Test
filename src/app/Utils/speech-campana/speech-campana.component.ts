import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-campana',
  templateUrl: './speech-campana.component.html',
  styleUrls: ['./speech-campana.component.css']
})
export class SpeechCampanaComponent {
//class
  intro:string='intro';
  agente: string;


  constructor() { this.agente = localStorage.getItem('nombre')}

}
