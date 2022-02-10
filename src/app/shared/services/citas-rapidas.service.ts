import { Injectable } from '@angular/core';
import { RespCitas } from '../models/usuario.model';
import { CitasService } from './citas.service';
import { FuncionesComunesService } from './funciones-comunes.service';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CitasRapidasService {

  citaRapida: RespCitas;
  citaRapida2: RespCitas;

  constructor(private citasServ: CitasService,
              private functC: FuncionesComunesService,
              private httpSer: AuthService,
              private router: Router) { }

  /**
 * Dispara la alarma de llamada inmediata
 * @param data RespCitas[]
 */
  shotAlertaInmediata(data: RespCitas[]){
    const now = new Date();
    let asig = localStorage.getItem('id_agente');
    let ahora = `${this.functC.getFecha()} ${this.functC.getAhora(now)}`;
    try {
      data.forEach(cita => {

        if ( cita.estado == '17' && cita.id_asignado == asig ) {
          this.citasServ.Cita$.emit(cita);
          Swal.fire({
            title: 'LLAMADA ASIGNADA!',
            text: `Llamar a ${cita.nombres} ${cita.apellidos}-${cita.notas}`,
            icon: 'warning',
            confirmButtonText: 'OK!',
          }).then(() => {
            let horaP = ` ${this.functC.addMinToDate(cita.fecha_creacion, 3)}`;
            if (horaP > ahora) {
              this.functC.showSweetError('Fallo!','Cita ya perdida', 3000);
            } else {

              let x = {
                estado : '19',
              }
              const E$1 = this.httpSer.putCita(cita.id ,x).subscribe(() => {
                  const url = this.router.createUrlTree(['/vercliente', cita.id_cliente])
                  window.open(url.toString(), '_blank');
                  //this.router.navigateByUrl(`/vercliente/${cita.id_cliente}`)
                  this.functC.showSweetSuccess('OK','',1200);
                  E$1.unsubscribe();
                }, err => {
                  E$1.unsubscribe();
                  this.functC.showSweetError('Fallo!',`${err}` , 3000);
              });
            }
          });
        }
      });
    } catch (error) {
      this.functC.logWarn('err',error);
    }
  }


}
