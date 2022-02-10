import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base64, ImagenFirebase } from 'src/app/shared/models/otros.model';
import { RespDocFire, RespDocumentos } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { environment } from 'src/environments/environment';
import { DocumentService } from 'src/app/shared/services/document.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { TIPO } from 'src/app/shared/constants/documentos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.css'],
})

export class DocumentacionComponent implements OnInit, OnDestroy {
  coll = environment.fireColecc;
  is_admin: boolean;
  fail: boolean;
  tipos = TIPO;
  modal: boolean = false;

  dataClienteDocument: Array<any>;
  idCliente: string;
  idUser: string;

  classInputMod = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  guardar: boolean = false;
  dataC: Array<RespDocumentos>;
  documentCli: RespDocumentos[];
  tiposPerm = /pdf|image|msaccess/;

  tipo_documento: string;
  documento: Base64;
  vencimiento: string;
  descripcion: string;

  /* firebase */
  uploadPercent:any
  url: string;
  url2: string;
  fireDocs: RespDocFire[];
  type: string;
  typeRes: string;
  name: string;

  E$: Subscription[] = [];
  itemDoc: RespDocumentos;
  itemFire: RespDocFire;
  src: string | SafeResourceUrl;
  nameRes: string;

  constructor(public httpServ: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private functionServ: FuncionesComunesService,
              private documentSer: DocumentService,
              private sanitizer: DomSanitizer,
              /* FIREBASE */
              private fire: FirebaseService
  ) {
    this.idCliente = this.route.snapshot.params['id'];
    this.is_admin = functionServ.generarPermisosAdmin();
    this.idUser = localStorage.getItem('id_agente');
  }

  ngOnDestroy(): void {
    this.documentSer.destruirObserversDocument();
    try {
      this.E$.forEach( e=> e.unsubscribe() );
    } catch (error) { }
  }

  ngOnInit(): void {
    this.getDocumentosDB();
    const E$1 = this.documentSer.EmitDocumento$.subscribe(res => this.documentCli = res );
    this.E$ = [E$1];
  }

/*-------------------------------- metodos de db------------------------------ */

  eliminarArchivos(id:string){
    const E$x = this.httpServ.del64(id).subscribe((r) => {
      if (r['message']) {
        this.functionServ.showToast( 'Imagen Eliminada','OK!', 1300, 2);
      }
      E$x.unsubscribe();
    }, () => {
      E$x.unsubscribe();
    })
  }

  get64(id: string): void{
    const E$2 = this.httpServ.get64(id).subscribe(res => {
      this.src = res['base'];
      this.typeRes = res['tipo'];
      this.nameRes = `${res['name']}`;
      if (this.typeRes == 'application/pdf' || this.typeRes == 'application/msaccess') {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.src));
      }
      E$2.unsubscribe();
    }, () => E$2.unsubscribe() );
  }

  handlerImg64(ev: Event ): void{
    const target = ev.currentTarget as HTMLInputElement;
    if (target) {
      const type = target.files[0].type;
      const archivo = target.files[0];
      if (type && type.match(this.tiposPerm)) {
        this.functionServ.base64(archivo).then((img) => {
          let error = String(img.blob.name).split('.')[2];
          if (error) {
            this.functionServ.showSweetWarning('ERROR!', 'Nombre no Válido', 2000);
          } else {
            let data = {
              base: img.base,
              tipo: img.blob.type,
              name: img.blob.name,
              ext: String(img.blob.name).split('.')[1],
            }
            const E$3 = this.httpServ.post64(data).subscribe(res => {
              this.url = res['id'];
              this.functionServ.showToast( 'Imagen Guardada','OK!', 1300, 2);
              this.classInputMod = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
              E$3.unsubscribe();
            }, err => {
              this.functionServ.logWarn('error', err);
              E$3.unsubscribe();
            })
          }
        });
      } else {
        this.functionServ.showSweetWarning('ERROR!', 'Documento no Permitido', 2000);
      }
    }
  }

  fromFireToDB(url: string){
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const Reader = new FileReader();
      Reader.onloadend = () => {
        this.functionServ.log('reader res', Reader.result);
      }
      Reader.readAsDataURL(xhr.response);
      this.functionServ.log('xhr res', xhr.response);
    }
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }


/* ---------------------------fin  metodos de db ---------------------------*/
/* -------------------------------------------------------------------------- */
/* ----------------------------- metodos nuevos DB -----------------------------*/
  getDocumentosDB():void{
    this.documentSer.getdocumentos(this.idCliente).then((res) => {
      this.documentCli = res;
    });
  }

  enviarDocumentoDB():void{
    let data: RespDocumentos = {
      descripcion: this.descripcion,
      documento: this.url,
      tipo_documento: this.tipo_documento,
      vencimiento: this.vencimiento ? this.vencimiento : '2030-01-01'
    }
    if (this.descripcion && this.url && this.tipo_documento) {
      this.documentSer.guardarDocumento(this.idCliente, data).then( () => this.reset() );
    } else {
      this.functionServ.showSweetWarning('Error', 'Faltan Campos', 2500);
      this.functionServ.log('Url', this.url );
      this.functionServ.log('tipo', this.tipo_documento );
      this.functionServ.log('desc', this.descripcion );

    }
  }

  eliminarDoc(item: RespDocumentos):void{
    this.documentSer.eliminarDocumentos(String(item.id), item.id_cliente);
    if (item.documento.length > 50) {
      this.eliminarImg(item.documento, false);
    } else {
      this.eliminarArchivos(item.documento);
    }
  }

  editarDocumento(item: RespDocumentos):void{
    this.itemDoc = item;
    this.modal = true;
    this.vencimiento = item.vencimiento;
    this.descripcion = item.descripcion;
    this.tipo_documento = item.tipo_documento;
    this.url2 = item.documento;
  }

  enviarDocEditado():void{
    let item = this.itemDoc;
    let data: RespDocumentos = {
      descripcion: this.descripcion,
      documento: this.url ? this.url : this.url2,
      tipo_documento: this.tipo_documento,
      vencimiento: this.vencimiento
    }
    if (this.url) { this.eliminarArchivos(this.url2); }
    this.documentSer.editDocument(String(item.id), item.id_cliente, data).then(() => {
      this.reset();
    });

  }

/* ------------------------ fin de metodos nuevos db ---------------------------*/
/* --------------------------------------------------------------------- */
/* ----------------------------- metodos NO -----------------------------*/

  cerrarForm(): void {
    this.router.navigateByUrl('consultarcliente');
  }

  reset():void{
    this.classInputMod = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
    this.url = '';
    this.url2 = '';
    this.tipo_documento = '';
    this.vencimiento = '';
    this.descripcion = '';
    this.modal = false;
    this.itemFire = null;
    this.itemDoc = null;
  }

/* ----------------------FIN metodos NO ----------------------------*/
/* --------------------------------------------------------------- */
/*----------------------- metodos de firebase-------------------- */
/*   handlerImg(ev:any){
    this.type = ev.target.files[0].type;
    this.name = `${ev.target.files[0].name}id-${this.idCliente}`;
    if ( this.type && this.type.match(this.tiposPerm)) {
      this.fire.uploadImage(ev);
      this.uploadPercent = this.fire.task.percentageChanges();
      this.fire.task.snapshotChanges().pipe(
        finalize(()=> {
          const E$2 = this.fire.fileRef.getDownloadURL().subscribe((urlImage: string) => {
            this.url = urlImage;
            this.classInputMod = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
            this.guardar = true;
          });
          this.E$.push(E$2);
        })
      ).subscribe();
    } else {
      this.functionServ.showSweetWarning('ERROR!', 'Documento no Permitido', 2000);
    }
  }

  sendDoc(){
    let now = `${new Date()}`;
    let data:ImagenFirebase = {
      type: this.type,
      name: this.name,
      fecha_creacion: now,
      tipo_documento: this.tipo_documento,
      url: this.url,
      vencimiento: this.vencimiento? this.vencimiento: '2030-01-01',
      descripcion: this.descripcion,
      id_cliente: this.idCliente,
      id_user: this.idUser,
    }
    if (data.url && data.descripcion && data.tipo_documento) {
      let col= `${this.coll}${this.idCliente}`;
      this.classInputMod = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
      this.fire.sendDoc(data, col).then((res) => {
        this.reset();
        this.functionServ.showSweetSuccess('OK!', 'Documentos Actualizados', 1000);
      }).catch((err)=> {
        this.functionServ.logWarn('Error Base64', err);
        this.functionServ.showSweetError('ERROR', 'No se ha Subido', 2000 );
      });
    } else {
      this.functionServ.showSweetError('ERROR', 'Descripcion y Tipo Obligatorios', 2500 );
    }
  }

  getDocumentos(){
    let col= `${this.coll}${this.idCliente}`;
    this.fire.getArticulos(col).subscribe((snap) => {
      this.fireDocs = [];
      snap.forEach((arti:any) => {
        this.fireDocs.push({
          index: arti.payload.doc.data().indice ,
          id : arti.payload.doc.id,
          data : arti.payload.doc.data()
        });
      })
    });
  } */

/*   editarDocumentoFire(item:RespDocFire){
    delete item.data.name;
    delete item.data.fecha_creacion;
    this.itemFire = item;
    this.modal = true;
    this.vencimiento = item.data.vencimiento;
    this.descripcion = item.data.descripcion;
    this.tipo_documento = item.data.tipo_documento;
    this.url = item.data.url;
  }
 */
  modificarYenviarADB():void{
    let item = this.itemFire;
    let col= `${this.coll}${this.idCliente}`;
    this.fire.delDocum(item.id, col ).then(() => {
      this.enviarDocumentoDB();
    });
  }

  eliminarImg = async (ruta: string, preg: boolean = false) =>
  new Promise((resolve, reject) =>{
    if (preg) {
      Swal.fire({
        title: 'Confirmar!',
        text: `Eliminar este Documento?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar!',
      }).then((r) => {
        if (r.value) {
            this.fire.delStorage(ruta).subscribe((r) => {
              this.functionServ.log('imagen eliminada', true)
              resolve(r);
            }, err => {
              this.functionServ.logWarn('Error', err);
              reject(err)
            });
        }
      });
    } else {
      this.fire.delStorage(ruta).subscribe((r) => {
        this.functionServ.log('imagen eliminada', true)
        resolve(r);
      }, err => {
        reject(err)
      });
    }
  })

  Preeliminar(item:RespDocFire ):void{
    Swal.fire({
      title: 'Confirmar!',
      text: `Eliminar este Documento?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar!',
    }).then((r) => {
      if (r.value){
        this.eliminarRegistro(item);
      }
    });
  }

  eliminarRegistro(item:RespDocFire):void{
    let col= `${this.coll}${this.idCliente}`;
    this.fire.delStorage(item.data.url).subscribe(() => {
      this.fire.delDocum(item.id, col ).then(() => {
        this.functionServ.showSweetSuccess('Guardado','Registro Eliminado!',1500)
      });
    }, err => {
      this.fail = true;
      this.functionServ.logWarn('ERROR', err)
    });
  }

  forzarEliminacion(item:RespDocFire):void{
    let col= `${this.coll}${this.idCliente}`;
    this.fire.delStorage(item.data.url).subscribe(() => {
      this.fire.delDocum(item.id, col ).then(() => {
        this.fail = false;
        this.functionServ.showSweetSuccess('Guardado','Registro Eliminado!', 1500);
      });
    }, err => {
      this.fire.delDocum(item.id, col ).then(() => {
        this.fail = false;
        this.functionServ.showSweetSuccess('Guardado','Registro Eliminado!', 1500);
      });
    });
  }

}
/*-----------------------FIN metodos de firebase-------------------- */





