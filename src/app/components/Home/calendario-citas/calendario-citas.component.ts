import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CitaCampAd, RespCitas, RespUser } from 'src/app/shared/models/usuario.model';
import { RESULTADO } from 'src/app/shared/constants/notas';



@Component({
  selector: 'app-calendario-citas',
  templateUrl: './calendario-citas.component.html',
  styleUrls: ['./calendario-citas.component.css']
})
export class CalendarioCitasComponent implements OnInit {
  @Output() cerrarM = new EventEmitter<boolean>();
  @Input() modal: boolean = false;
  @Input() agentes: RespUser[];
  @Input() set CitaImport( val: RespCitas ){
    this._CitaImport = val;
    this.encasillarCamposAD(val);
  }
  minmodal: boolean = false;
  nota_ok = 'Cita Concluida Satisfactoriamente!';

  cuadros:any[] = [];
  _CitaImport: RespCitas;
  detallesCita: CitaCampAd;

  result_n = RESULTADO

  constructor(){}

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modal = false;
    localStorage.removeItem('2104a1bd');
    this.cerrarM.emit(false);
  }

  encasillarCamposAD(cita: RespCitas){
    this.cuadros = [];
    if (cita && cita.campos_adicionales.length > 0 ) {
      cita.campos_adicionales.forEach((C_Ad, i) => {
        this.cuadros[i] = C_Ad;
      });
    } else {
      this.cuadros = [];
    }
  }

  verDetalles(item: CitaCampAd){
    this.detallesCita = item;
    this.minmodal = true;
  }

}

/*
  get CitaImport(): RespCitas{
    return this._CitaImport;
  }
*/
