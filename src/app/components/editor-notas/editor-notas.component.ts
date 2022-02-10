import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CKEditorComponent } from 'ng2-ckeditor';
import { Subscription } from 'rxjs';
import { DataNotas, Dids } from 'src/app/shared/models/otros.model';
import { CitaCampAd, ClientModel, RespCitas, RespCitasM } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { RESULTADO2 } from 'src/app/shared/constants/notas';
import { NotasService } from 'src/app/shared/services/notas.service';

import { SanitizerSafe } from '../../shared/pipe/sanitizer.pipe'
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-editor-speech',
  templateUrl: './editor-notas.component.html',
  styleUrls: ['./editor-notas.component.css']
})
export class EditorSpeechComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(CKEditorComponent) ckeditor: CKEditorComponent;
  @Output() toogleAdd = new EventEmitter<boolean>();
  @Input() citaHome: RespCitas;
  @Input() did:string;
  @Input() dids: Dids[];
  @Input() cliente: string;

  edi = false;

  ckeditorContent: string;
  result_n = RESULTADO2;
  max: boolean = false;
  limit: number;
  agente: string;
  did_select: string;

  /* data */
  resultado: SafeHtml;
  hora: string;

  resultadoLL: string;
  llamada: string;
  id: any;
  E$: Subscription[] = [];
  radio: string;
  didsUsados: string[] = [];

  min:number;
  horax:string;
  fecha:string;
  x: string;
  regex = /4|5|7|8|9|LL8OK/;
  regexF = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])(:)([0-5][0-9])$/;
  verTiempo: boolean;

  constructor(private saniSafe: SanitizerSafe,
              private httpSer: AuthService,
              private funcSer: FuncionesComunesService,
              private ClienteSer: ClientesService,
              private notaSer: NotasService,
              private citaSer: CitasService,
              private activateRoute: ActivatedRoute)
  {
    this.id =  activateRoute.snapshot.params['id'];
    this.fecha = funcSer.getFecha();
    this.x = `${funcSer.getFecha()}`;
  }

  ngOnDestroy(): void {
    try {
      this.E$.forEach(e => e.unsubscribe())
    } catch (err) {}
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c.did.currentValue) {
      this.did = c.did.currentValue
    }
  }

  ngOnInit(): void {
    this.buscarDidsUsados();
    this.resultado = this.ckeditorContent?this.saniSafe.transform(this.ckeditorContent):'';
    this.hora = `${new Date()}`;
    this.agente = localStorage.getItem('nombre');
    if (!this.dids) {
      this.getDids();
    }
    const E$1 = this.funcSer.interval(5000).subscribe(() => {
      this.hora = `${new Date()}`;
    });
    this.E$.push(E$1);
  }

  ngAfterViewChecked(){
    let editor = this.ckeditor.instance;
    editor.config.removeButtons = 'Save';
    this.resultado = this.ckeditorContent?this.saniSafe.transform(this.ckeditorContent):'';
    let limit = String(this.resultado);
    this.limit = limit.length;
    if (limit.length >= 2000) {
      this.max = true;
    } else {
      this.max = false;
    }
  }
/*********************↓↓↓↓ METODOS USUARIO ↓↓↓↓*********************/

  buscarDidsUsados(){
    if (this.citaHome && this.citaHome.campos_adicionales.length > 0 ) {
      try {
        this.citaHome.campos_adicionales.forEach( c => {
          this.didsUsados.push( c.did );
        })
      } catch (error) {
        this.funcSer.logWarn('error en buscar dids',error);
      }

    } else {
      this.didsUsados = [];
    }
  }

  getDids(){
    const E$d = this.httpSer.getUDids().subscribe(
      (res: Dids[]) => {
        let lista: Dids[] = []
        for (const key in res) {
          const el = res[key];
          lista.push(el)
        }
        this.dids = lista;
      }
    )
    this.E$.push(E$d);
  }

  cerrar(){
    this.toogleAdd.emit(false);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////* FUNCION PRINCIPAL *////////////////////////////////

  sendNotas(){
    let data: DataNotas = {
      resultado: this.resultadoLL,
      did: this.did? this.did: this.did_select,
      llamada: this.llamada,
      speech: '0',
      nota: String(this.resultado),
      reacciones: {
        id_cita: this.citaHome ? this.citaHome.id: '',
        fecha_cita: this.citaHome ? this.citaHome.fechahora: ''
      }
    }
    // ↓↓↓↓ CONDICION SI HAY UNA CITA VINCULADA ↓↓↓↓
    if ( this.citaHome ) {

      switch (this.resultadoLL) {
        // SI LA CITA ES REASIGNADA YA SEA A HORA FIJA O A MINUTOS
        case 'D':
          this.asignarManualHora(data);
          break;
        case 'WWW':
          this.asignarManualHora(data);
          break;
        case 'G':
          this.asignarManualHora(data);
          break;
        // ↓↓↓↓ SI EL RESULTADO CAE EN LOS PROSPECTOS ↓↓↓↓
        case 'PP':
          this.concluirProspectos(data);
          break;
        case 'PN':
          this.concluirProspectos(data);
          break;
        case 'LL8':
          this.concluirProspectos(data);
          break;
        // ↓↓↓↓ SI EL RESULTADO ES SATISFACTORIO ↓↓↓↓
        case '4':
          this.resultadoSatisfactorio(data);
          break;
        case '5':
          this.resultadoSatisfactorio(data);
          break;
        case '8':
          this.resultadoSatisfactorio(data);
          break;
        case '9' :
          this.resultadoSatisfactorio(data);
          break;
        case 'LL8OK' :
          this.resultadoSatisfactorio(data);
          break;
        default:
          // ↓↓↓↓ SE AUTO REASIGNA BASANDOSE EN LA CANTIDAD DE LLAMADAS ↓↓↓↓
            if (data.did && data.llamada && data.nota && data.resultado)
            {
              this.autoModCita(data);
            }
            else { this.funcSer.showSweetError('Error','Faltan Campos!', 1500); }
          break;
      }
    } else { // ↓↓↓↓ NO HAY UNA CITA VINCULADA ↓↓↓↓
      if (data.did && data.llamada && data.nota && data.resultado)
        { this.enviarNota(data); }
      else { this.funcSer.showSweetError('Error','Faltan Campos!', 1500); }

    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////// SEUDO METODOS P /////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  /** define la conclusion de los prospectos */
  concluirProspectos(data: DataNotas){
    let n: string
    if  (this.resultadoLL == 'PP') { n = 'Prospecto Positivo'  }
    else if  (this.resultadoLL == 'PN') { n = 'Prospecto Negativo'  }
    else if  (this.resultadoLL == 'LL8') { n = 'LLamada  800 sin Datos'  };
    if (data.did && data.llamada && data.nota && data.resultado) {
      if (this.resultadoLL == 'LL8') {
        this.funcSer.showSweetX('Atención','Desea volver a reasignarle esta cita al Cliente?','OK!')
        .then(() => {
          this.verTiempo = true;
          this.asignarManualHora(data);
        }).catch(() => {
          let dataCita: Partial<RespCitasM> = {
            fechahora: `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() )}`,
            estado: '8',
            notas: `Cita Concluida! - ${n}`,
            campos_adicionales: this.citaHome.campos_adicionales
          }
          this.patchCamposAD( dataCita ).then(r => {
            dataCita = r;
            let id = this.citaHome.id;// id de la cita!
            this.citaSer.editarCita(id, dataCita)
            .then(() => {
              this.enviarNota( data );
              this.actualizarCliente();
            });
          });
        })
      }
    } else { this.funcSer.showSweetError('Error','Faltan Campos!', 1500); }
  }

  /** concluye la cita con un resultado satisfactorio */
  resultadoSatisfactorio(data: DataNotas){
    if ( data.resultado.match(this.regex) ) {

      if (data.did && data.llamada && data.nota && data.resultado) {
        let dataCita: Partial<RespCitasM> = {
          fechahora: `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() )}`,
          estado: '12',
          notas: 'Cita Concluida Satisfactoriamente!',
          campos_adicionales: this.citaHome.campos_adicionales
        }
        this.patchCamposAD( dataCita ).then(r => {
          dataCita = r;
          let id = this.citaHome.id;// id de la cita!
          this.citaSer.editarCita(id, dataCita)
          .then(() => {
            this.enviarNota( data );
          });
        });
      } else { this.funcSer.showSweetError('Error','Faltan Campos!', 1500); }
    }
  }


  /** envila nota y desbloquea el guardian */
  enviarNota(data: DataNotas){
    if ( data.resultado == '8'|| data.resultado == '9' || data.resultado == 'LL8OK' ) {
      // OBLIGA AL AGENTE A ACTUALIZAR LOS DATOS DEL CLIENTE
      localStorage.setItem('57e17017', `a6f${this.id}a54afc5c73cea15987b1cb5`);
    } else if (  data.resultado == '5' ) {
      // OBLIGA AL AGENTE A ACTUALIZAR LOS PAGOS DEL CLIENTE
      localStorage.setItem('b292e6b3', `cf0${this.id}9d7d007c28098876412a1286ad8dc`);
    }
    this.actualizarCliente();
    this.notaSer.sendNotas2(this.id, data).then((r) => {
      // si la nota se envia desbloquea el guardian
      // menos si hay q actualizar el cliente o los pagos
      localStorage.removeItem('013800ce');
      localStorage.removeItem('change');
      localStorage.removeItem('2104a1bd');
      this.cerrar();
    });
  }

  /**Pospone manualmente la cita y envia la data */
  async modCita(data:DataNotas){
    let dataCita: Partial<RespCitasM> = {
      fechahora: this.creadorFechaNueva(),
      estado: '2',
      notas: 'Cita Postpuesta!',
      campos_adicionales: this.citaHome.campos_adicionales
    }
    dataCita = await this.patchCamposAD( dataCita );
    let id = this.citaHome.id;
    if (dataCita.fechahora.match(this.regexF)){
      this.citaSer.editarCita(id, dataCita)
      .then(() => {
        this.enviarNota( data );
      });
    } else {
      this.funcSer.showSweetWarning('Error!', 'Hora no valida', 2000);
    }
  }

  /**Pospone automaticamente la cita, 7 veces como máximo */
  async autoModCita(data: DataNotas){
    let newEstado: string;
    switch (this.resultadoLL) {
      case 'B':
        newEstado = '4';
        break;
      case 'NC':
        newEstado = '3';
        break;
      case 'G':
        newEstado = '5';
        break;
      case 'WWW':
        newEstado = '2';
        break;
      case 'LLC':
        newEstado = '9';
        break;
      case 'D':
        newEstado = '7';
        break;
    }
    let dataCita: Partial<RespCitasM> = {
      fechahora: newEstado == '7' ? this.creadorFechaNueva() : this.editarTiempo( this.citaHome.campos_adicionales),
      estado: newEstado,
      notas: newEstado == '7' ? 'Si no LLama, LLAMARLO!' : 'Cita Auto Postpuesta!',
      campos_adicionales: this.citaHome.campos_adicionales
    }
    let id = this.citaHome.id;
    dataCita = await this.patchCamposAD( dataCita );
    if (dataCita.campos_adicionales.length < 8 ) {
      if (dataCita.fechahora.match(this.regexF)){
        this.citaSer.editarCita(id, dataCita)
        .then(() => {
          this.enviarNota( data );
        });
      } else {
        this.funcSer.showSweetWarning('Error!', 'Hora no valida', 2000);
      }
    } else {
      this.enviarNota(data);
      let txt = 'No se Auto-Reasignará la Cita!';
      let t = 'Ya se han completado 7 LLamadas.';
      this.funcSer.showToast(txt,t,6000,1);
    }
  }

  /** Maneja los campos adicionales de las citas, add nuevos campos y creando el historial */
  async patchCamposAD(data: Partial<RespCitasM> ){
    let h: CitaCampAd = {
      did: this.did? this.did: this.did_select,
      asigado: this.citaHome.id_asignado,
      resultado: this.resultadoLL,
      hora_asig: this.citaHome.fechahora,
      nota: this.editarNota(this.resultado)
    }
    try {
      data.campos_adicionales.push(h);
      return data;
    } catch (err) {
      let getItemx = localStorage.getItem('013800ce');
      const text = 'No se ha podido crear los cuadros de la cita. Vuelve al Home y activa la cita, con un click';
      this.funcSer.logWarn('Error en PatchCita', err);
      this.funcSer.showToast(text, 'ERROR', 5000, 0);
      localStorage.removeItem('013800ce');
      this.funcSer.postReintegroDeNota(getItemx);
      return data;
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// ↓↓↓↓ VALIDATORES FECHA ↓↓↓↓ ////////////////////////////////

  asignarManualHora(data: DataNotas){
    // SE ASIGNA USANDO LA HORA COMPUESTA EN LOS INPUT DATE Y TIME
    if (this.radio == 'hora') {
      this.crearHora(data);
    // SE ASIGNA LA HORA SUMANDO AL TIEMPO ACTUAL LOS MINUTOS Q PONGAN
    } else if (this.radio == 'min') {
      this.crearHoraMinu(data);
    }
  }

  /** valida la hora basandose en los INPUT DATE y TIME
   * q sean una hora superior en al menos 6 min
   */
  crearHora(data: DataNotas){
    let dateM =  new Date();
    dateM.setMinutes(dateM.getMinutes() + 5 );
    let dateMIn = this.funcSer.getAhora( dateM );
    if ( this.fecha >= this.funcSer.getFecha() && this.horax >= dateMIn.slice(0, 5) ) {

      if (data.did && data.resultado  ) { this.modCita(data); }
      else { this.funcSer.showSweetError('Error','Faltan Campos!', 1500); };

    }else { this.funcSer.showSweetError('Error','Las Fechas no son Aceptables! al menos 6 Minutos', 1500); }
  }

  /** valida la hora basandose en los minutos */
  crearHoraMinu(data: DataNotas){
    if ( this.min > 5 ) {
      if (data.did && data.llamada ) { this.modCita(data); }
      else { this.funcSer.showSweetError('Error','Faltan Campos!', 1500); }

    } else {
      this.funcSer.showSweetError('Error','Las Fechas no son Aceptables! al menos 6 Minutos', 1500);
    }
  }

  ////////////////////////////// ↑↑↑↑ VALIDATORES FECHA ↑↑↑↑ ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// ↓↓↓↓ CREADORES DE FECHA ↓↓↓↓ ///////////////////////////////

  /** Crea el tiempo automatico de la cita mirando el historial de las citas */
  editarTiempo(campos:CitaCampAd[] ):string{
    let hora = `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() )}`;
    let i = campos ? campos.length: 0;
    let t : number;
    if (i == 0) { t = 11; }
    else if (i == 1) { t = 21; }
    else if (i == 2) { t = 36; }
    else { t = 66; };
    return this.funcSer.addMinToDate(hora, t);
  }

  /** Crea una nueva fecha para la cita usando los datros de creo el agente */
  creadorFechaNueva(): string{
    let fecha = `${this.funcSer.getFecha()} ${this.funcSer.getAhora( new Date() )}`;
    if (this.min > 5) {
      return this.funcSer.addMinToDate( fecha, this.min );
    }else {
      return `${this.fecha} ${this.horax}:00`;
    }
  }

  ////////////////////////////// ↑↑↑↑ CREADORES DE FECHA ↑↑↑↑ ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// ↓↓↓↓ MODIFICADO DE CLI ↓↓↓↓ ////////////////////////////////

  /**
   * Cambia el status del cliente actualizandolo
   */
   actualizarCliente(){
    switch (this.resultadoLL) {
      case '4':
        this.isCliente('1', 'contr');
        break;
      case '5':
        this.isCliente('1', 'cobro');
        break;
      case 'PP':
        this.isProspectoPo_Neg();
        break;
      case '8':
        this.isCliente('9', 'venta');
        break;
      case '9':
        this.isCliente('1', 'sac');
        break;
      case 'PN':
        this.isProspectoPo_Neg();
        break;
      case 'LL8':
        this.isProspectoPo_Neg();
        break;
      case 'LL8OK':
        this.isProspectoPo_Neg();
        break;
    }
  }

  /** Actualiza el status a uno de los tipos de prospectos */
  isProspectoPo_Neg(){
    if (this.resultadoLL == 'PP' || this.resultadoLL == 'PN'|| this.resultadoLL == 'LL8'|| this.resultadoLL == 'LL8OK') {
      let agent = localStorage.getItem('id_agente');
      const Act = `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}/${agent}/status`;
      let data: Partial<ClientModel> = {
        status : this.resultadoLL == 'PN' ? '8' : '7' ,
        actualizacion: Act
      }
      this.ClienteSer.pacthCliente(this.id, data);
    }
  }

  /** Confirma como cliente y actualiza */
  isCliente(status: string, dat:string){
    let agent = localStorage.getItem('id_agente');
    const Act = `${this.funcSer.getFecha()} ${this.funcSer.getAhora(new Date())}/${agent}/${dat}`;
    let data: Partial<ClientModel> = {
      status : status ,
      actualizacion: Act
    }
    this.ClienteSer.pacthCliente(this.id, data);
  }
  ////////////////////////////// ↑↑↑↑ MODIFICADO DE CLI ↑↑↑↑ ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  /**Limpia y retorna la nota de tipo innerHTML a texto plano */
  editarNota(val: any): string{
    let edi = String(val);
    edi = edi.replace('SafeValue must use [property]=binding:', '');
    edi = edi.replace('(see https://g.co/ng/security#xss)', '');
    edi = edi.replace('http://', '');
    edi = edi.replace(/<style([\s\S]*?)<\/style>/gi, ' ')
    .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
    .replace(/(<(?:.|\n)*?>)/gm, ' ')
    .replace(/\s+/gm, ' ');
    return edi
  }


}


