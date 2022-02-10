import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-lectura-reparacion-credito',
  templateUrl: './speech-lectura-reparacion-credito.component.html',
  styleUrls: ['./speech-lectura-reparacion-credito.component.css']
})
export class SpeechLecturaReparacionCreditoComponent implements OnInit, OnDestroy {
  susb: any;
  nombre: string;
  cliente: Partial<ClientModel>;

  // CLASES
  intro:string = 'intro';
  creditoMalo: string = 'none';
  direcciones: string = 'none';
  chequearle: string = 'none';
  fijese: string = 'none';
  inquiries: string = 'none';

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre');
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r)
  }



  cambiarP(str: string) {
    switch (str) {
      case 'creditoMalo':
        this.intro = 'none';
        this.creditoMalo = 'creditoMalo'
        break;
      case 'direcciones':
        this.creditoMalo = 'none';
        this.direcciones = 'direcciones'
        break;
      case 'chequearle':
        this.direcciones = 'none';
        this.chequearle = 'chequearle'
        break;
      case 'fijese':
        this.chequearle = 'none';
        this.fijese = 'fijese'
        break;
      case 'inquiries':
        this.fijese = 'none';
        this.inquiries = 'inquiries'
        break;

    }
  }

  atrasP(str: string) {
    switch (str) {
      case 'creditoMalo':
        this.creditoMalo = 'none'
        this.intro = 'intro';
        break;

      case 'direcciones':
        this.direcciones = 'none'
        this.creditoMalo = 'creditoMalo';
        break;

      case 'chequearle':
        this.chequearle = 'none'
        this.direcciones = 'direcciones';
        break;

      case 'fijese':
        this.fijese = 'none'
        this.chequearle = 'chequearle';
        break;

      case 'inquiries':
        this.inquiries = 'none'
        this.fijese = 'fijese';
        break;
    }
  }

  /*
  intro
  creditomalo
  direcciones
  checkearle
  fijese
  inquires
   */
}
