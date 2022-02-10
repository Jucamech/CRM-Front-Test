import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-buenas-noticias',
  templateUrl: './speech-buenas-noticias.component.html',
  styleUrls: ['./speech-buenas-noticias.component.css']
})
export class SpeechBuenasNoticiasComponent implements OnInit, OnDestroy {
  //class
  intro: string='intro';

  susb: any;
  nombre: string;
  cliente: Partial<ClientModel>;

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre');
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r)
  }

}
