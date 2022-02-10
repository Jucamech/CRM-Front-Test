import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-si-dios-quiere',
  templateUrl: './speech-si-dios-quiere.component.html',
  styleUrls: ['./speech-si-dios-quiere.component.css']
})
export class SpeechSiDiosQuiereComponent implements OnInit {
  cliente$: Partial<ClientModel>;

  constructor(private httpSer: AuthService, private title: Title)
  {
    title.setTitle('SI DIOS QUIERE');
  }

  ngOnInit(): void {
    this.httpSer.dataClienteE$.subscribe(r => this.cliente$ = r)
  }

}
