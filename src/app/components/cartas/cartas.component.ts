
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Base64 } from 'src/app/shared/models/otros.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartasService, DataCarta, RespCartaFire } from 'src/app/shared/services/cartas.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {
  coll = environment.fireColecc;
  id: string;
  is_admin: boolean;
  tiposPermCartas = /pdf|image|wordprocessingml/;//.docx, .doc, .pdf
  tiposPerm = /pdf|image/;
  cartas: DataCarta[];
  cartasF: RespCartaFire[];
  editCarta: DataCarta;
  editCarta2: RespCartaFire;

  classInputMod = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  classInputMod2 = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  guardar: boolean = false;


  //////////DATOS DE LE ENVIO////////////////////
  ronda: string; // 1 , 2 .... 7
  buro: string;
  fecha_envio: string
  cuentas: string;
  tracking: string;
  carta: string;
  num_tracking: string;

  type: string;
  name: string;
  uploadPercent: number;
  url: string;

  type2: string;
  name2: string;
  uploadPercent2: number;
  url2: string;

  modal: boolean;
  src: SafeResourceUrl;
  typeRes: any;
  nameRes: string;


  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private cartasSer : CartasService,
              private http: AuthService,
              private functionServ: FuncionesComunesService,
              private sanitizer: DomSanitizer,
              /* FIREBASE */
              private fire: FirebaseService)
  {
    this.id = this.route.snapshot.params['id'];
    this.is_admin = functionServ.generarPermisos();
  }

  ngOnInit(): void {
    this.getCartasFire();
    this.getCartas();

  }

  getCartasFire(){
    let col = `${this.coll}carta-${this.id}`;
    this.fire.getCartas(col).subscribe((snap) => {
      this.cartasF = [];
      snap.forEach((arti:any) => {
        this.cartasF.push({
          index: arti.payload.doc.data().indice ,
          id : arti.payload.doc.id,
          data : arti.payload.doc.data()
        });
      });
    });
  }

  getCartas(){
    let cartas = [];
    this.cartasSer.getRegistros(this.id).then(( r: DataCarta[] ) => {
      for (const k in r) {
        const el = r[k];
        cartas.push(el)
      }
      this.cartas = cartas;
    });
  }

  handCarta(item: DataCarta){
    this.editCarta = item;
    this.modal = true;
  }

  handCarta2(item: RespCartaFire){
    this.editCarta2 = item;
    this.modal = true;
  }

  editarCartaCli(item: DataCarta){
    let c = item.carta;
    let t = item.tracking;
    let newUser = localStorage.getItem('id_agente');
    item.tracking = this.url2 ? this.url2 : item.tracking;
    item.carta = this.url ? this.url : item.carta;
    item.id_user = `${newUser}`;
    item.buro = this.buro ? this.buro : item.buro;
    item.num_tracking = this.num_tracking ? this.num_tracking: item.num_tracking;
    delete item['fecha_creacion'];
    Swal.fire({
      title: 'Confirmar!',
      text: `Guardar Cambios?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar!',
    }).then((r) => {
      if (r.value) {
        this.cartasSer.editarRegistro(item.id , item).then(() => {
          this.getCartas();
          this.reset();
          this.editCarta = null;
          this.cerrarModal();
        });
        if (this.url) {
          this.eliminarArchivos(c);
        }
        if (this.url2) {
          this.eliminarArchivos(t);
        }
      } else {
        this.getCartas();
        this.reset();
        this.editCarta = null;
      }
    });
  }

  addCarta() {
    let data = {
      ronda: this.ronda,
      fecha_envio: this.fecha_envio,
      buro: this.buro,
      tracking: this.url2 ? this.url2 : 'nulo', /// doc
      carta: this.url, /// doc
      num_tracking: this.num_tracking.length > 12 ? this.num_tracking : 'none'
    }
    if (this.url && this.url2 && this.ronda && this.fecha_envio) {
      this.cartasSer.crearRegistro(this.id, data)
      .then(() => {
        this.reset();
        this.getCartas();
      });
    } else if (!this.ronda) {
      this.functionServ.showSweetError('Error!','Falta la Ronda', 1500 );
    } else if (!this.fecha_envio) {
      this.functionServ.showSweetError('Error!','Falta la Fecha', 1500 );
    } else if (!this.url2) {
      Swal.fire({
        title: 'Confirmar!',
        text: `Falta los Trackings`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar!',
      }).then((r) => {
        if (r.value) {
          this.cartasSer.crearRegistro(this.id, data)
          .then(() => {
            this.reset();
            this.getCartas();
          });
        }
      });
    }
  }

  addCarta2() {
    let data = {
      ronda: this.ronda,
      fecha_envio: this.fecha_envio,
      cuentas:'nulo',
      buro: `0`,
      tracking: this.url2, /// doc
      carta: this.url, /// doc
      num_tracking: this.num_tracking? this.num_tracking : 'none'
    }
    if (this.url && this.url2 && this.ronda && this.fecha_envio) {
      this.cartasSer.crearRegistroF(this.id, data)
      .then(() => {
        this.reset();
        this.getCartas();
        this.cerrarModal();
      });

    } else if (!this.ronda) {
      this.functionServ.showSweetError('Error!','Falta la Ronda', 1500 );
    } else if (!this.fecha_envio) {
      this.functionServ.showSweetError('Error!','Falta la Fecha', 1500 );
    } else if (!this.url2) {
      Swal.fire({
        title: 'Confirmar!',
        text: `Falta los Trackings`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar!',
      }).then((r) => {
        if (r.value) {
          this.cartasSer.crearRegistroF(this.id, data)
          .then(() => {
            this.reset();
            this.getCartas();
          });
        }
      });
    }
  }

  reset(){
    this.ronda = '';
    this.fecha_envio = '';
    this.tracking = '';
    this.carta = '';
    this.url = null;
    this.url2 = null;
    this.guardar = false;
    this.classInputMod = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
    this.classInputMod2 = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  }

  cerrarForm(): void {
    this.router.navigateByUrl(('consultarcliente'));
  }

  get64(id: string): void{
    let base: string;
    const E$2 = this.http.get64(id).subscribe(res => {
      this.functionServ.log('res',res)
      base = res['base'];
      this.typeRes = res['tipo'];
      this.nameRes = `${res['name']}`;
      if (this.typeRes == 'application/pdf' || this.typeRes == 'application/msaccess') {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(String(base));
      } else {
        this.src = base;
      }
      E$2.unsubscribe();
    }, () => E$2.unsubscribe() );
  }


  eliminarArchivos(id:string){
    const E$x = this.http.del64(id).subscribe((r) => {
      if (r['message']) {
        this.functionServ.showToast( 'Imagen Eliminada','OK!', 1300, 2);
      }
      E$x.unsubscribe();
    }, () => {
      E$x.unsubscribe();
    })
  }

  handlerImg64Carta(ev: Event ){
    const target = ev.currentTarget as HTMLInputElement;
    if (target) {
      const type = target.files[0].type;
      const archivo = target.files[0];
      if (type && type.match( this.tiposPermCartas )) {
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
            const E$3 = this.http.post64(data).subscribe(res => {
              this.url = res['id'];
              this.functionServ.showToast( 'Imagen Guardada','OK!', 1300, 2);
              this.classInputMod = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
              this.guardar = true;
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
  handlerImg64Track(ev: Event){
    const target = ev.currentTarget as HTMLInputElement;
    if (target) {
      const type = target.files[0].type;
      const archivo: File = target.files[0];
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
            const E$3 = this.http.post64(data).subscribe(res => {
              this.url2 = res['id'];
              this.functionServ.showToast( 'Imagen Guardada','OK!', 1300, 2);
              this.classInputMod2 = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
              this.guardar = true;
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

  handlerImgCarta(ev:any){
    this.type = ev.target.files[0].type;
    if ( this.type && this.type.match(this.tiposPerm)) {
      this.name = `${ev.target.files[0].name}id-${this.id}`;
      this.fire.uploadImage(ev);
      this.uploadPercent = this.fire.task.percentageChanges();
      this.fire.task.snapshotChanges().pipe(
        finalize(()=> {
          this.fire.fileRef.getDownloadURL().subscribe((urlImage: string) => {
            this.url = urlImage;
            this.classInputMod = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
            this.guardar = true;
          });
        })
      ).subscribe();
    } else { this.functionServ.showSweetWarning('ERROR!', 'Documento no Permitido', 2000); }
  }

  handlerImgtrack(ev:any){
    this.type2 = ev.target.files[0].type;
    if ( this.type2 && this.type.match(this.tiposPerm)) {
      this.name2 = `${ev.target.files[0].name}id-${this.id}`;
      this.fire.uploadImage(ev);
      this.uploadPercent2 = this.fire.task.percentageChanges();
      this.fire.task.snapshotChanges().pipe(
        finalize(()=> {
          this.fire.fileRef.getDownloadURL().subscribe((urlImage: string) => {
            this.url2 = urlImage;
            this.classInputMod2 = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
            this.guardar = true;
          });
        })
      ).subscribe();
    } else { this.functionServ.showSweetWarning('ERROR!', 'Documento no Permitido', 2000); }
  }

  preEliminarRegistro(item: RespCartaFire){
    Swal.fire({
      title: 'Confirmar!',
      text: `Desea Borrar todo?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar!',
    }).then((r) => {
      if (r.value) {
        this.eliminarRegistro(item);
      }
    });
  }

  async eliminarRegistro(item: RespCartaFire){
    let col = `${this.coll}carta-${this.id}`;
    Swal.showLoading();
    await this.eliminarImg(item.data.carta);
    await this.eliminarImg(item.data.tracking);
    this.cartasSer.eliminarCartaFire(item.id, col);

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

  eliminarCarta(item: DataCarta){
    Swal.fire({
      title: 'Confirmar!',
      text: `Desea Borrar el REGISTRO?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar!',
    }).then((r) => {
      if (r.value) {
        this.cartasSer.deleteRegistros(item.id).then(() => this.getCartas() );
        if (item.carta.length < 20) {
          this.eliminarArchivos(item.carta);
        }
        if (item.tracking != 'nulo' && item.tracking.length < 20 ) {
          this.eliminarArchivos(item.tracking);
        }
      }
    });
  }

  cerrarModal(){
    this.modal = false;
    this.editCarta = null;
  }

}
