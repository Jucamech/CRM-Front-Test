import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ESTADOS, STATUS } from 'src/app/shared/constants/clientes';
import { CAMP_RESULT, DataClientcamp, DataLLamadaCli, ResDatapCampCli, RespCampaña } from 'src/app/shared/models/citas.model';
import { DataCuadros, DataNotas, DataPachCampaV2, LLamadaAgente, ResCampañaV2, RespDataCampaV2 } from 'src/app/shared/models/otros.model';
import { RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { CampagnasV2Service } from 'src/app/shared/services/campagnas-v2.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import { environment } from 'src/environments/environment';
import { Call } from '../llamadas-modal/llamadas-modal.component';

@Component({
  selector: 'app-venta-campana-agente',
  templateUrl: './venta-campana-agente.component.html',
  styleUrls: ['./venta-campana-agente.component.css']
})
export class VentaCampanaAgenteComponent implements OnInit, OnDestroy {
  @Output('llamandoEmit') llamando = new EventEmitter<boolean>();
  @Output('llamando') llamandoData = new EventEmitter<LLamadaAgente>();
  datCampV2: RespDataCampaV2[];
  itemModal: DataClientcamp;
  itemModalV2: RespDataCampaV2;
  tempoFin: number;
  fCall: boolean;
  CallOK: boolean;
  txt: string;
  ind_N: number = 0;
  didName: string;
  retry: boolean[] = [];
  dataCua: DataLLamadaCli;
  indexCua: number;

  @Input() ind : number;
  @Input() selcampV2: ResCampañaV2 ;
  id: string;
  retry2: boolean;
  dataCuaV2: DataCuadros;
  agentes: RespUser[];
  cont: number;
  E$C: Subscription;
  @Input() set dataCampV2 ( data2: RespDataCampaV2[] ){
    // en este Setter q es el q recibe los datos de la campaña desde el padre
    // se analiza la data para determinar si la campaña fue completada o no
    this.ind = null;
    this.datCampV2 = data2;
    this.verRetry2(data2);
  }
  @Input() set campa (campan: RespCampaña[]){
    // esto era de la campaña Version1
    this.campanas = campan;
    this.campanas.forEach((c, i) => {
      //this.getDataCam(c.data.name, i);
    })
  }
  nameCampCall: string;
  campanas: RespCampaña[] = [];
  dataCampanasW: ResDatapCampCli[][] = [];
  modal: boolean = false;
  modalV2: boolean = false;
  colgar: boolean = false;
  activa = environment.campagna;

  estados = ESTADOS;
  statusC = STATUS;
  resultados = CAMP_RESULT;
  hoy: string;
  inCall: DataClientcamp;
  inCall2: RespDataCampaV2;
  resultado: string;
  nota: string = '';
  t: number;

  E$: Subscription[] = [];

  constructor(private CallSer: LlamadasService,
              private campSerV2: CampagnasV2Service,
              private AgentSer: AgentesService,
              private funcSer: FuncionesComunesService)
  {
    this.hoy = this.funcSer.getFecha();
    this.id = localStorage.getItem('id_agente');
  }
  ngOnDestroy(): void {
    try {
      this.E$C.unsubscribe();
    } catch (err) {}
  }

  ngOnInit(): void {
    this.getAllAgentes();
  }

  //////////////////////////////////////////////////////////////////
  //////////////////////↓↓↓ Funct Camp V2 ↓↓↓//////////////////////

  /**
   * Habilita el boton de retornar LLAMADA
   * Esta funcion mira los datos dentro de las llamadas
   * y determina desde donde continuar las llamadas de la campaña
   */
  verRetry2(data: RespDataCampaV2[]){
    this.retry2 = false;
    if (data) {
      // si detecta un elemento q venga con el completado en "0", activa el boton
      data.forEach(e => {
        if (e.compl == '0') {
          this.retry2 = true;
        }
      });
    }
  }

  // lo uso para los pipe q buscan el agente por medio del ID
  private getAllAgentes(){
    this.AgentSer.callAgentes().then((res) => {
      this.agentes = res;
    })
  }

  /**
   * Este manda la info del registro para ser ointada en una modal/popup
   */
  verItemV2(item:RespDataCampaV2){
    this.modalV2 = true;
    this.itemModalV2 = item;
  }

  /**
   * Trae la data de la campaña
   */
  async getDataCampaV2(id_camp: string){
    // aunq el padre manda los datos de la campaña,
    // mientras se esta activa la campaña no permite entrada de datos de parte del padre
    // por lo q tambn se necesita pata actualizar los datos de la campaña de manera interna
    return new Promise(resolve => {
      let data = [];
      this.campSerV2.getDataCampagnas(id_camp).then(r => {
        r.forEach(c => {
          // solo acepta los registros q sean activos en campaña "act_camp = 1"
          if (c.act_camp == '1' ) {
            data.push(c);
          }
        })
        this.datCampV2 = data;
        resolve('ok');
      });
    })
  }

  /**
   * Funcion Inicial y Principal de la llamada de las campañas
   * @param ret es el parametro q determina se continua la llamada o la inicia desde cero
   */
  async llamarCampaV2(ret: boolean = false){
    // Esta dispara las campañas
    this.txt = 'LLamando ...';
    // se emite al padre q se esta llamando para el registro del stalker
    this.llamando.emit(true);
    this.CallOK = false;
    // setea en el inicio de la tabla el nombre de la campaña
    this.nameCampCall = this.selcampV2.name;
    // se crea los datos de la llamada para el EndPoint de /call
    // pero se va mandar primero por el Service => llamadas.service.ts
    let Data:Call = {
      tipo_tel: 'telmovil',
      id_cliente: '',
      did: this.selcampV2.did
    }
    // la uso para determinar el indice de las llamadas
    // si es de retornar modifico esto para q sin importar
    // cual sea el verdadero indice mo lo tome como el primero
    let j = 0;

    if (!ret) {
      // Esto solo es para cuando es llamar toda la campaña
      // Aqui Setea los datos de la campaña antes de llamarla
      for (let w = 0; w < this.datCampV2.length; w++){
        const el = this.datCampV2[w];
        el.compl = '0'; // esto pone a todos lo registro como q la campaña np esta completada, en caso de ser cortada sin terminarla
        el.llamando = '0'; // resetea para q no vaya a quedar una llamada en verde
        let dataD = this.creadorDataPatch(el);
        await this.campSerV2.actualizarClientCamp(el.id, dataD);
      }
    }
    // antes de llamar la campaña primero actualiza los datos de la campaña
    await this.getDataCampaV2(this.selcampV2.id);
    // NO cambiar este tipo de for y menos por un forEach
    for (let w = 0; w < this.datCampV2.length; w++){
      // este for permite los Await

      const el = this.datCampV2[w];
      Data.id_cliente = el.id_cliente;

      this.funcSer.log('retornando llamada', ret); // esto es solo un log
      if (ret){
        // aqui es si esta retomando la llamda de campaña incompleta
        // si el elemento aparece como imcompleto => compl == '0' || compl == null
        // lo manda a llamar
        if (el.compl == '0' || el.compl == null ) {
          Data.id_cliente = el.id_cliente;
          this.funcSer.log('llamando', el )
          await this.llamadaV2( Data, el, j , el.nombres);
          j++;
        }
      } else {
        // aqui llamada a toda la campaña
        Data.id_cliente = el.id_cliente;
        await this.llamadaV2( Data, el, j, el.nombres );
        j++;
      }
    }
    this.funcSer.log('data all2', this.datCampV2); // esto es solo un log
    // aqui ya se manda a terminar la campaña
    this.CallOK = true;
    this.funcSer.showSweetLoad();
    this.terminarCampañaV2(this.selcampV2.id);
  }

  /**
   * Setea los cuadros de informacion para q sea visible en el html
   */
  verCuadroV2(item: DataCuadros, ind: number): void{
    this.dataCuaV2 = item;
    this.indexCua = ind + 1;
  }
  /**
   * Cuando termina el ciclo for de la llamadas
   * resetea los datos los datos variantes de las data de campaña
   */
  async terminarCampañaV2(id_camp: string){
    // elimina el "change" en el localStorage para q la app reconozca q no hay llamadas
    localStorage.removeItem('change');
    // le doy un pequeño tiempo para q yo vaya a haber cruce de peticiones
    // con los demás cambios de datos
    // no es necesario, solo es por si acaso.
    setTimeout(() => {
      this.datCampV2.forEach( el => {
        el.compl = '1'; // eso le da por completado la campaña a todas las llamadas
        el.nota = ''; // como no necesito crear no la mando vacio
        el.llamando = '0'// para por si una llamada quedó en verde, con esto se resetea

        // si ya hay 7 cuadros lo debe sacar de la campaña
        if (el.cuadros.length > 6) {
          el.status_camp = 'Campaña completa';// le da el status de campaña completada
          el.act_camp = '0'; // saca el registro de la campaña en la parte de agente
        }
        let dataD = this.creadorDataPatch(el);
        //ya aqui simplemente manda a actualizar los datos
        this.campSerV2.actualizarClientCamp(el.id, dataD);
        this.getDataCampaV2(id_camp);
      });
    }, 2000);
    this.funcSer.showSweetSuccess('Ok!', 'La campaña se ha completado', 3300);
    setTimeout(() => {
      this.nameCampCall = null;
      // desactiva el boton de retornar campaña
      this.retry2 = false;
    }, 1000);
    // le emite al padre q ya no hay llamdas en curso
    this.llamando.emit(false);
  }

  /**
   * Funcion contabiliza el tiempo entre el inicio de la llamada,
   *  y la resolucion de la misma
   */
  contadorTiempo(){
    // se usa para cuando una llamda sea rechada poder determinar por el tiempo,
    // si la llamada fue rechazada por el agente o un error de conexion
    this.cont = 0;
    this.E$C = this.funcSer.interval(1).subscribe(() => {
      this.cont += 1;
    });
  }
  /**
   * Administra los cuadros de la llamadas
   * @param id recibe el id del registro a parchar
   * @param item es la data q se manda a editar
   */
  actualizadorCuadrosV2(id: string,item: RespDataCampaV2 ){
    // este es el id del agente q hace la llamada
    let agt = this.id;
    // genera una data de cuadros actualozada con lo q esta pasando
    let data : DataCuadros = {
      inicio: `${item.ultima_llamada}`,
      fin: `${this.hoy} ${this.funcSer.getAhora( new Date() )}`,
      resultado: item.resultado,
      nota: item.nota.slice(0, 200),
      agente: agt,
    }
    // si ya existe un cuadro , hace un push al array de cuadros
    if (item.cuadros && item.cuadros.length > 0) {
      item.cuadros.push(data);
      let dataD = this.creadorDataPatch(item);
      //ya aqui simplemente manda a actualizar los datos
      this.campSerV2.actualizarClientCamp(id, dataD).then(() => {
        this.getDataCampaV2(item.id_campagna);
      });
    } else {
      ///si no existe al menos un cuadro crea el primero
      item.cuadros = [data];
      let dataD = this.creadorDataPatch(item);
      //ya aqui simplemente manda a actualizar los datos
      this.campSerV2.actualizarClientCamp(id, dataD).then(() => {
        this.getDataCampaV2(item.id_campagna);
      });
    }
  }

  llamadaV2 = async (data: Call, DC: RespDataCampaV2, i: number, name: string) =>
  new Promise ((resolve, reject) => {
    try {

      if (this.E$C) { this.E$C.unsubscribe(); }// si hay un contador activo lo destruye
      // el boton de colgar la llamada se activa cuando act= '1';
      // pero solo se debe activar cuando enviar el ststus y la nora de la llamada
      DC.act = '0'; // esto es para evitar q se active el boton de colgar
      DC.resultado = ''; // tambn reseteo el resultado de la llamada
      DC.compl = '1'; // una vez la llamada esta aqui se considera q obviamente la llamada a este cliente fue realizada
      DC.nota = ''; // reseteo el campos de nota
      this.emitirDataLLamada(DC); // le emito los datos de la llamada al padre para q lo registre el stalker
      this.contadorTiempo(); // activo el contador de tiempo de la llamada en curso
      setTimeout(() => {
        // seteo al html la llamda en curso para habilitar el guardar nota y el colgar llamada
        this.inCall2 = DC ;
        // aqui genero la llamada
        this.CallSer.llamadasCampaña(data)
        .then(() => {
          // el colgar es para detectar cuando el agente desea colgar la llamada y continuar con la siguiente
          this.colgar = false;
          this.CallOK = true;
          this.txt = `LLamando ...`;

          DC.ultima_llamada = `${this.hoy} ${this.funcSer.getAhora( new Date() )}`; // actualizo la hora de la llamada
          DC.status_camp = 'Llamada Conectada'; // registro q la llamda fue realizada con exito
          DC.id_agente = this.id; // guardo en el registro el id del agente de esta llamada
          DC.llamando = '1'; // digo q ya fue realizada esta llamada para q no metida en el retornar Campaña
          DC.act = '0'; // con esto pinto en rojo el mini poppup de la llamada actual
          this.inCall2 = DC; // mando al mini popup la info de esta llamada
          let name = this.inCall2.nombres; // creo una copia del combre del cliente
          this.funcSer.log('Nombre cli',name); // solo es un log
          let data = this.creadorDataPatch(DC); // mando a crear la data para ser actualizada
          this.funcSer.log('data act llamada 1', data);// solo es un log
          this.campSerV2.actualizarClientCamp(DC.id, data).then(() => {
            this.getDataCampaV2(DC.id_campagna);
          });
          // cada segundo miro si el colgar esta desactivado
          const E$1 = this.funcSer.interval(1000).subscribe(() => {
            this.inCall2.nombres = name;
            if (this.colgar) {
              // si detecta el colgar en true, cuelgo la llamada.
              // y continua el reesto de llamadas
              this.inCall2 = null;
              this.txt = 'Próxima llamada en ...';
              DC.llamando = '0';
              DC.compl = '1'; // redudancia para decir q esta llamada si quede completada en campaña
              // actualizo el registro de la llamada con los nuevos datos
              this.actualizadorCuadrosV2(DC.id, DC );
              this.CallOK = false;
              // activo el contador para la siguiente llamada
              this.activarContador();
              resolve('0k');
              E$1.unsubscribe();
            }
          });
        }).catch(() => {
          // este error puede ser por la conexion falló o por el agente rechazo la llamada
          DC.act = '1';
          DC.nota = '';
          DC.ultima_llamada = `${this.hoy} ${this.funcSer.getAhora( new Date() )}`;
          DC.status_camp = 'Llamada Fallida'; // esto q simplemento la llamada no se concreto
          DC.id_agente = this.id; // guardo el id del agente en el registro
          DC.resultado = 'LLR'; // esto significa llamada rechazada
          DC.nota = `Tiempo ms : ${this.cont}`; // esta es la nota por defecto con el tiempo de cunato tiempo estuvo a la espera la resolucion de la llamada
          this.inCall2 = null; // elimino los datos q en la llamada se pintaban en el mini poppup
          this.funcSer.showToast('Llamada Fallida', 'Alerta!', 1300, 3); // muestro un pequeño error
          let data = this.creadorDataPatch(DC); // se manda a crear la data pertinente ccon esta llamada
          data.crear_nota = '1'; // mando a crear la nota en el backend
          this.campSerV2.actualizarClientCamp(DC.id, data).then(() => {
            this.getDataCampaV2(DC.id_campagna);
          });
          // le doy continuacion a la campaña
          this.txt = 'Próxima llamada en ...';
          this.activarContador();
          resolve('0k');
        })
        .finally(() => {
          this.fCall = false;
        });
      // esto es el tiempo entrre llamadas si es la primera llamada no debe disparar el contador
      },i == 0 ? 1 : this.selcampV2.time * 1000 );
    } catch (err) {
      reject(err);
    }
  });

  /**
   * Metodo encargado de crear la data q se manda al backend
   */
  creadorDataPatch(item: RespDataCampaV2){
    // aqui la data de las notas no es relevante
    // solo la data de data_campagna
    let nota: DataNotas ={
      resultado: item.resultado,
      did: this.selcampV2.name_did,
      llamada: 'Campaña',
      nota: `${item.nota}`,
      speech: '0',
      reacciones: null
    }
    this.funcSer.log('data nota', nota);
    let data: DataPachCampaV2 = {
      id_cliente: item.id_cliente,
      compl: item.compl,
      status_camp: item.status_camp,
      resultado: item.resultado,
      ultima_llamada: item.ultima_llamada,
      llamando: item.llamando,
      act: '1',
      act_camp: item.act_camp,
      data_nota: nota,
      cuadros: item.cuadros,
      crear_nota: '0' // se ignora por defecto, para tener el control de cuando se manda a crear la nota
    }
    return data;
  }

  //////////////////////↑↑↑ Funct Capmp V2 ↑↑↑//////////////////////

/////////////////////////////// mixtas ///////////////////////////////////

  cerrarModal(){
    this.itemModal = null;
    this.itemModalV2 = null;
    this.modal = false;
    this.modalV2 = false;
    this.dataCuaV2 = null;
    this.dataCua = null;
    this.indexCua = null;
  }

  cerrarPOP(i: number){
    delete this.inCall[i];
  }

  /**
   * Activa el contador que hay entre las llamadas.
   *  El contador toma el tiempo de las campañas mismas
   */
  activarContador(){
    if (this.selcampV2 && this.selcampV2.time ) {
      this.t = this.selcampV2.time ? this.selcampV2.time: 10;
    } else {
      // si por alguna razon hay tiempo crea un valos de 10 segundos
      this.t = 10;
    }
    const E$1 = this.funcSer.interval(1000).subscribe(() => {
      if (this.t > 0) {
        this.t = this.t - 1;
      } else {
        this.txt = 'Llamando...';
        E$1.unsubscribe();
      }
    })
  }

  /**
   * En la llamada solo se crea la nota una vez,
   * y es aqui la nota se manda junto con el campo
   * " crear_nota: '1' ", con ese valor en uno
   * la base de datos ya sabe q debe activar el guardo de notas.
   */
  guardarMensaje(item: RespDataCampaV2): void{
    // se elimina el localStorage para evitar q los speechs
    // reconozcan q hay una llamada en curso
    localStorage.removeItem('change');
    // son datos q cambio para el html, agilizando los cambios de estado del mismo
    this.inCall2.act = '1';
    this.inCall2.llamando = '1';
    // data de la nota
    let nota: DataNotas ={
      resultado: item.resultado,
      did: this.selcampV2.name_did,
      llamada: 'Campaña',
      nota: `${item.nota}`,
      speech: '0',
      reacciones: null
    }
    // data de data_campagna, para el PATCH
    let data: DataPachCampaV2 = {
      id_cliente: item.id_cliente,
      compl: item.compl,
      status_camp: item.status_camp,
      resultado: item.resultado,
      ultima_llamada: item.ultima_llamada,
      llamando: '0',
      act: '1',
      act_camp: item.act_camp,
      data_nota: nota,
      cuadros: item.cuadros,
      crear_nota: '1' // este es la valor para activar el guardado de notas
    }
    // se manda toda la data a actulizar y crear la nota
    this.campSerV2.actualizarClientCamp(item.id, data).then(() => {
      this.getDataCampaV2(item.id_campagna);
    });

  }
  /**
   * Esta funcion emite al padre los datos de la llamada
   * para q sean registrados en el stalker
   */
  emitirDataLLamada(item: RespDataCampaV2){
    let data:LLamadaAgente  = {
      tipo: 'Campagna',
      t_inicio: item.ultima_llamada,
      t_fin: `${this.hoy} ${this.funcSer.getAhora( new Date() )}`,
      id_cliente: item.id_cliente
    }
    this.llamandoData.emit(data);
  }

}
