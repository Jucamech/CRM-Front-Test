import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-no-cartas',
  templateUrl: './speech-no-cartas.component.html',
  styleUrls: ['./speech-no-cartas.component.css']
})
export class SpeechNoCartasComponent implements OnInit, OnDestroy {
  cliente$: Partial<ClientModel>;
  susb: any;

  constructor(private httpSer: AuthService,private title: Title)
  {
    title.setTitle('No CARTAS')
  }
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente$ = r);
  }

}
