import { Component } from '@angular/core';

@Component({
  selector: 'app-speech-llamada-seg-tiene',
  templateUrl: './speech-llamada-seg-tiene.component.html',
  styleUrls: ['./speech-llamada-seg-tiene.component.css']
})
export class SpeechLlamadaSegTieneComponent {
  //class
  intro:string='intro';
  //toggle
    butonSi: boolean;
    butonnopi: boolean;
    buzonSi:    boolean;
    buzonno:    boolean;
    hacepoco: boolean;
    nohacepoco: boolean;
    reclamacioncinco: boolean;
    reclamaciontres: boolean;
    menosdias: boolean;
    maxdias: boolean;
    insmx: boolean;
    dicmn: boolean;

  constructor() {
    this.butonSi = false;
    this.butonnopi = false;
    this.buzonSi = false;
    this.buzonno = false;
    this.hacepoco = false;
    this.nohacepoco = false;
    this.reclamacioncinco = false;
    this.reclamaciontres = false;
    this.menosdias = false;
    this.maxdias = false;
    this.insmx = false;
    this.dicmn = false;
  }

    verBtns(str: string) {
      switch (str) {
      case 'bnsi':
          this.butonSi = !this.butonSi;
          break;
      case 'bnnop':
          this.butonnopi = !this.butonnopi;
          break;

      case 'bzsi':
          this.buzonSi = !this.buzonSi;
          break;

      case 'bzno':
          this.buzonno = !this.buzonno;
          break;

      case 'hcpc':
          this.hacepoco = !this.hacepoco;
          break;

      case 'nohcpc':
          this.nohacepoco = !this.nohacepoco;
          break;

      case 'cincorclmcon':
          this.reclamacioncinco = !this.reclamacioncinco;
          break;

      case 'tresrclmcon':
          this.reclamaciontres = !this.reclamaciontres;
          break;

      case 'mnsds':
          this.menosdias = !this.menosdias;
          break;

      case 'mxds':
          this.maxdias = !this.maxdias;
          break;
      case 'mx':
          this.insmx = !this.insmx;
          break;
      case 'mn':
          this.dicmn = !this.dicmn;
          break;
      }
    }

  }
