import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Campos_adicionales, ClienteModelGen, ClientModel } from '../../shared/models/usuario.model';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { TarjetasService } from 'src/app/shared/services/tarjetas.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Subscription } from 'rxjs';
import { CampaignSaleService } from 'src/app/shared/services/campaign-sale.service';
import { DataClientcamp, RespCampaña } from 'src/app/shared/models/citas.model';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { environment } from 'src/environments/environment';
import { DataPostCampaV2, DataStatusAgent, ResCampañaV2, RespStatusAgent } from 'src/app/shared/models/otros.model';
import { CampagnasV2Service } from 'src/app/shared/services/campagnas-v2.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styleUrls: ['./ver-cliente.component.css']
})

export class VerClienteComponent implements OnInit, OnDestroy {
  @Input() formuPostClient: Partial<ClientModel>;
  @Input() formuPostClient2: Partial<ClientModel>;
  @Input() opc: boolean = false;
  key_c: string;
  key_L: string;
  url: string;
  tiempoInicio: number;
  is_Vis: boolean = true;
  id_c: any;
  data: RespStatusAgent;
  no_admin: boolean;
  reset: boolean;

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkActivity();
  }
  validBtn: boolean = false;
  activa = environment.campagna;
  cliente:  Partial<ClientModel>;
  opcionVer: number;
  dataCliH: object;
  E$: Subscription[] = [];
  regexTarjeta = /^(\d{4})-(\d{4})-(\d{4})-(\d{4})/;
  regexTarjeta2 = /^(\d{4}) (\d{4}) (\d{4}) (\d{4})/;
  regexTarjeta3 = /^(\d{16})/;

  coll: string;
  campanas: RespCampaña[] = [];
  modocampa: boolean = false;
  modal: boolean = false;
  itemCampa: Partial<ClientModel>;
  nameCamp: string;
  coment: string;
  id_agt: string;

  dataCampV2: string;
  campV2: ResCampañaV2[] = [];

  constructor(private auth: AuthService,
              private funcSer: FuncionesComunesService,
              private ClientSer: ClientesService,
              private campañaV2Ser: CampagnasV2Service,
              private TarjSer: TarjetasService,
              private stalker: RastreadorAgentesService,
              private Campaña: CampaignSaleService,
              private activateRoute: ActivatedRoute)
  {
    this.id_c = auth.idC || this.activateRoute.snapshot.params['id'];
    this.id_agt = localStorage.getItem('id_agente');
    this.key_c = this.stalker.generarKey();
    this.key_L = localStorage.getItem('ee743bdd');
    this.url = this.activateRoute.snapshot.url[0].path;
    this.tiempoInicio = new Date().getTime();
    this.coll = this.activa ? 'Campañas_creditoMejor' : 'none';
    this.no_admin = !this.funcSer.generarPermisosAdmin();
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (err) {}
    this.is_Vis = false;
    //this.actualizarEstadoComponent();
  }

  ngOnInit(): void {
    this.opcionVer = 1;
    //this.generarRegistroStalker();
    this.getCliente();
    //this.getCapmpanas();
    this.getCampaV2();
    const E$1 = this.funcSer.interval(5000).subscribe(() => {
      //this.actualizarEstadoComponent();
    });
    this.E$.push(E$1);
  }
  generarRegistroStalker(){
    if (!this.opc) {
      let data: DataStatusAgent = {
        id_user: this.id_agt,
        key_login: this.key_L,
        key_component: this.key_c,
        visible: '1',
        url_id: this.id_c,
        url_comp: 'Ver Cliente',
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
  }

  actualizarEstadoComponent(){
    if (!this.opc) {
      let id = this.data.id;
      this.data.hora_final = `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}`
      if (this.is_Vis) {
        this.data.visible = '1';
      } else {
        this.data.visible = '0';
      }
      this.stalker.actualizarDataStalker(id, this.data);
    }
  }

  checkActivity(){
    if (document.hidden){
      this.is_Vis = false;
    }else {
      this.is_Vis = true;
    }
    //this.actualizarEstadoComponent();
  }

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
    const E$9 = this.Campaña.getCampaña(this.coll).subscribe((snap) => {
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
    this.E$.push(E$9);
  }

  jsonConcat(form1, form2) {
    for (var key in form2) {
      form1[key] = form2[key];
    }
    return form1;
  }

  getCliente(){
    const E$1 = this.ClientSer.ClientEmit$.subscribe(res => {
      this.cliente = res
      if (!this.cliente.campos_adicionales) {
        setTimeout(() => {
          this.enviarPacth();
        }, 3000);
      }
    });
    this.E$.push(E$1);
  }

  enviarPacth(): void {
    this.no_admin = true;
    let campos: Campos_adicionales;
    let campos2: Campos_adicionales;
    if (this.formuPostClient) {
      // si faltan campos requeridos por la base de c¿datos los crea
      campos = this.funcSer.creadorDeCamposAd(this.formuPostClient)
      this.formuPostClient.campos_adicionales = campos
    }

    if (this.formuPostClient2 && this.formuPostClient2.campos_adicionales) {
      // confirma q vengan las datos de las tajetas desde el componnete info adicional
      // para evitar sobre escribirlos
      if (!this.formuPostClient2.campos_adicionales.id_tarjeta) {
        this.formuPostClient2.campos_adicionales.id_tarjeta = this.cliente.campos_adicionales &&  this.cliente.campos_adicionales.id_tarjeta ? this.cliente.campos_adicionales.id_tarjeta: null;
      }
      if (!this.formuPostClient2.campos_adicionales.cv) {
        this.formuPostClient2.campos_adicionales.cv =  this.cliente.campos_adicionales && this.cliente.campos_adicionales.cv ? this.cliente.campos_adicionales.cv : null;
      }
      if (!this.formuPostClient2.campos_adicionales.exp) {
        this.formuPostClient2.campos_adicionales.exp = this.cliente.campos_adicionales && this.cliente.campos_adicionales.exp ? this.cliente.campos_adicionales.exp : null;
      }
      if (!this.formuPostClient2.campos_adicionales.nombres_tarjeta) {
        this.formuPostClient2.campos_adicionales.nombres_tarjeta = this.cliente.campos_adicionales && this.cliente.campos_adicionales.nombres_tarjeta ? this.cliente.campos_adicionales.nombres_tarjeta: null;
      }
      if (!this.formuPostClient2.campos_adicionales.tipo_tarjeta) {
        this.formuPostClient2.campos_adicionales.tipo_tarjeta = this.cliente.campos_adicionales && this.cliente.campos_adicionales.tipo_tarjeta ? this.cliente.campos_adicionales.tipo_tarjeta: null;
      }
      if (!this.formuPostClient2.campos_adicionales.banco) {
        this.formuPostClient2.campos_adicionales.banco = this.cliente.campos_adicionales && this.cliente.campos_adicionales.banco ? this.cliente.campos_adicionales.banco : null;
      }

      campos2 = this.funcSer.creadorDeCamposAd( this.formuPostClient2 );
      this.formuPostClient2.campos_adicionales = campos2;
    }

    if (this.formuPostClient && this.formuPostClient2) {
      let c = this.funcSer.unirCamposAdicionales(
        this.formuPostClient.campos_adicionales, this.formuPostClient2.campos_adicionales
        );
      this.formuPostClient = this.jsonConcat(this.formuPostClient, this.formuPostClient2);
      this.formuPostClient.campos_adicionales = c;
    }

    if (this.formuPostClient) {
      // evita q se reescriban los numero de teléfono si vienen con asteriscos
      if (this.formuPostClient.telotro    && this.formuPostClient.telotro.includes('*')) delete this.formuPostClient.telotro;
      if (this.formuPostClient.telcasa    && this.formuPostClient.telcasa.includes('*')) delete this.formuPostClient.telcasa;
      if (this.formuPostClient.teltrabajo && this.formuPostClient.teltrabajo.includes('*')) delete this.formuPostClient.teltrabajo;
    }
    if (!this.formuPostClient2){
      this.formuPostClient.tipo_id = this.cliente.tipo_id? this.cliente.tipo_id: 0;//obli
      this.formuPostClient.numero_id = this.cliente.numero_id;
      this.formuPostClient.licencia = this.cliente.licencia;
      this.formuPostClient.robo_identidad = this.cliente.robo_identidad;
      this.formuPostClient.salario = this.cliente.salario? this.cliente.salario: 0;//obli
      this.formuPostClient.empleador = this.cliente.empleador;
      this.formuPostClient.horariotrabajo = this.cliente.horariotrabajo;
      this.formuPostClient.dialibre = this.cliente.dialibre;
      this.formuPostClient.otraactividad = this.cliente.otraactividad;
      this.formuPostClient.horaduerme = this.cliente.horaduerme;
      this.formuPostClient.horalevanta = this.cliente.horalevanta;
      this.formuPostClient.reportex3 = this.cliente.reportex3;
      this.formuPostClient.contrato_enviado = this.cliente.contrato_enviado;
      this.formuPostClient.contrato_firmado = this.cliente.contrato_firmado;

      this.formuPostClient.campos_adicionales.capacidad_ahorro =  this.cliente.campos_adicionales && this.cliente.campos_adicionales.capacidad_ahorro ? this.cliente.campos_adicionales.capacidad_ahorro: 0;
      this.formuPostClient.campos_adicionales.sueldoS_Q =         this.cliente.campos_adicionales && this.cliente.campos_adicionales.sueldoS_Q ? this.cliente.campos_adicionales.sueldoS_Q: '';
      this.formuPostClient.campos_adicionales.dia_llamar =        this.cliente.campos_adicionales && this.cliente.campos_adicionales.dia_llamar? this.cliente.campos_adicionales.dia_llamar: '';
      this.formuPostClient.campos_adicionales.dia_pagoS =         this.cliente.campos_adicionales && this.cliente.campos_adicionales.dia_pagoS ? this.cliente.campos_adicionales.dia_pagoS: '';
      this.formuPostClient.campos_adicionales.dia_pago =          this.cliente.campos_adicionales && this.cliente.campos_adicionales.dia_pago ? this.cliente.campos_adicionales.dia_pago : '';
      this.formuPostClient.campos_adicionales.dia_pago2 =         this.cliente.campos_adicionales && this.cliente.campos_adicionales.dia_pago2 ? this.cliente.campos_adicionales.dia_pago2 : '';
      this.formuPostClient.campos_adicionales.pago_renta        = this.cliente.campos_adicionales && this.cliente.campos_adicionales.pago_renta ? this.cliente.campos_adicionales.pago_renta: 0;
      this.formuPostClient.campos_adicionales.carro             = this.cliente.campos_adicionales && this.cliente.campos_adicionales.carro? this.cliente.campos_adicionales.carro: 0;
      this.formuPostClient.campos_adicionales.casa              = this.cliente.campos_adicionales && this.cliente.campos_adicionales.casa? this.cliente.campos_adicionales.casa: 0;
      this.formuPostClient.campos_adicionales.call_trabajo      = this.cliente.campos_adicionales && this.cliente.campos_adicionales.call_trabajo ? this.cliente.campos_adicionales.call_trabajo: '';
      this.formuPostClient.campos_adicionales.credito_check     = this.cliente.campos_adicionales && this.cliente.campos_adicionales.credito_check? this.cliente.campos_adicionales.credito_check: '';
      this.formuPostClient.campos_adicionales.tipo_ingreso      = this.cliente.campos_adicionales && this.cliente.campos_adicionales.tipo_ingreso ? this.cliente.campos_adicionales.tipo_ingreso: '';
      this.formuPostClient.campos_adicionales.direccion_reciente = this.cliente.campos_adicionales && this.cliente.campos_adicionales.direccion_reciente? this.cliente.campos_adicionales.direccion_reciente: '';
      this.formuPostClient.campos_adicionales.compania_movil    = this.cliente.campos_adicionales && this.cliente.campos_adicionales.compania_movil? this.cliente.campos_adicionales.compania_movil: '';
      this.formuPostClient.campos_adicionales.mejor_hora_llamar = this.cliente.campos_adicionales && this.cliente.campos_adicionales.mejor_hora_llamar? this.cliente.campos_adicionales.mejor_hora_llamar: '';

      this.formuPostClient.campos_adicionales.puntaje_equifax   = this.cliente.campos_adicionales && this.cliente.campos_adicionales.puntaje_equifax? this.cliente.campos_adicionales.puntaje_equifax: '';
      this.formuPostClient.campos_adicionales.puntaje_experian  = this.cliente.campos_adicionales && this.cliente.campos_adicionales.puntaje_experian? this.cliente.campos_adicionales.puntaje_experian: '' ;
      this.formuPostClient.campos_adicionales.puntaje_trans_u   = this.cliente.campos_adicionales && this.cliente.campos_adicionales.puntaje_trans_u? this.cliente.campos_adicionales.puntaje_trans_u: '';
      this.formuPostClient.campos_adicionales.acredores         = this.cliente.campos_adicionales && this.cliente.campos_adicionales.acredores? this.cliente.campos_adicionales.acredores: '';
      this.formuPostClient.campos_adicionales.acredores2        = this.cliente.campos_adicionales && this.cliente.campos_adicionales.acredores2? this.cliente.campos_adicionales.acredores2: '';
      this.formuPostClient.campos_adicionales.creditos          = this.cliente.campos_adicionales && this.cliente.campos_adicionales.creditos? this.cliente.campos_adicionales.creditos: '';
      this.formuPostClient.campos_adicionales.creditos2         = this.cliente.campos_adicionales && this.cliente.campos_adicionales.creditos2? this.cliente.campos_adicionales.creditos2: '';
      this.formuPostClient.campos_adicionales.deudas_pendientes = this.cliente.campos_adicionales && this.cliente.campos_adicionales.deudas_pendientes? this.cliente.campos_adicionales.deudas_pendientes: '';
      this.formuPostClient.campos_adicionales.deudas_pendientes2 = this.cliente.campos_adicionales && this.cliente.campos_adicionales.deudas_pendientes2? this.cliente.campos_adicionales.deudas_pendientes: '';

      this.formuPostClient.campos_adicionales.id_tarjeta        = this.cliente.campos_adicionales && this.cliente.campos_adicionales.id_tarjeta? this.cliente.campos_adicionales.id_tarjeta: '';
      this.formuPostClient.campos_adicionales.cv                = this.cliente.campos_adicionales && this.cliente.campos_adicionales.cv? this.cliente.campos_adicionales.cv: '';
      this.formuPostClient.campos_adicionales.exp               = this.cliente.campos_adicionales && this.cliente.campos_adicionales.exp? this.cliente.campos_adicionales.exp: '';
      this.formuPostClient.campos_adicionales.nombres_tarjeta   = this.cliente.campos_adicionales && this.cliente.campos_adicionales.nombres_tarjeta? this.cliente.campos_adicionales.nombres_tarjeta: '';
      this.formuPostClient.campos_adicionales.tipo_tarjeta      = this.cliente.campos_adicionales && this.cliente.campos_adicionales.tipo_tarjeta? this.cliente.campos_adicionales.tipo_tarjeta: null;
      this.formuPostClient.campos_adicionales.banco             = this.cliente.campos_adicionales && this.cliente.campos_adicionales.banco? this.cliente.campos_adicionales.banco: '';
      this.formuPostClient.campos_adicionales.banco_cheque      = this.cliente.campos_adicionales && this.cliente.campos_adicionales.banco_cheque? this.cliente.campos_adicionales.banco_cheque: '';

      this.formuPostClient.campos_adicionales.referido          = this.cliente.campos_adicionales && this.cliente.campos_adicionales.referido ? this.cliente.campos_adicionales.referido : '';
      this.formuPostClient.campos_adicionales.emisora           = this.cliente.campos_adicionales && this.cliente.campos_adicionales.emisora ? this.cliente.campos_adicionales.emisora : '';
      this.formuPostClient.campos_adicionales.redes             = this.cliente.campos_adicionales && this.cliente.campos_adicionales.redes ? this.cliente.campos_adicionales.redes : '';

    }
    if (this.formuPostClient.campos_adicionales.referido === 'ID undefined - undefined') {
      this.formuPostClient.campos_adicionales.referido = null;
    }

    if (this.formuPostClient.campos_adicionales.id_tarjeta == '' || this.formuPostClient.campos_adicionales.id_tarjeta == null ) {
      const E$22 = this.auth.pacthCliente(this.formuPostClient, this.id_c.toString())
        .subscribe(() => {
          this.seu_Resp_ok();
          E$22.unsubscribe();
        }, () => {
          E$22.unsubscribe();
        });
    } else if (this.formuPostClient.campos_adicionales.id_tarjeta ) {
      if ( this.formuPostClient.campos_adicionales.id_tarjeta.match(this.regexTarjeta) ) {
        const E$22 = this.auth.pacthCliente(this.formuPostClient, this.id_c.toString())
          .subscribe(() => {
            this.seu_Resp_ok();
            E$22.unsubscribe();
          }, () => {
            E$22.unsubscribe();
          })
      } else if ( this.formuPostClient.campos_adicionales.id_tarjeta.match(this.regexTarjeta2) ) {

        this.formuPostClient.campos_adicionales.id_tarjeta = this.TarjSer.editarTarjeta(this.formuPostClient.campos_adicionales.id_tarjeta);
        const E$22 = this.auth.pacthCliente(this.formuPostClient, this.id_c.toString())
          .subscribe(() => {
            this.seu_Resp_ok();
            E$22.unsubscribe();
          }, () => {
            E$22.unsubscribe();
          });
      } else if ( this.formuPostClient.campos_adicionales.id_tarjeta.match(this.regexTarjeta3) &&
                  this.formuPostClient.campos_adicionales.id_tarjeta.length == 16 ) {
        this.formuPostClient.campos_adicionales.id_tarjeta = this.TarjSer.editarTarjeta(this.formuPostClient.campos_adicionales.id_tarjeta);

        const E$22 = this.auth.pacthCliente(this.formuPostClient, this.id_c.toString())
          .subscribe(() => {
            this.seu_Resp_ok();
            E$22.unsubscribe();
          }, () => {
            E$22.unsubscribe();
          });
      }else {
        this.funcSer.showSweetWarning('Error!','Formato de tarjeta de Credito, NO VALIDA!', 2500);
      }
    } else {
      this.funcSer.showSweetWarning('Error!','Formato de tarjeta de Credito, NO VALIDA!!', 2500);
    }
  }

  seu_Resp_ok(){
    this.reset = true;
    this.ClientSer.getCliente(this.id_c);
    localStorage.removeItem('57e17017');
    this.funcSer.showSweetSuccess('Guardado', 'Guardado correcto', 1000);

  }

  enviarCampana(){
    this.itemCampa = this.cliente;
    this.modal = true;
  }

  enviarCampana2(){
    let data: DataClientcamp = {
      id: this.itemCampa.id,
      nombre: this.Campaña.insertNameCli(this.itemCampa),
      estado: this.itemCampa.estado ? this.itemCampa.estado : '',
      status: this.itemCampa.status ? this.itemCampa.status : '',
      telefonos: this.Campaña.insertTel2(this.itemCampa),
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
      this.cerrarModal();
      this.Campaña.actClientCampa(data.id, this.nameCamp, data).then(() => {
        this.funcSer.showSweetSuccess('Ok!', 'Cliente Añadido a campaña', 1500);
        this.getCliente();
      });
    } else {
      this.funcSer.showSweetError('Error', 'Elige una campaña', 3000);
    }
  }

  actualizarCliente(id: string, data: Partial<ClientModel>){
    let el: string;
    if (this.campV2) {
      this.campV2.forEach(e => {
        if (e.id == this.dataCampV2) { el = e.name }
      });
    } else {
      el = this.nameCamp
    }
    let newD: ClienteModelGen = {
      nombres: this.Campaña.insertFirstNameCli(data),
      apellidos: this.Campaña.insertLastNameCli(data),
      id: data.id,
      actualizacion: `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}/${this.id_agt}/campagne`,
      asignado: this.cliente.asignado? String(this.cliente.asignado): '',
      campagna: this.cliente.campagna ? `${this.cliente.campagna} -${el}`: el
    }
    this.ClientSer.pacthCliente2(id, newD ).then(() => {
      this.funcSer.showSweetSuccess('Ok!', 'Cliente Actualizado', 1300);
    });
  }

  public split(act: string): string[]{
    return act.split('/');
  }

  cerrarModal(){
    this.itemCampa = null;
    this.modal = false;
  }
}
