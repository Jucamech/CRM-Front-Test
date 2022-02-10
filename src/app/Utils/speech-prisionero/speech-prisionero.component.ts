import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-speech-prisionero',
  templateUrl: './speech-prisionero.component.html',
  styleUrls: ['./speech-prisionero.component.css']
})
export class SpeechPrisioneroComponent implements OnInit, OnDestroy {
  cliente$: Partial<ClientModel>;
  nombre_prosp: string;
  ss: string;
  susb: any;

  constructor(private funtC : FuncionesComunesService,
              private httpSer: AuthService,
              private title: Title)
  {
    title.setTitle('PRISIONERO');
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente$ = r);
  }

  getDatosSer(){
    let data = this.funtC.getDatos()
    return data
  }

}
