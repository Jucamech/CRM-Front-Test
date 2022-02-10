import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-trabaja-alguien-mas',
  templateUrl: './speech-trabaja-alguien-mas.component.html',
  styleUrls: ['./speech-trabaja-alguien-mas.component.css']
})
export class SpeechTrabajaAlguienMasComponent implements OnInit {
//class
intro: string='intro';

//toggle
recomendaciones: boolean;

  constructor() {
    this.recomendaciones = false;
  }

  ngOnInit(): void {}

  verBtns(str: string) {
    switch (str) {
    case 'reco':
        this.recomendaciones = !this.recomendaciones;
        break;
    }
  }
}
