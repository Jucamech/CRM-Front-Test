import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { LlamadasService } from '../services/llamadas.service';

@Injectable({
  providedIn: 'root'
})
export class PendienteNotaGuard implements CanActivate {

  constructor(private CallSer: LlamadasService,
              private router: Router,){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let obli = localStorage.getItem('013800ce');
    let id = localStorage.getItem('change');
    let callSal = this.CallSer.id_saliente;
    if (obli) {
      if (obli == 'null' ) {
        localStorage.removeItem('013800ce');
        return true;
      }else if (callSal){
        Swal.fire({
          title: 'ERROR',
          allowOutsideClick: false,
          icon: 'warning',
          text: `Cuelga la LLamada y deja NOTA!`,
          showConfirmButton: false,
          timer: 2000
        });
        return false;
      } else {
        Swal.fire({
          title: 'ERROR',
          allowOutsideClick: false,
          icon: 'warning',
          text: `Se ha quedado una nota Pendiente!`,
          showConfirmButton: false,
          timer: 3000
        });
      }
      return false;
    } else if (id) {
      Swal.fire({
        title: 'ERROR',
        allowOutsideClick: false,
        icon: 'warning',
        text: `Cuelga la LLamada y deja NOTA!`,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl(`/vercliente/${id}`);
      return true;
    }
    return true;
  }

}
