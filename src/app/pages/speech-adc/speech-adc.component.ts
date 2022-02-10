import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-speech-adc',
  templateUrl: './speech-adc.component.html',
  styleUrls: ['./speech-adc.component.css']
})
export class SpeechAdcComponent implements OnInit {

  visulizador: string;

  constructor(private funcionesCent: FuncionesComunesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.visulizador = id
  }

}
