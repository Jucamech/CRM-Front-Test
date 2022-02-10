import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RickM } from 'src/app/shared/models/otros.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit/* , OnChanges */ {

  togglePerfil: boolean;

  nombre: string;
  departamento: string;
  nivel: any;
  id: string;

  toggle: boolean = false
  ttBtn: string = 'Nueva Cita';

  emitida: RickM;

  whatsapp: boolean;
  isPau:boolean;
  isDal: boolean;

  constructor(private router: Router,
    private httpSer: AuthService,
    private functC: FuncionesComunesService) {
    this.togglePerfil = false;
  }

  ngOnInit(): void {
    let tk = localStorage.getItem('token')
    this.nombre = localStorage.getItem('nombre');
    this.departamento = localStorage.getItem('departamento');
    this.id = localStorage.getItem('id_agente');
    tk = this.functC.parseJwt(tk)
    this.nivel = tk['data']['nivel'];
    this.isPau = this.functC.generarPermisosUnicos('114');
    // this.isDal = this.functC.generarPermisosUnicos('12');
  }


  cerrarSesion() {
    Swal.fire({
      title: 'CERRANDO',
      text: `Desea Cerrar Sesión?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Atras',
    }).then((resultado) => {
      if (resultado.value) {
        let pend = localStorage.getItem('013800ce');
        if (pend) {
          //if (pend == 'null' || pend == null) {
          //  localStorage.removeItem('013800ce')
          //} else {
            Swal.fire({
              title: 'ERROR',
              allowOutsideClick: false,
              icon: 'warning',
              text: `Se ha quedado una nota Pendiente!`,
              showConfirmButton: false,
              timer: 2000
            });
          //}
        } else {
          localStorage.clear();
          this.httpSer.userLogin = false;
          this.router.navigateByUrl('/login');
        }
      }
    });
  }

  cambiarToggle() {
    this.toggle = !this.toggle
    if (this.toggle) {
      this.ttBtn = 'Ocultar Cita'
    } else {
      this.ttBtn = 'Nueva Cita'
    }
  }


  abrir() {
    this.togglePerfil = !this.togglePerfil;
  }
}
