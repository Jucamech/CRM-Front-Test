import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BUROS } from 'src/app/shared/constants/documentos';
import { DataContestaciones, RespContestaciones } from 'src/app/shared/models/otros.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContestacionesService } from 'src/app/shared/services/contestaciones.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contestaciones',
  templateUrl: './contestaciones.component.html',
  styleUrls: ['./contestaciones.component.css']
})
export class ContestacionesComponent implements OnInit {
  conste: RespContestaciones[];
  consteCopia: RespContestaciones[];
  id_cli: string;
  ord: number;
  ord2: number;
  classInputMod2 = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  none: boolean = true;
  none2: boolean = true;
  nd: number[] = [0, 0];
  buros = BUROS;
  tiposPerm = /pdf|image/;
  safeSrc: SafeResourceUrl;

  is_admin: boolean;
  // data
  fecha:string;
  buro: string;
  ronda: string;
  uploadPercent: any;
  name: any;
  type: any;
  url: string;
  guardar: boolean;
  modal: boolean;
  itemR: RespContestaciones;
  ord3: number;
  nota: string;
  min_modal: boolean;
  docs: RespContestaciones;
  allImg: string[];
  add: boolean;
  ind: number;
  src: any;
  typeRes: any;
  nameRes: string;


  constructor(private ConstSer: ContestacionesService,
              private route: ActivatedRoute,
              private funcSer: FuncionesComunesService,
              private http: AuthService,
              private sanitizer: DomSanitizer,
              /* FIREBASE */
              private fire: FirebaseService)
  {
    this.id_cli = this.route.snapshot.params['id'];
    this.is_admin = this.funcSer.generarPermisosAdmin();
  }

  ngOnInit(): void {
    this.getContest();
  }

  getContest(){
    let id = this.id_cli;
    let data: RespContestaciones[] = []
    this.ConstSer.getContestaciones(id).then(( res ) => {
      for (const k in res) {
        const el = res[k];
        data.push(el);
      }
      this.conste = data;
      this.consteCopia = data;
      this.ordenar()
    })
  }

  safeurl(url: string){
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  guardarContestacion(){
    let id = this.id_cli;
    let data: DataContestaciones = {
      ronda: Number(this.ronda),
      buro: Number(this.buro),
      document: [this.url],
      fecha_resp: this.fecha,
      nota: this.nota
    }
    this.ConstSer.enviarContestaciones(id, data)
    .then((r) => {
      if (r) {
        this.reset();
        this.getContest();
      }
    })
  }

  get64(id: string){
    const E$4 = this.http.get64(id).subscribe(res => {
      this.src = res['base'];
      this.typeRes = res['tipo'];
      this.nameRes = `${res['name']}`;
      if (this.typeRes == 'application/pdf' || this.typeRes == 'application/msaccess') {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(String(this.src));
      }
      E$4.unsubscribe();
    }, () => E$4.unsubscribe() );
  }

  eliminarArchivos(id:string){
    const E$x = this.http.del64(id).subscribe((r) => {
      if (r['message']) {
        this.funcSer.showToast( 'Imagen Eliminada','OK!', 1300, 2);
      }
      E$x.unsubscribe();
    }, () => {
      E$x.unsubscribe();
    })
  }

  handlerImg64(ev: Event ){
    const target = ev.currentTarget as HTMLInputElement;
    if (target) {
      const type = target.files[0].type;
      const archivo = target.files[0];
      if (type && type.match(this.tiposPerm)) {
        this.funcSer.base64(archivo).then((img) => {
          let error = String(img.blob.name).split('.')[2];
          if (error) {
            this.funcSer.showSweetWarning('ERROR!', 'Nombre no Válido', 2000);
          } else {
            let data = {
              base: img.base,
              tipo: img.blob.type,
              name: img.blob.name,
              ext: String(img.blob.name).split('.')[1],
            }
            const E$3 = this.http.post64(data).subscribe(res => {
              this.url = res['id'];
              this.classInputMod2 = 'custom-input-file adMod col-md-6 col-sm-6 col-xs-6';
              this.guardar = true;
              this.funcSer.showToast( 'Imagen Guardada','OK!', 1300, 2);
              E$3.unsubscribe();
            }, err => {
              this.funcSer.logWarn('error', err);
              E$3.unsubscribe();
            })
          }
        });
      } else {
        this.funcSer.showSweetWarning('ERROR!', 'Documento no Permitido', 2000);
      }
    }
  }

  reset(){
    this.ronda = null;
    this.buro = null;
    this.url = null;
    this.fecha = null;
    this.nota = null;
    this.guardar = false;
    this.classInputMod2 = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  }

  editarConst(item: RespContestaciones){
    this.modal = true;
    this.itemR = item;
  }

  enviarConstMod(){
    let id = this.itemR.id;
    let doc: string[];
    if (this.url) {
      doc = this.itemR.document;
      doc.push(this.url);
    }
    let data: DataContestaciones = {
      ronda: this.itemR.ronda,
      buro: this.itemR.buro,
      document: doc,
      fecha_resp: this.itemR.fecha_resp,
      nota: this.itemR.nota
    }
    this.funcSer.log('data',[id, data, this.itemR]);
    this.ConstSer.actContestaciones(id, data ).then((r) => {
      if (r) {
        this.cerrarModal();
        this.getContest();
        this.add = null;
        this.itemR = null;
      }
    });
  }

  async eliminarConst(id:string, arrArch: string[]){
    Swal.fire({
      title: 'Confirmar!',
      text: `Eliminar Registro?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar!',
    }).then((r) => {
      if (r.value) {
        this.ConstSer.eliminarContestaciones(id).then((r) => {
          if (r) {
            this.reset();
            this.getContest();
          }
        });
        arrArch.forEach(arc => this.eliminarArchivos(arc));
      }
    });
  }

  addImg(item: RespContestaciones, i:number){
    this.ind = i
    this.add = true;
    this.itemR = item;
    this.allImg = item.document;

  }

  addImagenREgistro(){
    if (this.url) {
      let id = this.itemR.id;
      let doc: string[] = this.itemR.document;
      doc.push(this.url);
      let data: DataContestaciones = {
        ronda: this.itemR.ronda,
        nota: this.itemR.nota,
        buro: this.itemR.buro,
        document: doc,
        fecha_resp: this.itemR.fecha_resp
      }
      this.ConstSer.actContestaciones(id, data ).then((r) => {
        if (r) {
          this.getContest();
          this.cancel();
        }
      })
    } else {
      this.funcSer.showSweetWarning('Error!', 'Falta el nuevo Elemento', 1800)
    }
  }

  cancel(){
    this.add = null;
    this.itemR = null;
    this.allImg = null;
    this.url = null;
    this.ind = null;
    this.classInputMod2 = 'custom-input-file col-md-6 col-sm-6 col-xs-6';
  }

  cerrarModal(){
    this.modal = false;
    this.itemR = null;
  }

  ordenar(n: number = 1){
    this.ord = n;
    if (n == 1) {
      this.funcSer.ordenarAny(this.conste, 'ronda', 'Desc' );
    } else if (n == 2) {
      this.funcSer.ordenarAny(this.conste, 'buro', 'Desc' );
    } else if (n == 3) {
      this.funcSer.ordenarAny(this.conste, 'fecha_resp', 'Desc' );
    } else if (n == 4) {
      this.funcSer.ordenarAny(this.conste, 'ronda', 'Asc');
    } else if (n == 5) {
      this.funcSer.ordenarAny(this.conste, 'buro', 'Asc' );
    } else if (n == 6) {
      this.funcSer.ordenarAny(this.conste, 'fecha_resp', 'Asc' );
    }
  }

  filtrar(n: number, n2 :number){
    if (n2 == this.ord3) { n2 = 0; }
    if (n == this.ord2) { n = 0; }
    this.ord2 = n;
    this.ord3 = n2;
    this.conste = [];
    let data:RespContestaciones[] = [];
    let data2:RespContestaciones[] = [];
    let data3:RespContestaciones[] = [];
    if (n == 0 && n2 == 0) {
      this.nd = [n, n];
      this.conste = this.consteCopia;
    }
    if (n == 51) {
      this.nd = [n, this.nd[1]];
      data = this.consteCopia.filter(c => c.buro == 1);

    }
    if (n == 52) {
      this.nd = [n, this.nd[1]];
      data = this.consteCopia.filter(c => c.buro == 2);

    }
    if (n == 53) {
      this.nd = [n, this.nd[1]];
      data = this.consteCopia.filter(c => c.buro == 3);

    }
    if (n == 54) {
      this.nd = [n, this.nd[1]];
      data = this.consteCopia.filter(c => c.buro == 4);
    }
    if (n2 > 0) {
      this.nd = [this.nd[0], n2];
      data2 = this.consteCopia.filter(c => c.ronda == n2);
    }
    data3 = this.conste.concat(data, data2);
    const x = new Set(data3);
    this.conste = [...x];
    this.funcSer.eliminarDuplicados(this.conste);
    this.ordenar();
  }

  verImg(doc: RespContestaciones){
    this.min_modal = true;
    this.docs = doc;
  }

  cerrarMinModal(){
    this.src = null;
    this.min_modal = false;
    this.docs = null;
  }

  pdfInclude(): boolean{
    if (String(this.safeSrc).includes('pdf') ) {
      return true;
    } else {
      return false;
    }
  }

}
