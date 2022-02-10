import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteModelGen } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientesService, RespTelCli } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { STATUS } from 'src/app/shared/constants/clientes';
import { DataClientcamp, RespCampaña } from 'src/app/shared/models/citas.model';
import { CampaignSaleService } from 'src/app/shared/services/campaign-sale.service';
import { Subscription } from 'rxjs';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { environment } from 'src/environments/environment';
import { DataPostCampaV2, DataStatusAgent, ResCampañaV2, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { CampagnasV2Service } from 'src/app/shared/services/campagnas-v2.service';

@Component({
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.css']
})
export class ConsultarClienteComponent implements OnInit, OnDestroy {
  @ViewChild('content_t') content: ElementRef;
  @Input() ocultarNav: boolean;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  E$: Subscription[] = [];
  is_Vis: boolean = true;
  data: RespStatusAgent;
  campV2: ResCampañaV2[] = [];
  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  activa = environment.campagna;
  TipoPeticion: number;
  opcion: number; //cambio de formularios
  statusC = STATUS;
  myId: string;
  page: number = 0;

  total: number;
  id_admin: boolean;

  listClientes: ClienteModelGen[];
  listClientesAlf: ClienteModelGen[];
  copiaListClientes: ClienteModelGen[];
  misClientes: ClienteModelGen[] = [];
  copiaMisClientes: ClienteModelGen[] = [];
  newListClientes: ClienteModelGen[] = [];

  selectFilt: string = '';
  spinner: boolean;
  toogle: boolean = false;
  modal: boolean = false;
  inp: string;
  tel: string;
  respID: RespTelCli[];
  none: boolean = true;

  coll: string;
  campanas: RespCampaña[];
  modocampa: boolean = false;
  itemCampa: ClienteModelGen;
  nameCamp: string;
  dataCampV2: string;
  coment: string;

  ///checkBox
  cli_act: boolean = false;
  inact: boolean = false;
  rojo: boolean = false;
  virgen: boolean = false;
  prosp: boolean = false;
  prosp_h: boolean = false;
  prosp_n: boolean = false;
  venta: boolean = false;
  perdida: boolean = false;
  termino: boolean = false;
  id_agt: string;
  n:number = 0;
  ord: string = '';
  is_admin: boolean;

  constructor(private httpServ: AuthService,
              private router: Router,
              private Campaña: CampaignSaleService,
              private campañaV2Ser: CampagnasV2Service,
              private ClientSer: ClientesService,
              private stalker: RastreadorAgentesService,
              private functC: FuncionesComunesService) {
    this.ocultarNav = false;
    this.TipoPeticion = httpServ.TipoPet;
    this.id_admin = this.functC.generarPermisos();
    this.id_agt = localStorage.getItem('id_agente');
    this.is_admin = this.functC.generarPermisosAdmin();
    ///////////////////////////////////////////////////
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.router.routerState.snapshot.url.split('/')[1];
    this.tiempoInicio = new Date().getTime();
    this.coll = this.activa ? 'Campañas_creditoMejor' : 'none';
    this.myId = localStorage.getItem('id_agente');
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {}
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    this.opcion = 0;
    this.httpServ.TipoPet = 0;
    this.spinner = true;
    this.getCampaV2();
    // this.generarRegistroStalker();
    this.getAll();
    // this.getCapmpanas();
    const E$1 = this.functC.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    })
    this.E$.push(E$1);
  }

  generarRegistroStalker(){
    let data: DataStatusAgent = {
      id_user: this.myId,
      key_login: this.key_L,
      key_component: this.key_c,
      visible: '1',
      url_id: '',
      url_comp: 'Consultar Clientes',
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

  getCampaV2(){
    let data = [];
    this.campañaV2Ser.getCampagnas().then(r => {
      r.forEach(c => {
        if (c.activo == '1') { data.push(c) }
      })
      this.campV2 = data;
    })
  }

  getCapmpanas(){
    if (this.activa) {
      const E$4 = this.Campaña.getCampaña(this.coll).subscribe((snap) => {
        this.campanas = [];
        snap.forEach((stat:any) => {
            this.campanas.push({
              index: stat.payload.doc.data().indice ,
              id : stat.payload.doc.id,
              data : stat.payload.doc.data()
            });
            if (stat.payload.doc.data().activo == true) {
              this.modocampa = true;
            }
        })
      });
      this.E$.push(E$4);
    }
  }

  getAll(bll: boolean = true) { // trae los cliente filtrando por el agente
    if(bll) { this.page = 0; }
    this.misClientes = [];
    this.copiaMisClientes = [];
    this.listClientes = [];
    const E$2 = this.httpServ.getClientes().subscribe(
      (res: ClienteModelGen[]) => {
        let data = [];
        let dataCopia = [];
        for (const clave in res) {
          const el = res[clave];
          if ( !el.nombres ) {
            el.nombres = 'llamada';
            el.apellidos = 'perdida';
          }
          data.push(el);
          dataCopia.push(el);
          if (el.asignado == this.myId) {
            this.misClientes.push(el);
            this.copiaMisClientes.push(el);
          }
        }
        this.copiaListClientes = dataCopia;
        this.functC.ordenarNombreClientes(data);
        this.toogle = false;
        this.spinner = false;
        this.listClientes = data;
        this.listClientesAlf = data;
        this.total = this.listClientes.length;
        if(bll) { this.resetChecks(); }
        else {
          this.reactivarFiltros();
        }
      }
    );

    if(bll) {
      this.selectFilt = '';
      this.inp = '';
    }

    this.E$.push(E$2)

  }

  resetChecks(){
    this.none = true;
    this.cli_act = false;
    this.inact  = false;
    this.rojo  = false;
    this.virgen  = false;
    this.prosp  = false;
    this.prosp_h  = false;
    this.prosp_n  = false;
    this.venta  = false;
    this.perdida  = false;
    this.termino = false;
  }

  setId(id: string): any { //recibe el id del row en el html para para hacer la navegacio al url /vercliente
    this.opcion = 1;
    this.httpServ.idC = id;
    this.router.navigateByUrl((`vercliente/${id}`));
  }

  getCliTel(){
    this.ClientSer.getIdCliente(this.tel).then(r => {
      this.respID = r;
    });
  }

  getAllPersonal(){
    this.listClientes = [];
    this.listClientes = this.removeDuplicates(this.misClientes, 'id');
    this.toogle = true;
  }

  filtar(ev) { // filtro de clientes por nombre, apellido y numero
    let filt = this.selectFilt;

    this.newListClientes = []
    let filtro: string = ev['target']['value'];
    this.toogle = true;

    for (const key in this.copiaListClientes) {
      const el = this.copiaListClientes[key];

      if (filt == 'nombres') {
        if (!el.nombres) {
          el.nombres = '-'
        } else if (el.nombres.toLowerCase().includes(filtro.toLowerCase())) {
          this.newListClientes.push(el)
        }

      } else if (filt == 'id') {
        if (el.id.toLowerCase().includes(filtro.toLowerCase())) {
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
          this.newListClientes.push(el)
        }
      }

    }
    if (this.newListClientes.length > 0) {
      this.listClientes = this.newListClientes;
      this.listClientes = this.functC.eliminarDuplicados(this.listClientes);
    }
    if (!filtro) { this.toogle = false }

  }

  filtrar2(n: number, r: boolean = true){
    this.toogle = true;
    this.spinner = true;
    if (r) { this.page = 0;}
    switch (n) {
      case 1:
        this.cli_act = !this.cli_act;
        if (this.cli_act) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '1' || el.status == 'Client' ) { this.newListClientes.push(el); }
          });
        } else {
          this.newListClientes = this.newListClientes.filter(el => el.status != '1' );
          this.newListClientes = this.newListClientes.filter(el => el.status != 'Client' );
        }
        break
      case 2:
        this.inact = !this.inact;
        if (this.inact) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '2' || el.status == 'Inactive' ) { this.newListClientes.push(el); }
          });
        } else {
          this.newListClientes = this.newListClientes.filter(el => el.status != '2' );
          this.newListClientes = this.newListClientes.filter(el => el.status != 'Inactive' );
        }
        break
      case 3:
        this.rojo = !this.rojo;
        if (this.rojo) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '3' ) { this.newListClientes.push(el); }
          });
        } else { this.newListClientes = this.newListClientes.filter(el => el.status != '3' ); }
        break
      case 4:
        this.virgen = !this.virgen;
        if (this.virgen) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '4' ) { this.newListClientes.push(el); }
          });
        } else { this.newListClientes = this.newListClientes.filter(el => el.status != '4' ); }
        break;
      case 5:
        this.prosp = !this.prosp;
        if (this.prosp) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '6' ) { this.newListClientes.push(el); }
          });
        } else { this.newListClientes = this.newListClientes.filter(el => el.status != '6' ); }
        break;
      case 6:
        this.prosp_h = !this.prosp_h;
        if (this.prosp_h) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '7') { this.newListClientes.push(el); }
          });
        } else { this.newListClientes = this.newListClientes.filter(el => el.status != '7' ); }
        break;
      case 7:
        this.prosp_n = !this.prosp_n;
        if (this.prosp_n) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '8' ) { this.newListClientes.push(el); }
          });
        } else { this.newListClientes = this.newListClientes.filter(el => el.status != '8' ); }
        break;
      case 8:
        this.venta = !this.venta;
        if (this.venta) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '9') { this.newListClientes.push(el); }
          });
        } else { this.newListClientes = this.newListClientes.filter(el => el.status != '9' ); }
        break;
      case 9:
        this.perdida = !this.perdida;
        if (this.perdida) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '10' || el.status == 'Perdida' ) { this.newListClientes.push(el); }
          });
        } else {
          this.newListClientes = this.newListClientes.filter(el => el.status != '10' );
          this.newListClientes = this.newListClientes.filter(el => el.status != 'Perdida' );
        }
        break;
      case 10:
        this.termino = !this.termino;
        if (this.termino) {
          this.copiaListClientes.forEach(el => {
            if (el.status == '11' || el.status == 'undefined' ) { this.newListClientes.push(el); }
          });
        } else {
          this.newListClientes = this.newListClientes.filter(el => el.status != '11' );
          this.newListClientes = this.newListClientes.filter(el => el.status != 'undefined' );
        }
        break;
    }

    this.listClientes = this.removeDuplicates(this.newListClientes, 'id');
    this.total = this.listClientes.length;
    if (this.total == 0) {
      this.toogle = false;
      this.listClientes = this.copiaListClientes;
      this.total = this.listClientes.length;
    }
    this.spinner = false;
  }

  private removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject  = {};
    let i:any;

    for(i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  nextP(){
    this.page += 100;
    this.scrollToBottom();
  }

  prevP(){
    if (this.page > 0) this.page -= 100;
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  enviarCampana(item: ClienteModelGen ){
    this.itemCampa = item;
    this.modal = true;
  }

  enviarCampana2(){
    if (this.activa) {
      let data: DataClientcamp = {
        id: this.itemCampa.id,
        nombre: this.Campaña.insertNameCli(this.itemCampa),
        estado: this.itemCampa.estado ? this.itemCampa.estado : '',
        status: this.itemCampa.status ? this.itemCampa.status : '',
        telefonos: this.Campaña.insertTel(this.itemCampa),
        status_camp: '',
        resultado: '',
        agente: '',
        user: this.Campaña.insertUser(),
        ultima_llamada: 0,
        disponible: true,
        nota: '',
        act_camp: true,
        compl: true
      }
      if (this.nameCamp) {
        this.actualizarCliente(data.id, this.itemCampa);
        this.Campaña.actClientCampa(data.id , this.nameCamp, data).then(() => {
          this.functC.showToast('Se ha enviado a Campaña', 'OK', 1500);
          setTimeout(() => {
            this.getAll2();
          }, 1000);
        });
      } else {
        this.functC.showSweetError('Error', 'Elige una campaña', 3000);
      }
    }
  }

  actualizarCliente(id: string, data: ClienteModelGen){
    let el: string;
    if (this.campV2) {
      this.campV2.forEach(e => {
        if (e.id == this.dataCampV2) { el = e.name }
      });
    } else {
      el = this.nameCamp
    }
    let newD: ClienteModelGen = {
      nombres: data.nombres ? data.nombres : 'llamada',
      apellidos: this.Campaña.insertLastNameCli(data),
      asignado: data.asignado ? data.asignado : '',
      id: data.id,
      actualizacion: `${this.functC.getFecha()} ${this.functC.getAhora( new Date() )}/${this.id_agt}`,
      campagna: data.campagna? `${data.campagna} -${el}`: el
    }
    this.ClientSer.pacthCliente2(id, newD ).then(() => {
      this.functC.showSweetSuccess('Ok!', 'Cliente Enviado y Actualizado', 1300);
      this.cerrarModal();
      this.getAll2();
    });
  }

  getAll2(){
    const E$2 = this.httpServ.getClientes().subscribe(
      (res: ClienteModelGen[]) => {
        let data = [];
        let dataCopia = [];
        for (const clave in res) {
          const el = res[clave];
          if ( !el.nombres ) {
            el.nombres = 'llamada';
            el.apellidos = 'perdida';
          }
          data.push(el);
          dataCopia.push(el);
          if (el.asignado == this.myId) {
            this.misClientes.push(el);
            this.copiaMisClientes.push(el);
          }
        }
        this.copiaListClientes = dataCopia;
        this.functC.ordenarNombreClientes(data);
        this.toogle = false;
        this.spinner = false;
        this.listClientes = data;
        this.listClientesAlf = data;
        this.total = this.listClientes.length;
        this.reactivarFiltros();
      })
    this.E$.push(E$2);
  }

  resetCampa(id: string, data: ClienteModelGen){
    if (this.activa) {
      let newD: ClienteModelGen = {
        nombres: data.nombres ? data.nombres : 'llamada',
        apellidos: this.Campaña.insertLastNameCli(data),
        asignado: data.asignado ? data.asignado : '',
        id: data.id,
        actualizacion: `${this.functC.getFecha()} ${this.functC.getAhora( new Date() )}/${this.id_agt}/`,
        campagna: ''
      }
      this.ClientSer.pacthCliente2(id, newD ).then(() => {
        this.functC.showSweetSuccess('Ok!', 'Cliente Actualizado', 1300);
        this.cerrarModal();
        this.getAll2();
      });
    }
  }

  cerrarModal(){
    this.itemCampa = null;
    this.modal = false;
  }

  public split(act: string): string[]{
    return act.split('/');
  }

  private reactivarFiltros(){
    let x = [1,2,3,4,5,6,7,8,9,10];
    this.cli_act = !this.cli_act;
    this.inact  = !this.inact;
    this.rojo  = !this.rojo;
    this.virgen  = !this.virgen;
    this.prosp  = !this.prosp;
    this.prosp_h  = !this.prosp_h;
    this.prosp_n  = !this.prosp_n;
    this.venta  = !this.venta;
    this.perdida  = !this.perdida;
    this.termino = !this.termino;
    x.forEach(e => this.filtrar2(e, false));
  }
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  enviarCampanaV2(){
    let data: DataPostCampaV2 = {
      id_cliente: this.itemCampa.id,
      id_campagna: this.dataCampV2,
      id_user: this.id_agt,
      cuadros: [],
      act_camp: '1',
      id_nota: '2'
    }
    this.campañaV2Ser.enviarClientCamp(data).then(() => {
      this.actualizarCliente(data.id_cliente, this.itemCampa);
      this.cerrarModal();
    })
  }


}
