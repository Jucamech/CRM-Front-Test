import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DataClientcamp, ModoCampaña } from '../models/citas.model';
import { ClienteModelGen, ClientModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignSaleService {

  //////////////////////////////////////////////////////////////////////
  /////////////////// SERVICIO DE CAMPAÑA ANTIGUO V1 ///////////////////
  //////////////////////////////////////////////////////////////////////

  activa = environment.campagna;
  colle: string;

  constructor(private fire: AngularFirestore)
  {
    this.colle = this.activa ? 'Campañas_creditoMejor' : 'none';
  }

  /////////////////////// ↓↓↓ DEPRECADO ↓↓↓ //////////////////////

  /**Creador de campañas */
  sendCampaña(data:ModoCampaña, colle: string){
    return this.fire.collection(colle).add(data);
  }

  getCampaña( colle: string){
    return this.fire.collection(colle).snapshotChanges();
  }

  getCampañaVenta( colle: string){
    return this.fire.collection(colle).snapshotChanges();
  }

  editCampaña(id: string, colle: string, data: ModoCampaña ){
    return this.fire.collection(colle).doc(id).set(data);
  }

  enviarClienteCampaña(data: DataClientcamp, coll: string ){
    return this.fire.collection(coll).add(data);
  }

  delCampana(id: string){
    return this.fire.collection(this.colle).doc(id).delete();
  }

  /**
   * Actualizar los datos del cliente mediante las llamadas
   * @param id del Documento
   * @param colle Collecion
   * @param data DataClientcamp
   * @returns
   */
  actClientCampa(id: string, colle: string, data: DataClientcamp ): Promise<void>{
    return this.fire.collection(colle).doc(id).set(data);
  }

  /////////////////////////////////////////////////////////////////////
  insertTel(item: ClienteModelGen ):string[]{
    let data = [];
    if (item.telmovil && item.telmovil.length == 7) { data.push('telmovil')};
    if (item.telcasa && item.telcasa.length == 7 && item.telcasa != '0000000' ) { data.push('telcasa')};
    if (item.teltrabajo && item.teltrabajo.length == 7 && item.teltrabajo != '0000000') { data.push('teltrabajo')};
    if (item.telotro && item.telotro.length == 7 && item.telotro != '0000000' ) { data.push('telotro')};
    return data
  }
  insertTel2(item: Partial<ClientModel> ):string[]{
    let data = [];
    if (item.telmovil && item.telmovil.length == 10) { data.push('telmovil')};
    if (item.telcasa && item.telcasa.length == 10 && item.telcasa != '0000000***' ) { data.push('telcasa')};
    if (item.teltrabajo && item.teltrabajo.length == 10 && item.teltrabajo != '0000000***') { data.push('teltrabajo')};
    if (item.telotro && item.telotro.length == 10 && item.telotro != '0000000***' ) { data.push('telotro')};
    return data
  }

  insertUser(){
    return `${localStorage.getItem('id_agente')}-${localStorage.getItem('nombre')}`;
  }
  /**Crea el nombre completo */
  insertNameCli(item: ClienteModelGen |Partial<ClientModel> ){
    let name = ''
    if (item.nombres && item.apellidos) {
      name = `${item.nombres} ${item.apellidos}`;
    } else if (item.nombres) {
      name = `${item.nombres}`;
    } else {
      name = `LLamada Perdida`;
    }
    return name;
  }
  /**Crea solo el apellido */
  insertLastNameCli(item: ClienteModelGen |Partial<ClientModel> ){
    let name = ''
    if (item.nombres && item.apellidos) {
      name = `${item.apellidos}`;
    } else if (item.nombres && !item.apellidos) {
      name = ``;
    } else {
      name = `Perdida`;
    }
    return name;
  }
  /**Crea solo el apellido */
  insertFirstNameCli(item: ClienteModelGen |Partial<ClientModel> ){
    let name = ''
    if (item.nombres ) {
      name = `${item.nombres}`;
    } else {
      name = `Perdida`;
    }
    return name;
  }
}
