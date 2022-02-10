import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RespCalling } from 'src/app/shared/models/otros.model';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-speech800914',
  templateUrl: './speech800914.component.html',
  styleUrls: ['./speech800914.component.css']
})
export class Speech800914Component implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('escrito3') escrito3: ElementRef;
  selectFilt:string;
  inp: string;
  listClientes: ClientModel[];
  copiaListClientes: ClientModel[];
  newListClientes: ClientModel[];
  E$: Subscription[];

  telx: string;
  data$: RespCalling;
  idR$: number;
  id;
  guardar:boolean = true;

  //tel: string = '12345*****';
  t1: string = ''
  t2: string = ''

  /* ----xw-----*/
  verCli: string;
  toogle800: boolean = false;
  mintoggle: boolean = true;
  ver800: string = 'none';
  /* ----xw-----*/


  metodo: string;
  idClientePost: number;
  /* cambios Wilmar */

  //   c Save data
  nombres: string ;
  apellidos: string;
  dialibre: string;
  status: string = '5';
  telmovil: string;
  teltrabajo: string ;
  telcasa: string ;
  telotro: string ;
  horaduerme: string ;
  horalevanta: string ;
  horariotrabajo: string;


  motivacion: string;
  tipo_trabajo: string;
  ahorro_mensual: number;
  compania_movil: string;
  otro_ingreso: string;
  dia_iglesia: string;
  banco: string;
  carro: number;
  sueldoS_Q: string;
  telwht: string;


  constructor(private httpSer: AuthService,
              private title: Title,
              private CallSer: LlamadasService,
              private functC: FuncionesComunesService)
  {
    title.setTitle('800-914');
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach( e => e.unsubscribe() )
    } catch (error) {}
  }

  ngOnInit(): void {

    const E$1 = this.httpSer.extLlamada$.subscribe(r => {
      this.data$ = r;
      this.telx = r.numero_entrante;
    });
    const E$2 = this.CallSer.llamandoID$.subscribe(r => {
      let emitID = localStorage.getItem('change');
      if (!emitID) {
        this.idR$ = r;
      } else if (emitID && !r){
        this.idR$ = Number(emitID && emitID != '66.99' ? emitID : null);
      }
    });
    this.getAllClient();
    if (this.idClientePost) {
      this.CallSer.llamandoID$.emit(this.idClientePost)
    }
    this.E$ = [E$1, E$2];
  }

  ngAfterViewChecked() {
    if (this.escrito3.nativeElement.scrollTop > 2100) {
      //this.putClient();
      this.guardar = false;
    }
    if (!this.guardar && this.escrito3.nativeElement.scrollTop > 2300 ) {
      if (this.escrito3.nativeElement.scrollTop < 2400) {
        this.putClient();
      }
    }
  }


  abrirLlamadaRadio() {
    this.toogle800 = true;
    this.ver800 = 'content';
    this.putClient();
  }

  getAllClient(){
    this.httpSer.getClientes().subscribe(
      res => {
        this.listClientes = [];
        this.copiaListClientes = [];
        for (const clave in res) {
          const el = res[clave];
          this.listClientes.push(el);
          this.copiaListClientes.push(el);
        }
      }
    )
  }


  filtar(ev) {
    let filt = this.selectFilt;
    this.newListClientes = [];
    let filtro: string = ev['target']['value'];
    //this.toogle = true;

    for (const key in this.copiaListClientes) {
      const el = this.copiaListClientes[key];

      if (filt == 'nombres') {
        if (!el.nombres) {
          el.nombres = '-';
        } else if (el.nombres.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el)
        }

      } else if (filt == 'telefono') {
        if (!el.telmovil) {
          el.telmovil = '*****';

        } else if (el.telmovil.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el);
        }

        if (!el.teltrabajo) {
          el.teltrabajo = '*****';
        } else if (el.teltrabajo.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el);
        }

        if (!el.telcasa) {
          el.telcasa = '*****';
        } else if (el.telcasa.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el);
        }

        if (!el.telotro) {
          el.telotro = '*****';
        } else if (el.telotro.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el);
        }


      } else if (filt == 'apellidos') {
        if (!el.apellidos) {
          el.apellidos = '-'
        } else if (el.apellidos.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el);
        }
      }

    }
    if (this.newListClientes.length > 0) {
      this.listClientes = this.newListClientes;
      this.listClientes = this.functC.eliminarDuplicados(this.listClientes);
    }
  }

  setId(id: string, nombre: string, apellido: string) {
    Swal.fire({
      title: "Cliente Activo",
      text: `Seleccionar a ${nombre} ${apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          this.httpSer.idClienteE$.emit(Number(id))
          this.idClientePost = Number(id);
          this.verCli = `/vercliente/${id}`;
          this.mintoggle = false;
        }
      });
  }


  putClient() {
    this.metodo = 'POST'
    this.telmovil = this.data$.numero_entrante;
    let dataX: Partial<ClientModel>;
    dataX = {
      telmovil: this.telmovil,
      nombres: this.nombres ? this.nombres : '',
      apellidos: this.apellidos ? this.apellidos : '',
      teltrabajo: this.teltrabajo ? this.teltrabajo : '',
      telcasa: this.telcasa ? this.telcasa : '',
      dialibre: this.dialibre,
      status: this.status,
      telotro: this.telotro,
      horaduerme: this.horaduerme,
      horalevanta: this.horalevanta,
      horariotrabajo: this.horariotrabajo,
      /* data no exite en speech pero es requerida en back */
      valor_inscripcion: 0,
      valor_mensualidad: 0,
      plan_mes : 0,
      campos_adicionales: {
        motivacion: this.motivacion ? this.motivacion : '',
        capacidad_ahorro: this.ahorro_mensual ? Number(this.ahorro_mensual) : 0,
        telwht: this.telwht,
        tipo_trabajo: this.tipo_trabajo,
        compania_movil: this.compania_movil,
        otro_ingreso: this.otro_ingreso,
        dia_iglesia: this.dia_iglesia,
        banco: this.banco,
        carro: this.carro,
        sueldoS_Q: this.sueldoS_Q
      }
    }

    if (this.data$ && this.data$.numero_entrante) {

      if (this.idClientePost || this.idR$) {

        this.httpSer.pacthCliente(dataX, String(this.idR$ || this.idClientePost )).subscribe(
          r => {
            Swal.fire({
              title: 'Guardado',
              allowOutsideClick: false,
              icon: 'success',
              text: 'Nuevos Datos Guardados',
              showConfirmButton: false,
              timer: 500
            });
          }
        ), err => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000
          });
        }
      } else if (!this.idClientePost && !this.idR$ && this.metodo == 'POST') {
        this.httpSer.putCliente(dataX).subscribe(
          res => {
            this.metodo = 'PATCH';
            this.idClientePost = res['id'];
            this.verCli = `/vercliente/${this.idClientePost}`;
            Swal.fire({
              title: 'Guardado',
              allowOutsideClick: false,
              icon: 'success',
              text: 'Cliente Guardado Correctamente',
              showConfirmButton: false,
              timer: 500
            });
          }
          ), err => {
            Swal.fire({
              title: 'FALLO!',
              icon: 'error',
              text: 'error :' + err.status,
              timer: 2000
            });
          };
        }

      }

    }

}
