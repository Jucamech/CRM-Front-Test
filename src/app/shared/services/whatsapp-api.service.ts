import { Injectable } from '@angular/core';
import { AllChatsWht, DataChatClient, GetMsgWhatsApp, MsgFileWhastapp, MsgWhastapp } from '../models/whatsapp.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})

export class WhatsappApiService {

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService) { }

  ///////////////////////////////////////////////////////////////////
  /////////////// ↓↓↓ METODOS PARA REPORTAR CITAS ↓↓↓ ///////////////


  async postWhatsappCita(data){
    new Promise<boolean>((resolve, reject) => {
      try {
        const E$1 = this.httpSer.postMsgWhatsapp(data).subscribe(() => {
          // console.log(data);
          resolve(true);
          E$1.unsubscribe();
        }, err => {
          E$1.unsubscribe();
          this.funcSer.logWarn('Error en post report Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en post catch Whatsapp', err);
        reject(err);
      }
    });
  }

  async reportandoASuperV(body: string){
    const SuperV = ['573225116095', '573016311418', '573148418455', '573207388072'];
    for await (const s of SuperV) {
      this.postWhatsappCita({phone: s, body});
    }
  }

  /////////////// ↑↑↑ METODOS PARA REPORTAR CITAS ↑↑↑ ///////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////↓↓↓ METODOS PARA CHAT DE WHATSAPP ↓↓↓///////////////

  /**
   * Postea los mensajes para whatsapp
   * @param id del cliente en la base de datos
   * @param data los datos son de tipo mensaje o data:Base64 en el parametro adicional de "filename"
   */
  async postWhatsapp(id: string, data: MsgFileWhastapp | MsgWhastapp ){
    new Promise<boolean>((resolve, reject) => {
      try {
        const E$2 = this.httpSer.postMsgfileWhatsapp(id, data).subscribe(() => {
          resolve(true);
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          this.funcSer.logWarn('Error en post mensajes Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en post catch Whatsapp', err);
        reject(err);
      }
    });
  }

  async getChatWhatsapp(id: string){
    new Promise<GetMsgWhatsApp>((resolve, reject) => {
      try {
        const E$2 = this.httpSer.getChatsWhatsapp(id).subscribe((res: GetMsgWhatsApp) => {
          resolve(res);
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          this.funcSer.logWarn('Error en get chats Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en get catch Whatsapp', err);
        reject(err);
      }
    });
  }

  async getAllChatWhatsapp(){
    return new Promise<AllChatsWht[]>((resolve, reject) => {
      try {
        const E$2 = this.httpSer.getAllChatsWhatsapp().subscribe((res: AllChatsWht[]) => {
          resolve(res);
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          this.funcSer.logWarn('Error en get all chats Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en get all chats catch Whatsapp', err);
        reject(err);
      }
    });
  }

  ///////////////↑↑↑ METODOS PARA CHAT DE WHATSAPP ↑↑↑///////////////
  ///////////////////////////////////////////////////////////////////

   /**
   * Postea los mensajes para whatsapp
   * @param id del chat whatsapp
   * @param data los datos son de tipo mensaje o data:Base64 en el parametro adicional de "filename"
   */
  async postWhatsappChatIdText(id: string, data ){
      return new Promise((resolve, reject) => {
      try {
        const E$2 = this.httpSer.postMsgWhatsapp2(id, data).subscribe((res) => {
          resolve(res);
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          this.funcSer.logWarn('Error en post mensajes Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en post catch Whatsapp', err);
        reject(err);
      }
    });
  }
   /**
   * Postea los mensajes para whatsapp
   * @param id del chat whatsapp
   * @param data los datos son de tipo mensaje o data:Base64 en el parametro adicional de "filename"
   */
  async postWhatsappChatId(id: string, data ){
      return new Promise((resolve, reject) => {
      try {
        const E$2 = this.httpSer.postMsgfileWhatsapp(id, data).subscribe((res) => {
          resolve(res);
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          this.funcSer.logWarn('Error en post mensajes Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en post catch Whatsapp', err);
        reject(err);
      }
    });
  }

  /**
   * Trae los mensajes del cliente para el telefono
   * @param id id del chat whatsapp
   */
  async getWhatsappChatId(id: string){
    return new Promise<DataChatClient>((resolve, reject) => {
      try {
        const E$2 = this.httpSer.getWhatsappChatId(id).subscribe((res: DataChatClient) => {
          resolve(res);
          E$2.unsubscribe();
        }, err => {
          E$2.unsubscribe();
          this.funcSer.logWarn('Error en get chats Whatsapp', err);
          reject(false);
        })
      } catch (err) {
        this.funcSer.logWarn('Error en get catch Whatsapp', err);
        reject(err);
      }
    });
  }

}
