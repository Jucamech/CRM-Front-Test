import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FuncionesComunesService } from './shared/services/funciones-comunes.service';
import { AuthService } from './shared/services/auth.service';
import { ClientModel } from './shared/models/usuario.model';
import { Token } from './shared/services/citas-stack.service';
import { InfCallEnt, LlamadasService } from './shared/services/llamadas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CRM-CM';
  listClientes: ClientModel[];
  cliente: Partial<ClientModel>;
  copiaListClientes: Array<ClientModel>;
  clientMacth: boolean;

  autenticar = false;
  numEntrante: any;
  idEntrante: string;
  didEntrante: string;
  Token: Token;

  toggle: boolean;

  xc = 0;//contador para simular
  E$: Subscription[];

  id_saliente:number;
  dataEntrante:InfCallEnt;

  constructor(private httpServ: AuthService,
              private funcSer: FuncionesComunesService,
              private CallSer : LlamadasService,
              private router: Router) {
    this.toggle = true;
  }
  ngOnDestroy(): void {
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (error) {}
  }

  ngOnInit(): void {
    const E$1 = this.CallSer.llamandoID$.subscribe( r => this.id_saliente = r );
    const E$2 = this.httpServ.dataClienteE$.subscribe(r => {
      this.cliente = r ;
    });
    const E$3 = this.CallSer.llamandoData2$.subscribe( r => {
      this.dataEntrante = r;
      if (r.data) {
        this.idEntrante = this.dataEntrante.data.id_cliente;
        this.numEntrante = this.dataEntrante.data.numero_entrante;
        this.didEntrante = this.dataEntrante.data.did_local;
      }
    });
    const E$4 = this.funcSer.interval(1000).subscribe(() => {
      let token2 = localStorage.getItem('token');
      if ( token2  ) {
        this.Token =  this.funcSer.parseJwt( token2 );
        if ( this.Token.data.ext.length == 3) {
          //this.getCalling();
        }
      }
    });
    this.E$ = [E$1, E$2, E$3, E$4 ];
  }

  getCalling() {
    this.CallSer.getCallingSer();
    //this.CallSer.getCallingFake();
    if (this.dataEntrante && this.dataEntrante.libre) {
      this.cerrar();
    } else {
      this.toggle = this.CallSer.verModal
    }
  }

  verCliente(id: string) {
    this.router.navigateByUrl(`vercliente/${id}`);
  }

  cerrar() {
    this.CallSer.verModal = false;
    this.toggle = false;
  }

}
