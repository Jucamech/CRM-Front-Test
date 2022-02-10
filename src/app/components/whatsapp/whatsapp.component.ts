import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllChatsWht, DataChatClient, GetMsgWhatsApp } from 'src/app/shared/models/whatsapp.model';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { WhatsappApiService } from 'src/app/shared/services/whatsapp-api.service';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {
  @ViewChild('listChat') listChat: ElementRef;
  @ViewChild('chatCli') chatCli: ElementRef;
  @Output() cerrar = new EventEmitter<Object>();
  listChats: AllChatsWht[];
  dataChatCli: AllChatsWht;
  chat: DataChatClient;
  scroll: number = 0;
  n = 0;


  isLoading: boolean = true;
  isChat: boolean;
  buscardor: boolean;
  opciones: boolean;

  img = /s3.eu-central-1.wasabisys.com/;
  tiposPerm = /pdf|image/;

  mensaje: string;
  idChat: string;
  Interval: Subscription;

  buscarInp: string;

  constructor(private whatsApp: WhatsappApiService,
              private funcSer: FuncionesComunesService) { }

  ngOnInit(): void {
    this.getChats();
  }

  cerrarWhat(){
    this.cerrar.emit(false);
    this.chat = null;
    this.idChat = null;
    this.isChat = null;
  }

  atrasWhat(){
    if (!this.chat) {
      this.cerrarWhat();
    } else {
      this.scroll = 0;
      this.Interval.unsubscribe();
      this.chat = null;
      this.idChat = null;
      this.isChat = null;
    }
  }

  isMultiM(url: string){
    const Split = url.split('.');
    if (Split[Split.length - 1] == 'oga') {
      return 'multi';
    } else if (Split[Split.length - 1] == 'pdf') {
      return 'doc';
    } else {
      return 'img';
    }
  }

  getChats(){
    let x:number;
    this.n = 0;
    if (!this.chat) {

      this.whatsApp.getAllChatWhatsapp().then(res => {
        this.chat = null;
        res.forEach(ch => {
          ch.last_time = ch.last_time * 1000;
          if (ch.image == '') {
            ch.image = '../../../assets/iconos/icon_w.jpeg';
          }
        });
        this.listChats = res;
        x = res.length;
        const Interv = this.funcSer.interval(500).subscribe(() => {
          this.n = this.n + 30;
          if (this.n > x) {
            Interv.unsubscribe();
            this.isLoading = false;
          }
        });
      });

    }
  }

  public isImg(txt: string): boolean {
    if (txt.match(this.img)) {
      return true;
    } else { return false }
  }

  getChatCliente(item: AllChatsWht){
    this.isLoading = true;
    this.dataChatCli = item;

    if (!this.idChat) {
      this.idChat = item.id;
    }
    this.Interval = this.funcSer.interval(5000).subscribe(() => {

      this.isChat = true;
      this.getData(this.idChat);

    });
  }


  public generarMult(msg: string): string {
    const Split = msg.split('.');
    const Ext = Split[Split.length - 1];
    if (Ext == 'oga' || Ext == 'oga') {
      return `<audio controls src="${msg}" type="audio/ogg"></audio>`;
    } else if (Ext == 'pdf') {
      return `<embed src="${msg}" width="98%" height="auto" type="application/${Ext}">`;
    } else if (Ext == 'jpeg' || Ext == 'jpg' || Ext == 'webp'|| Ext == 'ico' ) {
      return `<img src="${msg}" width="98%" height="auto" >`
    } else {
      return `<a href="${msg}" target="_blank" rel="noopener noreferrer">Click para Abrir!</a>`;
    }
  }

  getData(id: string){
    this.whatsApp.getWhatsappChatId(id).then(res => {
      this.funcSer.ordenarAny(res.messages, 'time', 'Desc');
      if (!this.chat) {
        this.chat = res;
      } else if (this.chat.messages.length != res.messages.length) {
        this.chat = res;
      }
      this.isLoading = false;
    });
  }

  enviarMsg(){
    let data = {
      body: this.mensaje
    }
    if (this.mensaje.length > 0) {
      this.whatsApp.postWhatsappChatIdText(this.idChat, data).then(res => {
        this.mensaje = '';
        this.getData(this.idChat);
      });
    }
  }



  handlerImg64(ev: Event ): void{
    const target = ev.currentTarget as HTMLInputElement;
    if (target) {
      const type = target.files[0].type;
      const archivo = target.files[0];
      if (type && type.match(this.tiposPerm)) {
        this.funcSer.base64(archivo).then((img) => {
          let data = {
            body: img.base,
            filename: img.blob.name,
          }
          this.whatsApp.postWhatsappChatIdText(this.idChat, data);
        });
      } else {
        this.funcSer.showSweetWarning('ERROR!', 'Documento no Permitido', 2000);
      }
    }
  }

}
