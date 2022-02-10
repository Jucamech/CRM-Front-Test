import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-timesquare',
  templateUrl: './speech-timesquare.component.html',
  styleUrls: ['./speech-timesquare.component.css']
})
export class SpeechTimesquareComponent implements OnInit {
  cliente: Partial<ClientModel>;
  susb:any;

  constructor(private httpSer: AuthService) { }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r)
  }

}
