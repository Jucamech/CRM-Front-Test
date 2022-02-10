import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-lectura-credito',
  templateUrl: './speech-lectura-credito.component.html',
  styleUrls: ['./speech-lectura-credito.component.css']
})
export class SpeechLecturaCreditoComponent {
//class
intro:string='intro';
puntaje:string='none';
direccion:string='none';
inkiri:string='none';
chequeado:string='none';
borrar:string='none';
public:string='none';

notiene:string='none';
sumario:string='none';
sumariod:string='none';
cuentarepor:string='none';
cuentarepord:string='none';
drama:string='none';
judgements:string='none';
// :string='none';
// :string='none';


  constructor() { }

  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        break;

      case 'puntaje':
        this.intro = 'none';
        this.puntaje = 'puntaje';
        break;
        
      case 'direccion':
        this.puntaje = 'none';
        this.direccion = 'direccion';
        break;
      
      case 'inkiri':
        this.direccion = 'none';
        this.inkiri = 'inkiri';
        break;
      
      case 'chequeado':
        this.inkiri = 'none';
        this.chequeado = 'chequeado';
        break;
      
      case 'borrar':
        this.chequeado = 'none';
        this.borrar = 'borrar';
        break;
      
      case 'public':
        this.borrar = 'none';
        this.public = 'public';
        break;
      
      case 'notiene':
        this.public = 'none';
        this.notiene = 'notiene';
        break;
      
      case 'judgements':
        this.public = 'none';
        this.judgements = 'judgements';
        break;
        
      case 'sumario':
        this.judgements = 'none';
        this.sumario = 'sumario';
        break;
      
      case 'notiene':
        this.sumariod = 'none';
        this.notiene = 'notiene';
        break;
        
      
      case 'cuentarepord':
        this.sumariod = 'none';
        this.cuentarepord = 'cuentarepord';
        break;
      
      case 'drama':
        this.cuentarepor = 'none';
        this.drama = 'drama';
        break;

      case 'judgements':
        this.drama = 'none';
        this.judgements = 'judgements';
        break;

        case 'sumario1':
          this.judgements = 'none';
          this.sumario = 'sumario';
          break;
        
        case 'notiene':
          this.sumario = 'none';
          this.notiene = 'notiene';
          break;
        
        case 'sumariod':
          this.notiene = 'none';
          this.sumariod = 'sumariod';
          break;
          
        case 'cuentarepor':
          this.sumario = 'none';
          this.cuentarepor = 'cuentarepor';
          break;
        
        case 'sumario':
        this.cuentarepor = 'none';
        this.sumario = 'sumario';
        break;
    }
  }

}
