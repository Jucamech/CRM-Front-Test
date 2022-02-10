import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-mecanico',
  templateUrl: './speech-mecanico.component.html',
  styleUrls: ['./speech-mecanico.component.css']
})
export class SpeechMecanicoComponent implements OnInit {
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
