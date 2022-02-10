import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataNotas, RespNotas } from 'src/app/shared/models/otros.model';
import { NotasService } from 'src/app/shared/services/notas.service';
import { RESULTADO } from 'src/app/shared/constants/notas';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-notas-clientelista-min',
  templateUrl: './notas-clientelista-min.component.html',
  styleUrls: ['./notas-clientelista-min.component.css']
})
export class NotasClientelistaMinComponent implements OnInit, OnDestroy {
  idCliente: string;
  notas: RespNotas[];
  result_n = RESULTADO;


  E$:any[];
  nota: RespNotas;
  modalNotaEd: boolean;
  nuevaNota: string;

  constructor(private notaSer: NotasService,
              private activateRoute: ActivatedRoute,
              public sanitizer: DomSanitizer,)
  {
    this.idCliente = this.activateRoute.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.notaSer.clearEmit();
    try {
      this.E$.forEach( e => e.unsubscribe() );
    } catch (error) {}
  }

  ngOnInit(): void {
    const E$1 = this.notaSer.getNotasC(this.idCliente);
    const E$2 = this.notaSer.dataNotasE$.subscribe(r => {
      this.notas = r;
    });
    this.E$ = [E$1, E$2];
  }

}
