import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CANTI_N, DIAL_ALEY, DIAL_LAMEGA, DIAL_LATINA, DIAL_RPODER, EMISORAS, REDES } from 'src/app/shared/constants/emisoras';
import { DataStatusAgent, Dids, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credito-speech-ininicio',
  templateUrl: './credito-speech-ininicio.component.html',
  styleUrls: ['./credito-speech-ininicio.component.css'],
})
export class CreditoSpeechIninicioComponent implements OnInit, OnDestroy {
  id: string;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: string;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  id_cli: number;
  dataCliente: ClientModel;
  data: RespStatusAgent;
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  idClienteAct: string;
  agente:string;
  /* llamada radio */
  llamada: string = '';

  dids:Dids[];
  cliente: string;
  tipo: string;
  emisoras = EMISORAS;
  redes = REDES;
  l_m = DIAL_LAMEGA;
  ltn = DIAL_LATINA;
  pod = DIAL_RPODER;
  aly = DIAL_ALEY;
  ca_n = CANTI_N;

  // data ///
  emisora: string;
  dial: string;
  red: string;

  verCli: string;
  hayDid:boolean = false;
  verModal: boolean = false;
  llamando: boolean = false;
  llamando$: boolean = false;
  /* llamada radio */

  listClientes: ClientModel[];
  copiaListClientes: ClientModel[];
  newListClientes: ClientModel[];
  visulizador: string;

  toggle800: boolean = false;
  // cuadro
  togglecuadro: boolean = false;
  titleCuadro: string = 'Ver\n cuadro'

  toggleRecover: boolean = false;

  selectFilt: string;
  inp: string;
  toogle: boolean;
  cliAct: boolean;

  constructor(private route: ActivatedRoute,
              private functC: FuncionesComunesService,
              private CallSer: LlamadasService,
              private CliSer: ClientesService,
              private stalker: RastreadorAgentesService,
              private httpSer: AuthService)
  {
    this.toogle = false;
    this.cliAct = false;
    this.visulizador = this.route.snapshot.params['id'];
    this.agente = localStorage.getItem('nombre');
    //////////////////////////////
    this.id = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.route.snapshot.url[0].path;
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(s => s.unsubscribe());
    } catch (error) {}
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    this.getDids();
    //this.generarRegistroStalker();
    this.agente = localStorage.getItem('nombre');
    //this.getStatus();
    const E$2 = this.functC.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    })
    this.E$.push(E$2);
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.id,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: this.visulizador,
      url_comp: 'Speechs',
      llamando: {
        tipo: '',
        t_inicio: '',
        t_fin: '',
        id_cliente: ''
      }
    }
    this.stalker.crearRegistro(data).then(res => {
      this.data = res;
    });
  }

  actualizarEstadoComponent(){
    let id = this.data.id;
    this.data.hora_final = `${this.functC.getFecha()} ${this.functC.getAhora(new Date())}`
    if (this.is_Vis) {
      this.data.visible = '1';
    } else {
      this.data.visible = '0';
    }
    this.data = this.generarDataLLamada(this.data);
    this.stalker.actualizarDataStalker(id, this.data);
  }


  checkActivity(){
    if (document.hidden){
      this.is_Vis = false;
    }else {
      this.is_Vis = true;
    }
    //this.actualizarEstadoComponent();
  }

  generarDataLLamada(data:RespStatusAgent):RespStatusAgent {
    let id_call = localStorage.getItem('change');
    if (id_call) {
      if (!this.tiempoInicio) {
        this.tiempoInicio = this.functC.getAhora( new Date() );
      }
      if (this.CallSer.id_saliente) {
        data.llamando.tipo = 'Saliente';
      } else if (this.CallSer.idEntrante){
        data.llamando.tipo = 'Entrante';
      }
      data.llamando.id_cliente = id_call;
      data.llamando.t_inicio = this.tiempoInicio;
      data.llamando.t_fin = this.functC.getAhora( new Date() );
    }
    return data;
  }

  getCliente(id:string){
    this.CliSer.getCliente(id).then((res) => {
      this.dataCliente = res;
      this.dataCliente.campos_adicionales = this.functC.creadorDeCamposAd(this.dataCliente);
      this.functC.log('data Cli', this.dataCliente);
      this.enviarData(this.dataCliente);
    })
  }

  enviarData(cli: ClientModel){
    if (this.emisora) {
      cli.campos_adicionales.emisora = `${this.emisora}-${this.dial}`;
    }
    if (this.red) {
      cli.campos_adicionales.redes = `${this.red}`;
    }
    this.CliSer.pacthCliente(cli.id, cli );
  }

  agregarEmisora(){
    let id = localStorage.getItem('change');
    if (id) {
      this.getCliente(id);
    } else {
      this.functC.showToast('No Hay Llamada en curso', 'Error', 1700, 0);
    }
  }

  getDids() {
    const E$1 = this.httpSer.getUDids().subscribe(
      (res: Dids) => {
        let lista = []
        for (const key in res) {
          const el = res[key];
          lista.push(el)
        }
        this.dids = lista;
      }
    )
    this.E$.push(E$1);
  }

  getAll() { // trae los cliente filtrando por el agente
    const E$2 = this.httpSer.getClientes().subscribe(
      res => {
        this.listClientes = [];
        this.copiaListClientes = [];
        for (const clave in res) {
          const el = res[clave];
          this.listClientes.push(el);
          this.copiaListClientes.push(el);
        }
      }
    );
    this.selectFilt = '';
    this.inp = '';
    this.E$.push(E$2);
  }

  filtar(ev) {
    let filt = this.selectFilt;
    this.newListClientes = [];
    let filtro: string = ev['target']['value'];
    this.toogle = true;

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

  togglerCuadro(){
    this.togglecuadro = !this.togglecuadro;
    if(this.togglecuadro) {
      this.titleCuadro = 'Ocultar\n cuadro';
    } else {
      this.titleCuadro = 'Ver\n cuadro';
    }
  }

  setId(id: string, nombre: string, apellido: string) {
    this.idClienteAct = id;
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

          this.toggleRecover = true;
        }
      });
    //this.toggleRecover = true;
  }


  cambiarP(str: string) {
    switch (str) {
      case 'toggleRecoverNuevo':
        this.toggleRecover = true;
        break;

      case 'toggleRecoverActivo':
        this.cliAct = true;
        this.getAll();
        break;

      case 'toggle800':
        this.toggle800 = true;
        break;
    }
  }

  emitirLlamada(){
    this.httpSer.llamadaSaliente$.emit(true);
    this.httpSer.idClienteE$.emit(Number(this.id));
  }

}
