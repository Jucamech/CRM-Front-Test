import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as CryptoJS from 'node_modules/crypto-js';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-perfil',
  templateUrl: './info-perfil.component.html',
  styleUrls: ['./info-perfil.component.css']
})
export class InfoPerfilComponent implements OnInit, OnChanges {
  @Input() togglePerfil: boolean;

  error: boolean

  old_passwd: string;
  new_passwd: string;
  conf_passwd: string;
  togglee: boolean = false;

  buton: boolean = true;



  constructor(private httpSer: AuthService,
    private router: Router) { }

  toggle() {
    this.togglee = !this.togglee;
    if (this.togglee)
      this.buton = false;
    else
      this.buton = true;
  }

  ngOnChanges(c: SimpleChanges): void {
    if (c.togglePerfil.currentValue) {
      this.togglePerfil = true;
    }
  }

  ngOnInit(): void {
  }


  cambiarPass() {
    if (this.conf_passwd == this.new_passwd) {
      this.error = false;
      let data = {
        new_passwd: CryptoJS.SHA256(this.new_passwd).toString(),
        old_passwd: CryptoJS.SHA256(this.old_passwd).toString()
      }
      this.httpSer.cambiarPass(data).subscribe(
        res => {
          this.router.navigateByUrl('/login');
          Swal.fire({
            title: 'Contraseña Guardada',
            allowOutsideClick: false,
            icon: 'success',
            text: '',
            showConfirmButton: false,
            timer: 1000
          }).finally(() => {

            this.router.navigate(['/login']);
            this.router.navigateByUrl('/login');
          });
          this.router.navigateByUrl('/login');
          this.router.navigate(['login']);
        }, err => {
          Swal.fire({
            title: 'FALLO!',
            icon: 'error',
            text: 'error :' + err.status,
            timer: 2000
          });
        }
      )
    } else {
      this.error = true;
    }
  }

  cerrar() {
    this.togglee = false;

  }
}
