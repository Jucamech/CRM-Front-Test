import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { FuncionesComunesService } from '../services/funciones-comunes.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  autenticacion: boolean;

  constructor(private auth: AuthService,
    private router: Router,
    private functC: FuncionesComunesService) { }

  canActivate(): boolean {
    this.autenticacion = this.auth.userLogin;
    let token = localStorage.getItem('token');
    const jwtP = this.functC.parseJwt(token);
    let now = Date.now();
    now = Number(now.toString().slice(0, -3));
    let toke: any;

    if (jwtP) {
      localStorage.setItem('departamento', jwtP.data.nombre_departamento);
      localStorage.setItem('id_agente', String(jwtP.data.id));
      localStorage.setItem('nombre', `${jwtP.data.nombre} ${jwtP.data.apellido}`);
      localStorage.setItem('ext', jwtP.data.ext);
      toke = Number(jwtP['exp']);

      if (now < toke) {

        this.autenticacion = true;

      } else {
        Swal.fire({
          title: 'Sesión Vencida',
          icon: 'error',
          text: 'Vuelva a iniciar su sesión!',
        });
        this.autenticacion = false;
        this.router.navigateByUrl('/login');
      }
    } else if (!this.autenticacion) {
      this.router.navigateByUrl('/login');
    };

    if (this.autenticacion) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}

