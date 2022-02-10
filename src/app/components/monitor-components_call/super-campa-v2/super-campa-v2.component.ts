import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ESTADOS, STATUS } from 'src/app/shared/constants/clientes';
import { CAMP_RESULT, ResDatapCampCli } from 'src/app/shared/models/citas.model';
import { DataCuadros, DataNotas, DataPachCampaV2, Dids, ResCampañaV2, RespDataCampaV2 } from 'src/app/shared/models/otros.model';
import { RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CampagnasV2Service } from 'src/app/shared/services/campagnas-v2.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-super-campa-v2',
  templateUrl: './super-campa-v2.component.html',
  styleUrls: ['./super-campa-v2.component.css']
})
export class SuperCampaV2Component implements OnInit, OnDestroy {
  name: string;
  list: Dids[];
  did: string;
  camp: ResDatapCampCli[];
  estados = ESTADOS;
  statusC = STATUS;
  resultados = CAMP_RESULT;
  modal: boolean;
  editor: boolean = false;
  itemCamp:ResCampañaV2;
  itemModal: RespDataCampaV2;
  nameCamp = 'Campañas';
  estCamp: boolean = true;
  didCamp: string;

  indexCua: number;
  is_superv: boolean;
  campV2: ResCampañaV2[];
  dataCampV2: RespDataCampaV2[];
  selcampV2: ResCampañaV2;
  dataCuaV2: DataCuadros;
  time:number = 10;

  segundos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  T$: Subscription;
  retry2: boolean;
  agentes: RespUser[];
  is_kim: boolean;

  constructor(private campañaV2Ser: CampagnasV2Service,
              private httpSer: AuthService,
              private AgentSer: AgentesService,
              private funcSer: FuncionesComunesService)
  {
    this.is_superv = this.funcSer.generarPermisosN3();
    this.is_kim = this.funcSer.generarPermisosUnicos('110');
  }
  ngOnDestroy(): void {
    try {
      this.T$.unsubscribe();
    } catch (err) {}
  }

  ngOnInit(): void {
    this.getCampaV2();
    this.getDIDS();
    this.getAllAgentes();
  }

  getAllAgentes(){
    this.AgentSer.callAgentes().then((res) => {
      this.agentes = res;
    })
  }

  getDIDS(): void {
    this.httpSer.getUDids().subscribe(
      (res: Dids) => {
        let lista = []
        for (const key in res) {
          const el = res[key];
          lista.push(el)
        }
        this.list = lista;
      }
    )
  }

  getCampaV2(){
    this.campañaV2Ser.getCampagnas().then(r => {
      this.campV2 = r;
    })
  }

  getDataCampaV2(id_camp: string, item:ResCampañaV2){
    if (this.T$) {
      this.T$.unsubscribe();
    }
    this.campañaV2Ser.getDataCampagnas(id_camp).then(r => {
      this.dataCampV2 = r;
      this.verRetry2(r);
      this.selcampV2 = item;
    });
    this.T$ = this.funcSer.interval(3000).subscribe(() => {
      this.campañaV2Ser.getDataCampagnas(id_camp).then(r => {
        this.dataCampV2 = r;
        this.verRetry2(r);
        this.selcampV2 = item;
      });
    });

  }

  verRetry2(data: RespDataCampaV2[]){
    this.retry2 = false;
    data.forEach(e => {
      if (e.compl == '0' && e.act == '1') {
        this.retry2 = true;
      }
    });
  }

  crearCampana(){
    let n = this.nameDid(this.did);
    if (this.name) {
      if (this.name.length < 50) {
        let data:ResCampañaV2  = {
          name: this.name,
          activo: '1',
          did: this.did,
          name_did: n,
          time: this.time
        }
        this.campañaV2Ser.postCampa(data).then(() => {
          this.getCampaV2();
          this.did = null;
          this.name = null;
        })
      } else {
        this.funcSer.showSweetWarning('Error!', 'Limite 50 caracteres', 1700);
      }
    } else {
      this.funcSer.showSweetWarning('Error!', 'Falta el nombre de Campaña', 1700);
    }
  }

  nameDid(id: string): string{
    let name = 'Name Did'
    for (const d in this.list) {
      const el = this.list[d];
      if (el.did == id ) {
        name = el.estado
      }
    }
    return name;
  }

  activarCampana(item: ResCampañaV2){
    item.activo = item.activo == '0' ? '1': '0';
    this.campañaV2Ser.patchCampa(item.id, item).then(() => {
      this.getCampaV2();
    })
  }

  editarCampa(item: ResCampañaV2){
    this.time = item.time;
    this.itemCamp = item;
    this.editor = true;
    this.name = item.name;
  }

  enviarDataCamp(){
    let n = this.nameDid(this.did);
    let id = this.itemCamp.id;
    if (this.did) {
      let data:ResCampañaV2  = {
        name: this.name,
        activo: '1',
        did: this.did,
        name_did: n,
        time: this.time
      }
      this.campañaV2Ser.patchCampa(id, data).then(() => {
        this.getCampaV2();
        this.cerrarEditor();
        this.time = 10;
      });
    }
  }

  verCuadroV2(item: DataCuadros, ind: number): void{
    this.dataCuaV2 = item;
    this.indexCua = ind + 1;
  }

  cerrarEditor(){
    this.did = null;
    this.name = null;
    this.itemCamp = null;
    this.editor = false;
    this.time = 10;
  }

  verInfo(item:RespDataCampaV2 ){
    this.modal = true;
    this.itemModal = item;
  }

  cerrarModal(){
    this.indexCua = null;
    this.dataCuaV2 = null;
    this.itemModal = null;
    this.modal = false;
  }

  cambiarEstadoCliente(){
    if (this.retry2) {
      this.funcSer.showSweetX('Atención!',
        'La campaña aun esta incompleta y puede afectar las llamadas',
        'Confirmar')
      .then(() => {
        this.seudo_cambiarEstado();
      })
    } else {
      this.seudo_cambiarEstado();
    }
  }

  seudo_cambiarEstado(){
    const id = this.itemModal.id;
    this.itemModal.act_camp = this.itemModal.act_camp == '1' ? '0' : '1';
    let data = this.creadorDataPatch(this.itemModal);
    this.campañaV2Ser.actualizarClientCamp(id, data).then(() => {
      this.getDataCampaV2(this.itemModal.id_campagna, this.selcampV2);
      this.cerrarModal();
    });
  }

  eliminarCamp(item:ResCampañaV2){
    item.del = '1';
    this.funcSer.showSweetX('Alerta', 'Desea Eliminar la Campaña?').then(() => {
      this.campañaV2Ser.patchCampa(item.id, item).then(() => {
        this.funcSer.showSweetSuccess('OK!','Campaña Eliminada', 1800);
        this.getCampaV2();
      });
    });
  }

  creadorDataPatch(item: RespDataCampaV2){
    let nota: DataNotas ={
      resultado: item.resultado,
      did: this.selcampV2.name_did,
      llamada: 'Campaña',
      nota: `${item.nota}`,
      speech: '0',
      reacciones: null
    }
    let data: DataPachCampaV2 = {
      id_cliente: item.id_cliente,
      compl: item.compl,
      status_camp: item.status_camp,
      resultado: item.resultado,
      ultima_llamada: item.ultima_llamada,
      llamando: item.llamando,
      act: item.act,
      act_camp: item.act_camp,
      data_nota: nota,
      cuadros: item.cuadros,
      crear_nota: '0'
    }
    return data;
  }

  formtCuadros(){
    this.funcSer.showSweetX('Alerta!', 'Confirma que se va Borrar los Cuadros de la Campaña', 'Confirm')
    .then(() => {
      for (const k in this.dataCampV2) {
        const el = this.dataCampV2[k];
        let data = this.creadorDataPatch(el);
        data.cuadros = []
        this.campañaV2Ser.actualizarClientCamp(el.id, data)
      }
    })
  }

}
