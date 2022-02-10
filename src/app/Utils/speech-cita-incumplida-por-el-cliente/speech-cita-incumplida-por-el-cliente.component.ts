import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-cita-incumplida-por-el-cliente',
  templateUrl: './speech-cita-incumplida-por-el-cliente.component.html',
  styleUrls: ['./speech-cita-incumplida-por-el-cliente.component.css']
})
export class SpeechCitaIncumplidaPorElClienteComponent implements OnInit {
  nombre: string;

  constructor() { }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre');
  }

}
