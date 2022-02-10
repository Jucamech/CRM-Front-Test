import { Component, OnInit } from '@angular/core';
import { AgenteData, AgentModel } from 'src/app/shared/models/otros.model';
import { citaPosp, ClientModel, RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {
  listClientes: Array<ClientModel>;
  citasHoy: Array<RespCitas>;
  usuariosList: Array<AgentModel>;
  usuariosList1: Array<AgentModel>;
  usuariosList2: Array<RespUser>;

  opcion: number = 1;
  opcionVer: number;

  modal: boolean = false;
  isAdmin: boolean;

  citaPost: citaPosp;
  id: string;

  nombre: string;
  apellidos: string;
  extension: string;
  dep: string;
  user: string;

  dataCitasTodas: RespCitas[];
  nivel: string;

  constructor(private http: AuthService,
              private AgenteSer: AgentesService,
              private funcSer: FuncionesComunesService,
              private citasServ: CitasService)
  {
    this.isAdmin = funcSer.generarPermisosAdmin();
  }

  ngOnInit(): void {
    this.AgenteSer.agentes$.subscribe(r => {
      this.usuariosList2 = r;
      this.getUsersPhone();
    })
    this.http.idC = '';
    this.getAgentes();
    this.getCitas();
    this.getAllClientes();
    this.getAllCitas();
  }

  getAllClientes() {
    this.http.getClientes().subscribe(
      res => {
        this.listClientes = [];
        for (const clave in res) {
          this.listClientes.push(res[clave]);
        }
      }
    );
  }

  getCitas() {
    this.citasServ.callCitas().then(
      (resp: Array<RespCitas>) => {
        this.citasHoy = resp;
      }
    )
  }

  getAgentes() {
    this.usuariosList2 = []
    this.AgenteSer.callAgentes().then(
      res => {
        this.usuariosList2 = res;
      }
    );
  }

  getUsersPhone() {
    this.AgenteSer.getUsersPhone().then(
      res => {
        this.usuariosList = res
      }
    )
  }

  nuevoAgente() {
    let ext_random = Math.random() * (9999 - 1000) + 1000;
    let data = {
      user: this.user? this.user: `${this.nombre}${Math.round( ext_random )}`,
      nombre: this.nombre,
      apellido: this.apellidos,
      departamento: this.dep? this.dep: '1',
      ext: this.extension? this.extension: Math.round( ext_random ),
      nivel: '2',
      password: '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225'
    }
    if (this.nombre && this.apellidos) {
      this.http.postUser(data).subscribe(() => {
        this.funcSer.showSweetSuccess('OK!','Guardado correcto', 1500);
        this.reset();
        this.opcion = 1;
      },err =>{
        if (err && err.error && err.error.message) {
          this.funcSer.showSweetError('ERROR',`${err.error.message}`,2500);
        }
        this.funcSer.logWarn('Error Nuevo Ag', err);
      })
    } else {
      this.funcSer.showSweetWarning('ERROR','Nombre y apellido es OBLIGATORIO',2000);
    }
  }

  reset(){
    this.nombre = '';
    this.apellidos = '';
    this.extension = '';
    this.user = '';
    this.dep = '';
    this.nivel = '';
  }

  delAgente(item): void {
    let myId = localStorage.getItem('id_agente');
    if (myId == '45') {
      this.funcSer.showSweetX('Eliminar? ',`Seguro eliminar a ${item.nombre} ${item.apellido}`,'Confirmar')
      .then(() => {
        let id = String(item.id)
        this.http.delUser(id).subscribe(r => {
          if (r) {
            this.AgenteSer.refresAgentes();
          }
        });
      });
    } else {
      this.funcSer.showSweetWarning('Alerta','No se permite el borrado de Agentes',2000);
    }
  }

  editarAgente(item): void {
    this.nombre = item.nombre;
    this.id = item.id;
    this.apellidos = item.apellido;
    this.extension = item.ext;
    this.dep = item.departamento;
    this.user = item.user;
    this.modal = true;
  }

  patchAgente(){
    let id = this.id
    let data: AgenteData = {
      user: this.user,
      ext: this.extension,
      departamento: this.dep,
      nombre: this.nombre,
      apellido: this.apellidos,
      nivel: this.nivel,
      password: '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225'
    }
    if (!data.user) delete data.user;
    this.http.patchUser(id, data).subscribe(r => {
      if (r) {
        this.funcSer.showSweetSuccess('Guardado','Guardado correcto',1500);
        this.AgenteSer.refresAgentes();
        this.modal = false;
        this.reset();
      }
    });
  }

  getAllCitas() {
    this.http.getCitas().subscribe(
      (res: RespCitas[]) => {
        const agentes = this.usuariosList2
        this.dataCitasTodas = [];
        for (const key in res) {
          const el = res[key];
          for (const key in agentes) {
            const elA = agentes[key];
            if (el.id_asignado == String(elA.id)) {
              el.asignado = `${elA.nombre} ${elA.apellido}`
            }
          }
          this.dataCitasTodas.push(el);
        }
      }
    );
  }

}
