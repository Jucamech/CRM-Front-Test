import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataNotas, RespNotas } from 'src/app/shared/models/otros.model';
import { RespUser } from 'src/app/shared/models/usuario.model';
import { NotasService } from 'src/app/shared/services/notas.service';
import { RESULTADO } from 'src/app/shared/constants/notas';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncionesComunesService } from 'src/app/shared/services/funciones-comunes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notas-cliente',
  templateUrl: './notas-cliente.component.html',
  styleUrls: ['./notas-cliente.component.css']
})
export class NotasClienteComponent implements OnInit, OnDestroy {
  toogle: boolean = false;
  toogleAdd: boolean = false;
  is_admin: boolean;

  notas: RespNotas[];

  idCliente: string;
  notaItem: RespNotas;
  users: RespUser[];
  result_n = RESULTADO;

  E$:any[];
  nota: RespNotas;
  modalNotaEd: boolean;
  nuevaNota: string;

  constructor(private notaSer: NotasService,
              private activateRoute: ActivatedRoute,
              private funcSer: FuncionesComunesService,
              public sanitizer: DomSanitizer,)
  {
    this.idCliente = activateRoute.snapshot.params['id'];
    this.is_admin = funcSer.generarPermisosAdmin();
  }

  ngOnDestroy(): void {
    this.notaSer.clearEmit();
    try {
      this.E$.forEach(e => e.unsubscribe() );
    } catch (error) {

    }
  }

  ngOnInit(): void {
    const E$1 = this.notaSer.getNotasC(this.idCliente);
    const E$2 = this.notaSer.dataNotasE$.subscribe(r => {
      this.notas = r;
    });
    this.E$ = [E$1, E$2];
  }

  verInfo(item: RespNotas){

    this.notaItem = item;
    this.toogle = true;
  }

  delNota(item: RespNotas){
    let id = item.id;
    let id_cliente = item.id_cliente;
    Swal.fire({
      title: 'Confirmar',
      text: 'Desea eliminar esta Nota?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK!',
      cancelButtonText: 'Cancelar',
    }).then((r) => {
      if (r.value) {
        this.notaSer.delNota(id, id_cliente);
      }
    });
  }

  editarnota(item: RespNotas){
    this.nota = item;
    this.modalNotaEd = true;
  }

  enviarNotaEdit(){
    let id = this.nota.id;
    let id_cliente = this.nota.id_cliente;
    let newData: DataNotas = {
      resultado: this.nota.resultado,
      did: this.nota.did,
      llamada: this.nota.llamada,
      nota: this.nuevaNota,
      speech: '0',
      reacciones: this.nota.reacciones
    }
    if (this.nuevaNota && this.nuevaNota.length < 2000 ) {
      this.notaSer.editNota(id, id_cliente, newData).then(r => {
        this.nota = null;
        this.modalNotaEd = false;
      })
    } else if (this.nuevaNota.length >= 2000 ) {
      this.funcSer.showSweetWarning('Error', 'Nota muy grande', 2000);
    }
  }

}
