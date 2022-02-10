import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { FuncionesComunesService } from '../services/funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {

  constructor(private functC: FuncionesComunesService,
              private router: Router) {}

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    const jwtP =  this.functC.parseJwt(token);
    if (jwtP) {
      if ( jwtP.data.nivel >= '3' || jwtP.data.nombre_departamento == 'Monitoreo' ) {
        localStorage.removeItem('change');
        return true;
      } else if (jwtP.data.id == '32') {// id de paula
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

