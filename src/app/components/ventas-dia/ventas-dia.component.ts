import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas-dia',
  templateUrl: './ventas-dia.component.html',
  styleUrls: ['./ventas-dia.component.css']
})
export class VentasDiaComponent implements OnInit {

  dataVentas:Array<any>;

  ventasDia = {
    cliente: '',
    valor_inicial: '',
    valor_mensual: '',
    plan_pago: '',
    origen_prospecto: '',
    radio:'',
    dia_radio: '',
    hora_radio: '',
    radio_dial: ''
  }

  dialesAley = {
    n1: '1590',
    n2: '980'
  }
  dialMegaMa = {
    n1: '94.9',
    n2: '95.1',
    n3: '106.1'
  }


  constructor() { }

  ngOnInit(): void {
  }

  agregarVenta(){}
}
