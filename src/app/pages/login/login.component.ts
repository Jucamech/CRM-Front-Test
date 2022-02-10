import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RespUser, UsuarioModel } from '../../shared/models/usuario.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';
import { DestroyerService } from './destroyer.service';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() autenticarEvent = new EventEmitter<boolean>();
  usuario: UsuarioModel = {
    nombre : '',
    password: ''
  };

  constructor(private auth: AuthService,
              private router: Router,
              private funcSer: FuncionesComunesService,
              private Stalker: RastreadorAgentesService,
              private Destroyer: DestroyerService,
              private CallSer: LlamadasService)
  {
    if (this.auth.userLogin) {
      this.router.navigateByUrl('/home');
    } else {
      this.usuario.nombre = ''
    }
  }

  ngOnInit(): void {
    this.Destroyer.killAll();
    let pend = localStorage.getItem('013800ce');
    this.usuario = new UsuarioModel();
    localStorage.clear();
    this.CallSer.id_cli
    if (pend && pend.length > 8) {
      localStorage.setItem('013800ce', pend);
    }
  }

  Autenticar(form: NgForm): void {
    let data: UsuarioModel = {
      user: this.usuario.user,
      password: this.funcSer.enCrypt(this.usuario.password)
    }
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Autenticando',
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
      timer: 1500
    });
    Swal.showLoading();
    this.auth.login(data).subscribe((resp: RespUser) => {
      if (resp['token']) {
        const Key_login = this.Stalker.generarKey();
        localStorage.setItem('ee743bdd' ,Key_login );
        let obli = localStorage.getItem('013800ce');
        const Token = this.funcSer.parseJwt(resp['token']);
        this.auth.guardarLogin(resp['token']);
        this.auth.userResp = resp;
        //this.Stalker.sentStatus(Key_login, `${Token.data.nombre} ${Token.data.apellido}`, Token.data.id );
        Swal.fire({
          title: 'Autenticado',
          allowOutsideClick: false,
          icon: 'success',
          text: 'Autenticación correcta',
          showConfirmButton: false,
          timer: 1000
        });
        if (obli) {
          let obleng = obli.length;
          const id = obli.slice(3, obleng - 5);
          this.router.navigateByUrl(`/llamarcliente/${id}`);
        } else {
          this.router.navigateByUrl('/home');
        }

      }
    }, err => {
      Swal.fire({
        title: 'Fallo',
        icon: 'error',
        text: 'Usuario o contraseña incorrecta',
      });
      this.usuario.nombre = '';
      this.usuario.password = '';
    });
  }
}
