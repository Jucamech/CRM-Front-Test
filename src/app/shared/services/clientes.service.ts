import { EventEmitter, Injectable } from '@angular/core';
import { ErrorHttp } from '../models/otros.model';
import { ClienteModelGen, ClientModel } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import { Subscription } from 'rxjs';

export interface RespTelCli {
  id: string;
  nombres: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  ClientEmit$ = new EventEmitter<ClientModel>();

  clientes: ClienteModelGen[];
  /**SUBSCRIPTION */
  getCli: Subscription;
  /**SUBSCRIPTION */
  patchCli: Subscription;

  oldData: string;

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService) { }

  destruirObserversClient(){
    this.getCli ? this.getCli.unsubscribe(): this.getCli = null;
    this.patchCli ? this.patchCli.unsubscribe(): this.patchCli;
  }

  /**
   * Get para los clientes
   * @returns la lista de clientes siempre actualizada
   */
  callclientes = async () =>
  new Promise< ClienteModelGen[]>((resolve, reject) => {
    try {

      if (this.clientes) {
        resolve(this.clientes)
      } else {
        this.clientes = [];
        const E$x = this.httpSer.getClientes().subscribe(
          resp => {
            for (const key in resp) {
              const el = resp[key];
              this.clientes.push(el);
            };
            resolve(this.clientes);
            E$x.unsubscribe();

          },(err: ErrorHttp)=> {

            reject(err);
            E$x.unsubscribe();
            if (err.status == 401) {
              this.funcSer.showSweetError('Error!', 'Sesión Vencida', 1500);
            }
          }
        )
      }
    } catch (error) {
      reject(error);
    }
  });

  getIdCliente = async (tel: string) =>
  new Promise<RespTelCli[]>((resolve, reject) => {
    try {
      tel = String(tel)
      let data:RespTelCli[] = [];
      if (tel.length == 10 ) {
        const E$x = this.httpSer.getIdCliente(tel).subscribe((r: RespTelCli) => {
          for (const key in r) {
            const el = r[key];
            data.push(el)
          }
          if (!data[0]) {
            this.funcSer.showSweetError('Error!','El Número no Existe!', 1500);
          }
          E$x.unsubscribe();
          resolve (data);
        })
      } else {
        this.funcSer.showSweetError('Error!','El Número no es Válido!', 2000);
      }
    } catch (error) {
      this.funcSer.logWarn('Error Catch', error );
      reject (error);
    }
  });

  getCliente = async (id: string) => {
    return new Promise<ClientModel>((resolve, reject) => {
      try {
        this.getCli = this.httpSer.getCliente(id).subscribe((res: ClientModel) => {
          if (res) {
            this.ClientEmit$.emit(res);
            resolve(res);
          }
        }, err => {
          this.funcSer.showSweetError('Error!', 'Revisa Sesión', 2500);
          reject(err);
        });
      } catch (err) {
        this.funcSer.logWarn('Error Catch', err );
        reject(err);
      }
    });
  }

  /**
   * Editor de data de cliente
   * @param id cliente ID
   * @param data data para actualizar
   */
  pacthCliente(id: string, data: Partial<ClientModel>){
    this.patchCli = this.httpSer.pacthCliente( data, id ).subscribe((res) => {
      if (res) {
        this.funcSer.showSweetSuccess('Guardado', 'Guardado correcto', 1000);
        this.getCliente(id);
      }
    });
  }
  /**
   * Editor de data de cliente
   * @param id cliente ID
   * @param data data para actualizar
   */
  async pacthCliente2(id: string, data: ClienteModelGen){
    const x = this.httpSer.pacthCliente( data, id ).subscribe((res) => {
      if (res) {
        x.unsubscribe();
        this.getCliente(id);
        Promise.resolve();
      }
    }, err => {
      Promise.reject();
      x.unsubscribe();
    });
  }

}
