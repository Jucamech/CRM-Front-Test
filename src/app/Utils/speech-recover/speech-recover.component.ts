import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RespCalling } from 'src/app/shared/models/otros.model';
import { Campos_adicionales, ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech-recover',
  templateUrl: './speech-recover.component.html',
  styleUrls: ['./speech-recover.component.css'],
})
export class SpeechRecoverComponent implements OnInit, OnDestroy, OnChanges {
  @Input() idClienteAct: string;
  cliente$: Partial<ClientModel>;
  data$: RespCalling;
  idR$: number;
  metodo: string;
  idClientePost: number;

  verCli: string;

  //clases
  intro: string = 'intro';
  comoEstamos: string = 'none';
  quehayN: string = 'none';
  cuenteme: string = 'none';
  udemanda: string = 'none';
  tienecu: string = 'none';
  next: string = 'none';
  undolar: string = 'none';
  paraluego: string = 'none';
  fin: string = 'none';

  //toggle
  credi_BM: string = '';
  preguntas: boolean = false;
  aveces: boolean = false;
  muybn: boolean = false;

  // data
  email: string;
  email2: string;
  nombres: string;
  apellidos: string;
  numero_id: string;
  direccion: string;
  telcasa: string;
  nacimiento: string;

  direccion_facturas: string;
  direccion_tarjeta: string;
  creditos: string;
  direccion_reciente: string;
  tipo_tarjeta: number;
  id_tarjeta: string;
  exp: string;
  banco: string;
  cv: string;
  nombres_tarjeta: string
  buro: string;
  balance_cuenta: number;

  acredores: string;
  deudas_pendientes: string;

  E$: Subscription[];

  constructor(private httpSer: AuthService,
              private title: Title,
              private CallSer: LlamadasService) {
    this.title.setTitle('RECOVER');
  }
  ngOnChanges(c: SimpleChanges): void {
    if (c.idClienteAct.currentValue) {
      this.idClientePost = c.idClienteAct.currentValue;
    }
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach( e => e.unsubscribe() )
    } catch (error) {}
  }

  ngOnInit(): void {
    const E$1 = this.CallSer.llamandoID$.subscribe(r => {
      let emitID = localStorage.getItem('change');
      if (!emitID) {
        this.idR$ = r;
        this.verCli = `/vercliente/${this.idR$}`;

      } else if (emitID && !r){
        this.idR$ = Number(emitID && emitID != '66.99' ? emitID : null);
        this.verCli = `/vercliente/${this.idR$}`;
      }
      this.getCliente();
    });
    this.E$ = [E$1]
  }


  getCliente(){
    if (!this.cliente$ && this.idR$) {
      this.httpSer.getCliente(String(this.idR$)).subscribe(
        (r: Partial<ClientModel> )=> {
        this.cliente$ = r;
      });
    }
  }

  putCliente() {
    this.metodo = 'POST';
    let dataX: Partial<ClientModel>;
    let campos_adicionalesD: Partial<Campos_adicionales>;

    campos_adicionalesD = {
      direccion_facturas: this.direccion_facturas ? this.direccion_facturas : '',
      direccion_tarjeta: this.direccion_tarjeta ? this.direccion_tarjeta : '',
      id_tarjeta: this.id_tarjeta ? this.id_tarjeta : '',
      banco: this.banco ? this.banco : '',
      cv: this.cv ? this.cv : '',
      direccion_reciente: this.direccion_reciente ? this.direccion_reciente : '',
      exp: this.exp ? this.exp : '',
      nombres_tarjeta: this.nombres_tarjeta ? this.nombres_tarjeta : '',
      tipo_tarjeta: this.tipo_tarjeta ? Number(this.tipo_tarjeta) : 0,

    },

      dataX = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        telmovil: this.data$.numero_entrante,
        nacimiento: this.nacimiento ? this.nacimiento : '0000-00-00',
        numero_id: this.numero_id ? this.numero_id : '',
        direccion: this.direccion ? this.direccion : '',
        telcasa: this.telcasa ? this.telcasa : '',
        email: this.email ? this.email : '',
        email2: this.email2 ? this.email2 : '',
        campos_adicionales: campos_adicionalesD
      };

    if (this.data$ && this.data$.numero_entrante) {
      if (!this.idR$ && !this.idClienteAct && this.metodo == 'POST') {
        this.httpSer.putCliente(dataX).subscribe((res) => {
          this.idClientePost = res['id'];
          this.metodo = 'PACH';
          this.verCli = `/vercliente/${this.idClientePost}`;
          this.CallSer.llamandoID$.subscribe(this.idClientePost);
          Swal.fire({
            title: 'Guardado',
            allowOutsideClick: false,
            icon: 'success',
            text: 'Cliente Guardado Correctamente',
            showConfirmButton: false,
            timer: 500,
          });
        });
      }
      if (this.idClientePost || this.idR$ && this.metodo == 'PACH') {
        let id = String( this.idR$ ||this.idClientePost );
        this.httpSer.pacthCliente(dataX, id).subscribe(() => {
          this.httpSer.dataClienteE$.emit(dataX);
          Swal.fire({
            title: 'Guardado',
            allowOutsideClick: false,
            icon: 'success',
            text: 'Nuevos Datos Guardados',
            showConfirmButton: false,
            timer: 500,
          });
        }),
          (err) => {
            Swal.fire({
              title: 'FALLO!',
              icon: 'error',
              text: 'error :' + err.status,
              timer: 2000,
            });
          };
      }
    }
  }


  cambiarP(str: string) {
    switch (str) {

      case 'comoEstamos':
        this.comoEstamos = 'comoEstamos';
        this.intro = 'none';
        break;

      case 'quehayN':
        this.comoEstamos = 'none';
        this.quehayN = 'quehayN';
        break;
      case 'cuenteme':
        this.quehayN = 'none';
        this.cuenteme = 'cuenteme';
        break;

      case 'udemanda':
        this.cuenteme = 'none';
        this.udemanda = 'udemanda';
        break;

      case 'tienecu':
        this.cuenteme = 'none';
        this.tienecu = 'tienecu';
        break;

      case 'next':
        this.tienecu = 'none';
        this.next = 'next';
        break;

      case 'undolar':
        this.next = 'none';
        this.undolar = 'undolar';
        break;

      case 'paraluego':
        this.undolar = 'none';
        this.paraluego = 'paraluego';
        break;

      case 'fin':
        this.putCliente()
        this.paraluego = 'none';
        this.fin = 'fin';
        break;
    }
  }

  regresarP(str: string) {
    switch (str) {

      case 'udemanda':
        this.cuenteme = 'cuenteme';
        this.udemanda = 'none';
        break;

      case 'tienecu':
        this.cuenteme = 'cuenteme';
        this.tienecu = 'none';
        break;

      case 'next':
        this.tienecu = 'tienecu';
        this.next = 'none';
        break;

      case 'undolar':
        this.next = 'next';
        this.undolar = 'none';
        break;

      case 'paraluego':
        this.undolar = 'undolar';
        this.paraluego = 'none';
        break;

      case 'fin':
        this.paraluego = 'paraluego';
        this.fin = 'none';
        break;
    }
  }

}
