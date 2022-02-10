import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FuncionesComunesService } from '../services/funciones-comunes.service';

@Injectable({
  providedIn: 'root'
})
export class VentasGuard implements CanActivate {

  constructor(private functC: FuncionesComunesService,
              private router: Router) { }

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    const jwtP = this.functC.parseJwt(token);
    if (jwtP) {
      if (jwtP.data.nombre_departamento == 'Ventas' || jwtP.data.nivel > '2') {
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
