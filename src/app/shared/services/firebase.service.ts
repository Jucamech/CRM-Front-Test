import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { ImagenFirebase } from '../models/otros.model';
import { AngularFireStorage } from '@angular/fire/storage';

import { map } from 'rxjs/operators';
import { DataCarta } from './cartas.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  documentacion: AngularFireList<ImagenFirebase>;
  fileRef:any;
  task:any;

  constructor(private fire: AngularFirestore,
              private storage: AngularFireStorage)
  {}
  /* --------------------------------------------------------------------------------- */
  ///////////////////////////////////// NO USAR !!  /////////////////////////////////////
  /* ----------------------------metodos de documentos-------------------------------- */

  /**
   * NO USAR
   */
  getData(){
    return this.documentacion.snapshotChanges().pipe(
      map((change) => {
        return change.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  ///////////////////////////////////// NO USAR !!  /////////////////////////////////////

   /**
   * NO USAR
   */
  sendDoc(data:ImagenFirebase, colle: string){
    return this.fire.collection(colle).add(data);
  }

   /**
   * NO USAR
   */
  sendCarta(data:DataCarta, colle: string){
    return this.fire.collection(colle).add(data);
  }

   /**
   * NO USAR
   */
  uploadImage(ev:any){
    const file = ev.target.files[0];
    const filePath = file.name;
    this.fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, file);
  }

 /**
   * NO USAR
   */
  getArticulos(colle: string){
    return this.fire.collection(colle).snapshotChanges();
  }

   /**
   * NO USAR
   */
  getCartas(colle: string){
    return this.fire.collection(colle).snapshotChanges();
  }

   /**
   * NO USAR
   */
  editCarta(id: string, colle: string, data: DataCarta){
    return this.fire.collection(colle).doc(id).set(data);
  }

   /**
   * NO USAR
   */
  editDocum(id: string, colle: string, data: ImagenFirebase){
    return this.fire.collection(colle).doc(id).set(data);
  }

   /**
   * NO USAR
   */
  delCarta(id: string, colle: string){
    return this.fire.collection(colle).doc(id).delete();
  }

   /**
   * NO USAR
   */
  delDocum(id: string, colle: string){
    return this.fire.collection(colle).doc(id).delete();
  }

   /**
   * NO USAR
   */
  delStorage(ruta: string){
    let ref = this.storage.refFromURL(ruta);
    return ref.delete();
  }

/* ----------------------------metodos de documentos-------------------------------- */
/* --------------------------------------------------------------------------------- */

/* ---------------------------campaña------------------------------ */


}


