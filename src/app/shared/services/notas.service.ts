import { EventEmitter, Injectable } from '@angular/core';
import { DataNotas, ErrorHttp, RespNotas } from '../models/otros.model';
import { RespUser } from '../models/usuario.model';
import { AuthService } from './auth.service';
import { CitasService } from './citas.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import Swal from 'sweetalert2';
import { AgentesService } from './agentes.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  /**
   * Emite el Data nota
   */
  dataNotasE$ = new EventEmitter<Partial<RespNotas[]> | null>();

  idCliente: string;

  constructor(private httpSer: AuthService,
              private funcSer: FuncionesComunesService,
              private AgentSer: AgentesService,
              private CitasSer: CitasService){}

  public sendNotas(id: string, data: DataNotas): boolean{
    let res: boolean = false;
    const E$1 = this.httpSer.postNotas(id, data).subscribe(r => {
      if (r['id']) {
        this.getNotasC(id);
        this.funcSer.showSweetSuccess('OK!','Guardado correcto',1200);
        res = true;
      }
      E$1.unsubscribe();
    },(err: ErrorHttp)=> {
      if (err.status == 401) {
        this.funcSer.showSweetError('Error!','Sesión Vencida', 1500 );
      }
      E$1.unsubscribe();
    });
    return res;
  }

  sendNotas2 = async (id: string, data: DataNotas, opc: boolean = true) =>
  new Promise((resolve, reject) => {
    try {
      const E$2 =this.httpSer.postNotas(id, data).subscribe(r => {
      if (r['id']) {
        if (opc) {
          this.getNotasC(id);
          this.funcSer.showSweetSuccess('OK!','Guardado correcto',1200);
        }
        resolve('ok');
      }
      E$2.unsubscribe();
    },(err: ErrorHttp)=> {
      if (err.status == 401) {
        this.funcSer.showSweetError('Error!','Sesión Vencida', 1500 );
      }
      E$2.unsubscribe();
    });
    } catch (error) {
      reject(error)
    }
  })

  /**
   * Trae las notas del Cliente
   * @param id id Cliente
   */
  getNotasC(id: string): void{
    let agentes: RespUser[] = [];
    try {
      this.AgentSer.callAgentes()
      .then((ResAgent: RespUser[]) => {
        agentes = ResAgent;
        return ('ok')
      }).then(() => {

        let dataResp: RespNotas[] = [];
        const E$3 = this.httpSer.getNotasCliente(id).subscribe(

          (resp: RespNotas[]) => {
            dataResp = this.CitasSer.inyectarAgente(resp, agentes, 'id_user');
            this.ordenar(dataResp);
            dataResp.forEach(n => n.nota = this.limpiarNota(n.nota));
            this.dataNotasE$.emit(dataResp);
            E$3.unsubscribe();
          },(err: ErrorHttp)=> {
            if (err.status == 401) {
              this.funcSer.showSweetError('Error!','Sesión Vencida', 1500 );
            }
            E$3.unsubscribe();
          }

        );
      });
    } catch (err) {
      this.dataNotasE$.emit(null);
      this.funcSer.logWarn('Error Get Notas', err)
    }
  }

  editNota = async (id: string,id_cli:string, data: DataNotas) =>
  new Promise((resolve, reject) => {
    try {
      const E$1 = this.httpSer.editNotasCliente(id, data).subscribe( r => {
        if (r) {
          this.getNotasC(id_cli);
          this.funcSer.showSweetSuccess('OK', 'Nota Actualizada', 1500 );
          E$1.unsubscribe();
          resolve(r);
        }
      });
    } catch (err) {
      this.funcSer.showSweetError('ERROR', `${err}`, 2000);
      reject(err);
    }
  })

  delNota = async (id: string,id_cli:string) =>
  new Promise((resolve, reject) => {
    try {
      const E$2 = this.httpSer.deleteNotas(id).subscribe( r => {
        if (r) {
          this.getNotasC(id_cli);
          this.funcSer.showSweetSuccess('OK', 'Eliminada', 1500 );
          E$2.unsubscribe();
          resolve(r);
        }
      });
    } catch (err) {
      this.funcSer.showSweetError('ERROR', `${err}`, 2000);
      reject(err);
    }
  })

  private ordenar(notas: RespNotas[]) {
    notas.sort(function (a, b) {
      if (a.fecha_llamada < b.fecha_llamada) {
        return 1;
      }
      if (a.fecha_llamada > b.fecha_llamada) {
        return -1;
      }
      return 0;
    });
  }

  clearEmit(){
    this.dataNotasE$.emit(null);
  }

  private limpiarNota(val: any){
    let edi = String(val);
    edi = edi.replace('SafeValue must use [property]=binding:', '');
    edi = edi.replace('(see https://g.co/ng/security#xss)', '');
    return edi
  }



}
