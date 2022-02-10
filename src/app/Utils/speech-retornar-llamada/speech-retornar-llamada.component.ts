import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Dids, RespCalling } from 'src/app/shared/models/otros.model';
import { Campos_adicionales, ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech-retornar-llamada',
  templateUrl: './speech-retornar-llamada.component.html',
  styleUrls: ['./speech-retornar-llamada.component.css']
})
export class SpeechRetornarLlamadaComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  @Input() idClienteAct: string;
  dids:Dids[];
  cliente: string;
  id: string;
  data$: RespCalling;
  metodo: string;

  verCli: string;
  hayDid:boolean = false;
  otro: string;
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
  verModal: boolean = false;

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
  cuenta_pendientes: string;


  agente: string;
  E$: Subscription[];
  idR$: number;
  cliente$: Partial<ClientModel>;
  speech800: boolean = false;

  constructor(private httpSer: AuthService,
              private title: Title,
              private funcSer: FuncionesComunesService,
              private CallSer: LlamadasService) {
    this.title.setTitle('RETORNAR LLAMADA');
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
    this.getDids()
    this.agente = localStorage.getItem('nombre');
    this.E$ = [E$1]
  }

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  getCliente(){
    if (!this.cliente$ && this.idR$) {
      this.httpSer.getCliente(String(this.idR$)).subscribe(
        (r: Partial<ClientModel> )=> {
        this.cliente$ = r;
        this.nombres = r.nombres;
        this.apellidos = r.apellidos;
        this.nacimiento = r.nacimiento;
        this.numero_id = r.numero_id;
        this.direccion = r.direccion;
        this.telcasa = r.telcasa;
        this.email = r.email;
        this.email2 = r.email2;

        if(r.campos_adicionales){
          this.direccion_facturas = r.campos_adicionales.direccion_facturas || null;
          this.direccion_tarjeta = r.campos_adicionales.direccion_tarjeta || null;
          this.id_tarjeta = r.campos_adicionales.id_tarjeta || null;
          this.banco = r.campos_adicionales.banco;
          this.cv = r.campos_adicionales.cv || '';
          this.direccion_reciente = r.campos_adicionales.direccion_reciente || '';
          this.exp = r.campos_adicionales.exp || '';
          this.nombres_tarjeta = r.campos_adicionales.nombres_tarjeta || '';
          this.tipo_tarjeta = r.campos_adicionales.tipo_tarjeta || null;
          this.deudas_pendientes = r.campos_adicionales.deudas_pendientes2 || '';
          this.creditos = r.campos_adicionales.creditos || '';
        }
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
      deudas_pendientes: `${this.buro} $${this.cuenta_pendientes}`,
      creditos: this.creditos
    },

    dataX = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      //telmovil: this.cliente$.telmovil? this.cliente$.telmovil: null,
      nacimiento: this.nacimiento ? this.nacimiento : '2000-01-01',
      numero_id: this.numero_id ? this.numero_id : '',
      direccion: this.direccion ? this.direccion : '',
      telcasa: this.telcasa ? this.telcasa : '',
      email: this.email ? this.email : '',
      email2: this.email2 ? this.email2 : '',
      campos_adicionales: campos_adicionalesD
    };
    dataX.campos_adicionales = this.funcSer.creadorDeCamposAd(dataX);
    if (this.idR$) {
      this.httpSer.pacthCliente(dataX, String(this.idR$)).subscribe(
        r => {
          Swal.fire({
            title: 'Datos Guardados',
            allowOutsideClick: false,
            icon: 'success',
            text: '',
            showConfirmButton: false,
            timer: 1000
          });
        }, err => {
          Swal.fire({
            title: 'Fallo!',
            icon: 'error',
            text: 'Ir a Borrador',
            timer: 4000
          });
        }
      )
    }

  }

  llamar(item){
    this.id = item['id_cliente'];
    this.cliente = item['cliente'];
    this.verModal = true;
  }

  llamar2(did:string){

    let data = {
      tipo_tel: 'telmovil',
      id_cliente: this.id,
      did: did,
    }
    if (did) {
      this.hayDid = true;
      this.httpSer.getCall(data).subscribe(
        res => {
          if (res[0] == 'Response: Error') {
            Swal.fire({
              title: 'FALLO!',
              icon: 'error',
              text: 'Revisa el Telefono',
              timer: 2000,
            });
            this.verModal = false;
            this.cliente = '';
          } else{
            this.verModal = false;
          }
        }
      ),(err) => {
        Swal.fire({
          title: 'FALLO!',
          icon: 'error',
          text: 'error :' + err.status,
          timer: 2000,
        });
      };
    }
  }

  getDids() {
    this.httpSer.getUDids().subscribe(
      (res: Dids) => {
        let lista = []
        for (const key in res) {
          const el = res[key];
          lista.push(el)
        }
        this.dids = lista;
      }
    )
  }

  cambiarP(str: string) {
    switch (str) {

      case 'comoEstamos':
        this.comoEstamos = 'comoEstamos';
        this.intro = 'none';
        this.scrollToBottom();
        break;

      case 'quehayN':
        this.comoEstamos = 'none';
        this.quehayN = 'quehayN';
        this.scrollToBottom();
        break;

      case 'cuenteme':
        this.quehayN = 'none';
        this.cuenteme = 'cuenteme';
        this.scrollToBottom();
        break;

      ///////////////////////
      case 'cuenteme2':
        this.speech800 = true;
        this.scrollToBottom();
        break;
      ///////////////////////

      case 'udemanda':
        this.cuenteme = 'none';
        this.udemanda = 'udemanda';
        this.scrollToBottom();
        break;

      case 'tienecu':
        this.cuenteme = 'none';
        this.tienecu = 'tienecu';
        this.scrollToBottom();
        break;

      case 'next':
        this.tienecu = 'none';
        this.next = 'next';
        this.scrollToBottom();
        break;

      case 'undolar':
        this.next = 'none';
        this.undolar = 'undolar';
        this.scrollToBottom();
        break;

      case 'paraluego':
        this.undolar = 'none';
        this.paraluego = 'paraluego';
        this.scrollToBottom();
        break;

      case 'fin':
        this.paraluego = 'none';
        this.fin = 'fin';
        this.scrollToBottom();
        this.putCliente();
        break;

    }
  }

  regresarP(str: string) {
    switch (str) {

      case 'comoEstamos':
        this.intro = 'intro';
        this.comoEstamos = 'none';
        break;

      case 'quehayN':
        this.comoEstamos = 'comoEstamos';
        this.quehayN = 'none';
        break;

      case 'cuenteme':
        this.quehayN = 'quehayN';
        this.cuenteme = 'none';
        break;

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
