import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-speech-ni-me-interesa',
  templateUrl: './speech-ni-me-interesa.component.html',
  styleUrls: ['./speech-ni-me-interesa.component.css']
})
export class SpeechNiMeInteresaComponent implements OnInit, OnDestroy {
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
