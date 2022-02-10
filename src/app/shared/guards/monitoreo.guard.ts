import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FuncionesComunesService } from '../services/funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoGuard implements CanActivate {

  constructor(private functC: FuncionesComunesService,
              private router: Router) { }

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    const jwtP = this.functC.parseJwt(token);
    if (jwtP) {
      if (jwtP.data.nombre_departamento == 'Monitoreo' || jwtP.data.nivel >= '2') {
        return true;
      } else {
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
