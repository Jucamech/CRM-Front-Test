import { Component, OnInit } from '@angular/core';
import { ESTADOS, STATUS } from 'src/app/shared/constants/clientes';
import { CAMP_RESULT, DataClientcamp, DataLLamadaCli, ModoCampaña, ResDatapCampCli, RespCampaña } from 'src/app/shared/models/citas.model';
import { Dids } from 'src/app/shared/models/otros.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CampaignSaleService } from 'src/app/shared/services/campaign-sale.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-campana',
  templateUrl: './super-campana.component.html',
  styleUrls: ['./super-campana.component.css']
})
export class SuperCampanaComponent implements OnInit {
  name: string;
  coll = 'Campañas_creditoMejor'
  campanas: RespCampaña[];
  list: Dids[];
  did: string;
  didname: string;
  camp: ResDatapCampCli[];
  estados = ESTADOS;
  statusC = STATUS;
  resultados = CAMP_RESULT;
  modal: boolean;
  itemModal: DataClientcamp;
  nameCamp = 'Campañas';
  estCamp: boolean = true;
  didCamp: string;

  dataCua: DataLLamadaCli;
  indexCua: number;
  is_superv: boolean;
  activa = environment.campagna;


  constructor(private campañaSer: CampaignSaleService,
              private httpSer: AuthService,
              private funcSer: FuncionesComunesService)
  {
    this.is_superv = funcSer.generarPermisosN3();
  }

  ngOnInit(): void {
    this.getCapmpanas();
    this.getDIDS();
  }

  getCapmpanas(): void{
    if (this.activa) {
      this.campañaSer.getCampaña(this.coll).subscribe((snap) => {
        this.campanas = [];
        snap.forEach((stat:any) => {
          this.campanas.push({
            index: stat.payload.doc.data().indice ,
            id : stat.payload.doc.id,
            data : stat.payload.doc.data()
          });
        })
      });
    }
  }

  activarCampana(item: RespCampaña): void{
    this.estCamp = !this.estCamp;
    item.data.activo = !item.data.activo;
    this.campañaSer.editCampaña(item.id, this.coll, item.data)
  }

  crearCampana(): void{
    if (this.activa) {
      let x = this.list.find(d => d.did == this.did );
      let data: ModoCampaña = {
        activo: true,
        estado: 'Inicial',
        name: this.name,
        did: this.did,
        nameDid: x.estado
      }
      if (this.name && this.did ) {
        this.campañaSer.sendCampaña(data, this.coll ).then(() => {
          this.funcSer.showToast(`Se creado Nueva Campaña`, 'OK!', 1500)
        });
        this.name = null;
        this.did = null;
      } else {
        this.funcSer.showSweetWarning('Error!', 'Falta el nombre de la Campaña',  2500);
      }
    } else {
      this.funcSer.showSweetWarning('Error!', 'No se permite en este entorno',  2500);
    }
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

  cerrarModal(): void{
    this.itemModal = null;
    this.modal = false;
    this.dataCua = null;
    this.indexCua = null;
  }

  verCuadro(item: DataLLamadaCli, ind: number): void{
    this.dataCua = item;
    this.indexCua = ind + 1;
  }

  getCampana(item: RespCampaña): void{
    if (this.activa) {
      this.nameCamp = item.data.name;
      this.estCamp = item.data.activo;
      this.didCamp = item.data.nameDid;
      this.campañaSer.getCampañaVenta(item.data.name).subscribe(( snap ) => {
        let data:ResDatapCampCli[] = [];
        snap.forEach((stat:any) => {
          data.push({
            id : stat.payload.doc.id,
            data : stat.payload.doc.data()
          });
        })
        this.camp = data;
      });
    }
  }

  verItem(item:DataClientcamp): void{
    this.modal = true;
    this.itemModal = item;
  }

  cambiarEstadoCliente(): void{
    let data = this.itemModal;
    data.act_camp = !data.act_camp;
    if (!data.coll) {
      data.coll = this.nameCamp;
    }
    this.campañaSer.actClientCampa(data.id, data.coll, data);
    this.cerrarModal();
  }

  eliminarCamp(item: RespCampaña){
    Swal.fire({
      title: 'Confirmar',
      text: `Eliminar la Campaña?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.value) {
        this.campañaSer.delCampana(item.id).then(() => this.funcSer.showToast(`Eliminado: ${item.data.name}`, 'OK!', 1500));
      }
    });
  }

}
