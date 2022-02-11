import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ESTADOS, STATUS } from 'src/app/shared/constants/clientes';
import { LlamadasResp } from 'src/app/shared/models/otros.model';
import { ClientModel, RespPago, RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';
import { PagosCobrosService } from 'src/app/shared/services/pagos-cobros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  @Output() enviarForm = new EventEmitter<Partial<ClientModel>>();
  @Output() dataCliH = new EventEmitter<Object>();
  @Input() formuPostClient: Partial<ClientModel>;
  @Input() no_admin = true;
  usuariosList: Array<RespUser>;
  bloq: number = 0;
  statusImp = STATUS;
  estados = ESTADOS;

  dataX: Partial<ClientModel>;
  dataEmit = { id: '', nombres: '' };

  dataCliente: any;
  clienteS: ClientModel;
  TipoPeticion: number;
  validBtn: boolean;
  spinner = true;


  modal: boolean;

  asignado: number;

  id: string;
  nombres: string = '';
  apellidos: string = '';
  telmovil: string;
  telcasa: string;
  teltrabajo: string;
  telotro: string;
  zipcode: number;
  ciudad: string;
  estado: string;
  direccion: string;
  creadopor: number;
  fecha_creacion: string;
  email: string;
  email2: string;
  nacimiento: string;
  status: string;
  valor_inscripcion: number = 0;
  plan_mes: number = 0;
  valor_mensualidad: number = 0;
  ocupacion: string;
  fechas_pagos_inscripcion: [];
  apartamento: string;
  cuotas_inscripcion: number;
  nota_plan_inscripcion: string;
  problemas_credito: string;

  fecha_inicio: string;

  tel_wh_ok: string;

  v0: number = 0;
  v1: number = 0;
  v2: number = 0;
  v3: number = 0;
  v4: number = 0;
  v5: number = 0;
  v6: number = 0;
  v7: number = 0;
  v8: number = 0;
  v9: number = 0;

  f0: string = '';
  f1: string = '';
  f2: string = '';
  f3: string = '';
  f4: string = '';
  f5: string = '';
  f6: string = '';
  f7: string = '';
  f8: string = '';
  f9: string = '';

  E$: Subscription[] = [];
  copia: ClientModel;
  horarios_duerme: any;
  dataPagos: RespPago[];
  llamadas: LlamadasResp[];
  llamadaSal: LlamadasResp;
  llamadaEnt: LlamadasResp;


  constructor(private httpServ: AuthService,
              private router: Router,
              private clientSer: ClientesService,
              private funcSer: FuncionesComunesService,
              private callSer: LlamadasPerdidasService,
              private Pay: PagosCobrosService,
              private AgenteSer: AgentesService,
              private activateRoute: ActivatedRoute)
  {
    this.dataCliente = httpServ.idC || activateRoute.snapshot.params['id'];
    this.modal = false;

  }

  ngOnInit(): void {
    this.TipoPeticion = this.httpServ.TipoPet;
    let idp = this.activateRoute.snapshot.params.id;
    this.callUser();
    if (!this.TipoPeticion && !this.clienteS) {
      this.getCliente(idp);
      this.dataCliH.emit(this.dataEmit);
      this.getDataPagos();
      this.getLLamadas();
    } else if (this.TipoPeticion == 1) {
      this.spinner = false;
      this.completarDataForm();
    }
  }

  getDataPagos(){
    this.Pay.CallDataCli(this.dataCliente)
    .then(res => {
      this.dataPagos = res[1];
    })
  }


  getLLamadas(): void{
    this.callSer.getLLamadasCliente(this.dataCliente).then((res) => {
      res.forEach(ll => {
        if (!this.llamadaSal && ll.origen.length == 3) {
          this.llamadaSal = ll;
        } else if (!this.llamadaEnt && ll.origen.length == 7) {
          this.llamadaEnt = ll;
        }
      })
    });
  }


  /** Inyecta la data devuelve ver Cliente */
  private completarDataForm(): void{
    if (this.formuPostClient) {
      this.nombres = this.formuPostClient.nombres ? this.formuPostClient.nombres : '';
      this.apellidos = this.formuPostClient.apellidos ? this.formuPostClient.apellidos : ''
      this.telmovil = this.formuPostClient.telmovil ? this.formuPostClient.telmovil : '';
      this.telcasa = this.formuPostClient.telcasa ? this.formuPostClient.telcasa : '';
      this.teltrabajo = this.formuPostClient.teltrabajo ? this.formuPostClient.teltrabajo : '';
      this.telotro = this.formuPostClient.telotro ? this.formuPostClient.telotro : '';
      this.asignado = Number(this.formuPostClient.asignado ? this.formuPostClient.asignado : 0);
      this.zipcode = this.formuPostClient.zipcode ? this.formuPostClient.zipcode : 0;
      this.ciudad = this.formuPostClient.ciudad ? this.formuPostClient.ciudad : '';
      this.estado = this.formuPostClient.estado ? this.formuPostClient.estado : '';
      this.direccion = this.formuPostClient.direccion ? this.formuPostClient.direccion : '';
      this.creadopor = this.formuPostClient.creadopor ? this.formuPostClient.creadopor : null;
      this.email = this.formuPostClient.email ? this.formuPostClient.email : '';
      this.email2 = this.formuPostClient.email2 ? this.formuPostClient.email2 : '';
      this.nacimiento = this.formuPostClient.nacimiento ? this.formuPostClient.nacimiento : '0000-00-00';
      this.fecha_inicio = this.formuPostClient.fecha_inicio ? this.formuPostClient.fecha_inicio : '0000-00-00';
      this.status = this.formuPostClient.status ? this.formuPostClient.status : '';
      this.ocupacion = this.formuPostClient.ocupacion ? this.formuPostClient.ocupacion : '';
      this.plan_mes = Number(this.formuPostClient.plan_mes ? this.formuPostClient.plan_mes : 0);
      this.valor_mensualidad = Number(this.formuPostClient.valor_mensualidad ? this.formuPostClient.valor_mensualidad : 0);
      this.valor_inscripcion = Number(this.formuPostClient.valor_inscripcion ? this.formuPostClient.valor_inscripcion : 0);

      this.nota_plan_inscripcion = this.formuPostClient.campos_adicionales.nota_plan_inscripcion ? this.formuPostClient.campos_adicionales.nota_plan_inscripcion : '';
      this.cuotas_inscripcion = this.formuPostClient.campos_adicionales.cuotas_inscripcion ? this.formuPostClient.campos_adicionales.cuotas_inscripcion : 0;
      this.estado = this.formuPostClient.estado ? this.formuPostClient.estado : '';
      this.apartamento = this.formuPostClient.campos_adicionales.apartamento ? this.formuPostClient.campos_adicionales.apartamento : '';

      this.v0 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v0;
      this.v1 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v1;
      this.v2 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v2;
      this.v3 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v3;
      this.v4 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v4;
      this.v5 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v5;
      this.v6 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v6;
      this.v7 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v7;
      this.v8 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v8;
      this.v9 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.v9;

      this.f0 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f0;
      this.f1 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f1;
      this.f2 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f2;
      this.f3 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f3;
      this.f4 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f4;
      this.f5 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f5;
      this.f6 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f6;
      this.f7 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f7;
      this.f8 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f8;
      this.f9 = this.formuPostClient.campos_adicionales.fechas_pagos_inscripcion.f9;
    }
  }

  private getCliente(id: string):void {
    this.clientSer.getCliente(id).then(( res: ClientModel ) => {
      this.inyectarData(res);
      this.bloq = 0;
      this.sendCliente();
      this.copia = res;
      this.horarios_duerme = res.horaduerme;
    });
    const E$X = this.clientSer.ClientEmit$.subscribe(res => {
      this.inyectarData(res);
      this.copia = res;
      this.bloq = 0;
      this.sendCliente();
      this.no_admin = !this.funcSer.generarPermisosAdmin();
    })
    this.E$.push(E$X)
  }

  cerrarForm(): void {
    this.router.navigateByUrl(('consultarcliente'));
  }

  edit(){
    Swal.fire({
      title: 'Login',
      html: `<input type="password" id="user"  class="swal2-input" placeholder="Usuario">
      <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
      confirmButtonText: 'Enviar',
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#user')
        const password = Swal.getPopup().querySelector('#password')
        if (!login || !password) {
          Swal.showValidationMessage(`Ingresa el Usuario y la contraseña`)
        }
        return { login: login, password: password }
      }
    }).then((result) => {
      let user = result.value.login['value'];
      let password = this.funcSer.enCrypt( result.value.password['value'] );
      const E$l = this.httpServ.login({ user, password }).subscribe(res => {
        if (res['token']) {
          const Token = this.funcSer.parseJwt(res['token']);
          this.funcSer.log('token', Token );
          if (Token.data.nivel > 3 ) {
            this.no_admin = false;
            this.funcSer.showSweetSuccess('Ok!', 'Editor Activo', 1300);
            let idSuper = localStorage.getItem('id_agente');
            if (idSuper == '134' || '45' ) {
              this.copia = null;
            }
          } else {
            this.funcSer.showSweetWarning('Error!','nivel insuficiente!', 2500);
          }
        } else {
          this.funcSer.showSweetWarning('Error!','Verifica Usuario y Pass', 2500);
        }
        E$l.unsubscribe();
      });

      /* Swal.fire(`
        Login: ${result.value.login}
        Password: ${result.value.password}
      `.trim()) */
    });
  }

  /** Organiza y emite la informacion hacia ver Cliente */
  sendCliente(): void{
    this.dataX = {
      asignado: this.asignado,
      nombres: this.nombres,
      apellidos: this.apellidos,
      telmovil: this.telmovil,
      telcasa: this.telcasa,
      teltrabajo: this.teltrabajo,
      telotro: this.telotro,
      zipcode: Number(this.zipcode) | 0,
      ciudad: this.ciudad,
      direccion: this.direccion,
      email: this.email,
      email2: this.email2,
      nacimiento: this.nacimiento? this.nacimiento: '2000-01-01',
      fecha_inicio: this.fecha_inicio,
      status: this.status,
      valor_inscripcion: Number(this.valor_inscripcion),
      plan_mes: this.plan_mes? this.plan_mes: 0,
      valor_mensualidad: Number(this.valor_mensualidad),
      ocupacion: this.ocupacion,
      estado: this.estado,
      campos_adicionales: {
        fechas_pagos_inscripcion: {
          v0: this.v0, f0: this.f0,
          v1: this.v1, f1: this.f1,
          v2: this.v2, f2: this.f2,
          v3: this.v3, f3: this.f3,
          v4: this.v4, f4: this.f4,
          v5: this.v5, f5: this.f5,
          v6: this.v6, f6: this.f6,
          v7: this.v7, f7: this.f7,
          v8: this.v8, f8: this.f8,
          v9: this.v9, f9: this.f9
        },
        apartamento: this.apartamento? this.apartamento: '',
        cuotas_inscripcion: Number(this.cuotas_inscripcion),
        nota_plan_inscripcion: this.nota_plan_inscripcion,
        problemas_credito: this.problemas_credito
      }
    }
    if (this.no_admin) {
      delete this.dataX.telcasa;
      delete this.dataX.telmovil;
      delete this.dataX.teltrabajo;
      delete this.dataX.telotro;
    }
    this.funcSer.log('data x',this.dataX);

    this.enviarForm.emit(this.dataX);
  }

  private callUser(): void{
    this.usuariosList = []
    this.AgenteSer.callAgentes().then(
      res => {
        this.usuariosList = this.AgenteSer.filtrarAgentesconExt(res);
      }
    )
  }

  call(){
    let nota = this.clienteS.nota_cli ? this.clienteS.nota_cli : 'No Hay Nota';
    let tittle = 'CONFIRMAR';
    let html = `
    <b><h1> ↓↓↓ Nota ↓↓↓ </h1></b>
    <br>
    <p>
      <b style="color:red">${ nota }</b>
    </p>
    `;
    this.funcSer.showSweetHTML(tittle, html, 'Siguiente').then((r) => {
      if (r) {
        if (this.clienteS.campos_adicionales) {
          this.mostrarHorarios();
        }else {
          this.funcSer.showSweetWarning('Datos Faltantes', 'Corrige los Datos con el Boton de Guardar', 4000);
        }
      }
    });
  }

  mostrarHorarios(){
    let x = '',z = '<b><h2>Ultimas Llamadas</h2></b>';
    if (this.llamadaSal) {
      z += `<p >
              <b style="color:green">Fecha :</b>
              <span>${this.llamadaSal.fecha} /<b style="color:green">Origen:</b> ${this.llamadaSal.origen}</span>
            </p>`
    } if (this.llamadaEnt) {
      z += `<p >
              <b style="color:green">Fecha:</b>
              <span>${this.llamadaEnt.fecha} /<b style="color:green">Origen:</b> ${this.llamadaEnt.origen}</span>
            </p>`
    } if (this.dataPagos && this.dataPagos[0]) {
        let f1 = '',va = 0;
        f1 = this.dataPagos[0].fecha_pago ? this.dataPagos[0].fecha_pago: 'No Hay Dato';
        va = this.dataPagos[0].valor ? this.dataPagos[0].valor: 0 ;
        x = `
        <b><h2>Ultimo Pago</h2></b>
        <p >
          <b style="color:green">Fecha :</b>
          <span>${f1}</span>
          <br>
          <b style="color:green">Valor :</b>
          <span>$ ${va || 'No Hay Dato' }</span>
        </p>   `
      }
    let llamarTrabajo;
    if (this.clienteS.campos_adicionales.call_trabajo) {
      llamarTrabajo = this.clienteS.campos_adicionales.call_trabajo == '1'? 'Si se puede': 'No se puede' ;
    } else {
      llamarTrabajo = 'No Hay Dato';
    }
    let horaLL = this.clienteS.campos_adicionales.mejor_hora_llamar ? this.funcSer.transformHora(this.clienteS.campos_adicionales.mejor_hora_llamar) : '';
    let horaD = this.clienteS.horaduerme ? this.funcSer.transformHora(this.clienteS.horaduerme) : '';
    let tittle = 'CONFIRMAR';
    let html = `${z} ${x}
      </p>
        <hr>
        <b><h2>Horarios</h2></b>
        <p >
          <b style="color:green">Mejor hora para LLamar :</b>
          <br>
          <span>${ horaLL || 'No Hay Dato'}</span>
        </p>
        <p >
          <b style="color:red">Hora Duerme :</b>
          <br>
          <span>${ horaD || 'No Hay Dato'}</span>
        </p>
        <p >
          <b style="color:#ffc107">Hora de Trabajo :</b>
          <br>
          <span>${this.clienteS.horariotrabajo || 'No Hay Dato'}</span>
        </p>
        <p >
          <b style="color:#1bf14c">Acepta LLamadas al Trabajar :</b>
          <br>
          <span>${llamarTrabajo}</span>
        </p>
    `;
    this.funcSer.showSweetHTML(tittle, html, 'Siguiente').then((r) => {
      if (r) {
        this.askAuthorization()
        //this.confirmAdmin()
        //this.funcSer.PermisoLLamar = true;
        //this.router.navigateByUrl(`llamarcliente/${this.id}`);
      }
    });
  }
  //Un usuario con nivel 4 debe de loguearse para poder continuar con la llamada
  confirmAdmin(){
    Swal.fire({
      title: 'Para continuar debe de iniciar sesión un administrador',
      icon: 'info',
      html: `<input type="text" id="user"  class="swal2-input" placeholder="Usuario">
      <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
      confirmButtonText: 'Iniciar sesión',
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#user')
        const password = Swal.getPopup().querySelector('#password')
        if (!login || !password) {
          Swal.showValidationMessage(`Ingresa el Usuario y la contraseña`)
        }
        return { login: login, password: password }
      }
    }).then((result) => {
      let user = result.value.login['value'];
      let password = this.funcSer.enCrypt( result.value.password['value'] );
      const E$l = this.httpServ.login({ user, password }).subscribe(res => {
        if (res['token']) {
          const Token = this.funcSer.parseJwt(res['token']);
          this.funcSer.log('token', Token );
          if (Token.data.nivel > 3 ) {
            this.no_admin = false;
            this.funcSer.showSweetSuccess('Ok!', 'Puede realizar la llamada', 1300);
            this.funcSer.PermisoLLamar = true;
            this.router.navigateByUrl(`llamarcliente/${this.id}`);
          } else {
            this.funcSer.showSweetWarning('Error!','Nivel insuficiente!', 2500);
          }
        } else {
          this.funcSer.showSweetWarning('Error!','Verifica usuario y contraseña', 2500);
        }
        E$l.unsubscribe();
      });
    });
  }
  //Se elige si se va a enviar un mensaje al admin o si el admin va a ir a loguearse personalmente
  askAuthorization(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Necesitas autorización de un administrador',
      text: "¿Qué acción deseas realizar?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Solicitar autorización',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmAdmin()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado!',
          text:'Espera mientras el administrador confirma tu mensaje. No te salgas de este mensaje, tomate un tinto mientras :)',
          confirmButtonText: 'Loguearse personalmente',
          showConfirmButton: true,
          timer: 300000
        })
      }
    })
  }

  crearNota(){
    let id = this.dataCliente;
    let notaOld = this.clienteS.nota_cli ? this.clienteS.nota_cli : 'No Hay Nota';
    Swal.fire({
      title: `Nota Anterior`,
      html: `
      <p>
        <b style="color:red">${ notaOld }</b>
      </p>
      <b><h3>Nota Nueva Nota</h3></b>
      `,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed && result.value ) {
        let nota: string = `${result.value}`;
        if (nota.length > 10 &&  nota.length < 200) {
          this.clientSer.pacthCliente(id, {nota_cli: nota});
        } else {
          this.funcSer.showSweetError('ERROR!', 'Debe tener al menos 10 caracteres y menos de 200', 2000);
        }
      }
    });
  }

  call_depreca(): void{
    Swal.fire({
      title: 'CONFIRMAR',
      text: `Confirmar llamada a: ${this.nombres} ${this.apellidos}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar',
    }).then((r) => {
      if (r.isConfirmed) {
        this.router.navigateByUrl(`llamarcliente/${this.id}`);
      }
    });
  }

  private inyectarData(res: ClientModel ):void{
    if (!res.campos_adicionales) {
      this.funcSer.showSweetX('Alerta! Faltan Datos', 'Se van a Corregir los datos faltantes Automaticamente', 'Ok');
    }
    this.clienteS = res;
    this.dataEmit.id = res.id;
    this.dataEmit.nombres = `${res.nombres} ${res.apellidos}`;
    this.id = this.clienteS.id ? this.clienteS.id : '';
    this.nombres = this.clienteS.nombres ? this.clienteS.nombres : '';
    this.apellidos = this.clienteS.apellidos ? this.clienteS.apellidos : '';
    this.telmovil = this.clienteS.telmovil ? this.clienteS.telmovil : '';
    this.telcasa = this.clienteS.telcasa ? this.clienteS.telcasa : '';
    this.teltrabajo = this.clienteS.teltrabajo ? this.clienteS.teltrabajo : '';
    this.telotro = this.clienteS.telotro ? this.clienteS.telotro : '';
    this.asignado = this.clienteS.asignado ? this.clienteS.asignado : 0;
    this.zipcode = this.clienteS.zipcode ? this.clienteS.zipcode : 0;
    this.ciudad = this.clienteS.ciudad ? this.clienteS.ciudad : '';
    this.estado = this.clienteS.estado ? this.clienteS.estado : '';
    this.direccion = this.clienteS.direccion ? this.clienteS.direccion : '';
    this.creadopor = this.clienteS.creadopor ? this.clienteS.creadopor : null;
    this.fecha_creacion = this.clienteS.fecha_creacion ? this.clienteS.fecha_creacion : '';
    this.email = this.clienteS.email ? this.clienteS.email : '';
    this.email2 = this.clienteS.email2 ? this.clienteS.email2 : '';
    this.nacimiento = this.clienteS.nacimiento ? this.clienteS.nacimiento : "0000-00-00";
    this.fecha_inicio = this.clienteS.fecha_inicio ? this.clienteS.fecha_inicio : "0000-00-00";
    this.status = this.clienteS.status ? this.clienteS.status : '';
    this.valor_inscripcion = Number(this.clienteS.valor_inscripcion ? this.clienteS.valor_inscripcion : 0);
    this.ocupacion = this.clienteS.ocupacion ? this.clienteS.ocupacion : '';
    this.plan_mes = Number(this.clienteS.plan_mes ? this.clienteS.plan_mes : 0);
    this.valor_mensualidad = Number(this.clienteS.valor_mensualidad ? this.clienteS.valor_mensualidad : 0);
    this.plan_mes = Number(this.clienteS.plan_mes ? this.clienteS.plan_mes : 0);
    this.valor_mensualidad = Number(this.clienteS.valor_mensualidad ? this.clienteS.valor_mensualidad : 0);
    this.estado = this.clienteS.estado ? this.clienteS.estado : '';

    this.tel_wh_ok = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.tel_wh_ok ?
                              this.clienteS.campos_adicionales.tel_wh_ok : '';

    this.cuotas_inscripcion = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.cuotas_inscripcion ?
                              this.clienteS.campos_adicionales.cuotas_inscripcion : 0;
    this.apartamento = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.apartamento ?
                        this.clienteS.campos_adicionales.apartamento : '';

    this.nota_plan_inscripcion = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.nota_plan_inscripcion ?
                        this.clienteS.campos_adicionales.nota_plan_inscripcion : '';

    this.problemas_credito = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.problemas_credito ?
                        this.clienteS.campos_adicionales.problemas_credito : '';


    this.v0 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v0: 0;
    this.v1 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v1: 0;
    this.v2 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v2: 0;
    this.v3 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v3: 0;
    this.v4 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v4: 0;
    this.v5 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v5: 0;
    this.v6 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v6: 0;
    this.v7 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v7: 0;
    this.v8 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v8: 0;
    this.v9 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.v9: 0;
/* ***************************************************************************************************************** */
    this.f0 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f0: '';
    this.f1 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f1: '';
    this.f2 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f2: '';
    this.f3 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f3: '';
    this.f4 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f4: '';
    this.f5 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f5: '';
    this.f6 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f6: '';
    this.f7 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f7: '';
    this.f8 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f8: '';
    this.f9 = this.clienteS.campos_adicionales && this.clienteS.campos_adicionales.fechas_pagos_inscripcion ?
              this.clienteS.campos_adicionales.fechas_pagos_inscripcion.f9: '';
  }
}
