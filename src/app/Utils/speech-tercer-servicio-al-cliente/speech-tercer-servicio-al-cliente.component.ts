import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-tercer-servicio-al-cliente',
  templateUrl: './speech-tercer-servicio-al-cliente.component.html',
  styleUrls: ['./speech-tercer-servicio-al-cliente.component.css']
})
export class SpeechTercerServicioAlClienteComponent implements OnInit, OnDestroy {

  susb: any;
  cliente: Partial<ClientModel>;
  agente: string;
  //class
  intro:string='intro';


  //propiedad
  hoy = new Date()
  pro: number;
  //toggle
  mostrarcorreo: boolean;
  wppmstrar: boolean;

  //select
  tipo_rc: string;
  nopuedoH: boolean = false;

  constructor(private httpSer: AuthService) {
    this.pro = this.hoy.setMonth(this.hoy.getMonth() + 1)
    this.mostrarcorreo = false;
    this.wppmstrar = false;
    this.agente = localStorage.getItem('nombre')
  }
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }
  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  verBtns(str: string) {
    switch (str) {
    case 'mc':
        this.mostrarcorreo = !this.mostrarcorreo;
        break;
    case 'mw':
        this.wppmstrar = !this.wppmstrar;
        break;
    }
  }


}
