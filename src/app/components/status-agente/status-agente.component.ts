import { Component, OnInit } from '@angular/core';
import { RastreadorAgentesService } from 'src/app/shared/others/hook/rastreador-agentes.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-status-agente',
  templateUrl: './status-agente.component.html',
  styleUrls: ['./status-agente.component.css']
})
export class StatusAgenteComponent implements OnInit {
  fireDocs: any[];

  constructor(private Fire: FirebaseService,
              private Stalker: RastreadorAgentesService) { }

  ngOnInit(): void {

  }
/*   getAStatus(){
    let coll = this.Stalker.generarCollUser('45')
    this.Fire.getStatus(coll).subscribe((snap) => {
      this.fireDocs = [];
      snap.forEach((arti:any) => {
        this.fireDocs.push({
          index: arti.payload.doc.data().indice ,
          id : arti.payload.doc.id,
          data : arti.payload.doc.data()
        });
      })
    });
  } */

  getAllStatus(){}

}
