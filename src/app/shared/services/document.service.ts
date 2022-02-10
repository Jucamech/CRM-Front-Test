import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { RespDocFire, RespDocumentos } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { FuncionesComunesService } from './funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  EmitDocumento$ = new EventEmitter<RespDocumentos[]>();
  E$: Subscription[] = [];

  constructor(private fireSer: FirebaseService,
              private httpSer: AuthService,
              private funcSer: FuncionesComunesService) { }

  destruirObserversDocument(){
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (err) {}
  }

  /**
   * FUNCION DE FIREBASE !NO USAR!
   */
  async trasladarData(doc: RespDocFire, coll: string){
    let data: RespDocumentos;
    data.vencimiento = doc.data.vencimiento;
    data.documento = doc.data.url;
    data.descripcion = doc.data.descripcion;
    data.tipo_documento = doc.data.tipo_documento;
    this.httpSer.postDocumentos(data.id_cliente ,data).subscribe(res => {
      if (res['id']) {
        this.fireSer.delDocum(doc.id, coll).then(() => {
          this.funcSer.showSweetSuccess('OK!','Documentos Movidos', 1500);
        })
      }
    }, err => {
      this.funcSer.logWarn('Error', err);
    })
  }

  getdocumentos= async (id:string) =>
  new Promise<RespDocumentos[]>((resolve, reject)=> {
    try {
      let data: RespDocumentos[] = [];
      const E$1 = this.httpSer.getDocument(id).subscribe((r: RespDocumentos[] ) => {
        for (const k in r) {
          const el = r[k];
          data.push(el)
        }
        this.EmitDocumento$.emit(data);
        resolve(data);
      }, err => {
        this.EmitDocumento$.emit(data);
        resolve(data);
      })
      this.E$.push(E$1);
    } catch (error) {
      this.funcSer.logWarn('Error', error);
      reject(error);
    }
  })

  guardarDocumento = async (id:string ,data:RespDocumentos) =>
  new Promise((resolve, reject)=> {
    try {
      const E$3 = this.httpSer.postDocumentos(id, data).subscribe((r) => {
        if (r) {
          this.funcSer.showSweetSuccess('OK','Documentos Actualizados', 1500 );
          this.getdocumentos(id);
          E$3.unsubscribe();
          resolve(r);
        }
      })
    } catch (err) {
      this.funcSer.logWarn('Error', err);
      reject(err);
    }
  })

  eliminarDocumentos(id: string, id_cliente: string){
    const E$4 = this.httpSer.delDocument(id).subscribe(() => {
      this.funcSer.showSweetSuccess('OK','Documento Eliminado', 1500 );
      this.getdocumentos(id_cliente);
      E$4.unsubscribe();
    }, err => {
      this.funcSer.showSweetError('ERROR', 'Revisa Sesión', 2000);
      this.funcSer.logWarn('Error', err);
    });
  }

  editDocument = async (id:string, id_cliente: string ,data:RespDocumentos) =>
  new Promise<boolean>((resolve, reject)=> {
    try {
      const E$5 = this.httpSer.editDocumentos(id, data).subscribe((r) => {
        this.funcSer.showSweetSuccess('OK','Documento Editado!', 2000 );
        this.getdocumentos(id_cliente);
        E$5.unsubscribe();
        resolve(true);
      }, err => {
        this.funcSer.showSweetError('ERROR', 'Revisa Sesión', 2000);
        this.funcSer.logWarn('Error', err);
        reject(false);
      });
    } catch (err) {
      this.funcSer.showSweetError('ERROR', 'Fallo desconocido', 2000);
      this.funcSer.logWarn('Error', err);
      reject(false);
    }
  })

}
