import { Injectable } from '@angular/core';
import { AgentesService } from 'src/app/shared/services/agentes.service';
import { CitasService } from 'src/app/shared/services/citas.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { DocumentService } from 'src/app/shared/services/document.service';
import { LlamadasPerdidasService } from 'src/app/shared/services/llamadas-perdidas.service';
import { LlamadasService } from 'src/app/shared/services/llamadas.service';

@Injectable({
  providedIn: 'root'
})
export class DestroyerService {

  constructor(private AgentSer: AgentesService,
              private ClientSer: ClientesService,
              private DocumentSer: DocumentService,
              private llamadasPerSer: LlamadasPerdidasService,
              private CitasSer: CitasService,
              private CallSer: LlamadasService) { }

  killAll(){
    this.llamadasPerSer.destructorObservers();
    this.CitasSer.destructorObserver();
    this.AgentSer.destruirObserversUsers();
    this.CallSer.destruirObserversCall();
    this.ClientSer.destruirObserversClient();
    this.DocumentSer.destruirObserversDocument();
  }

}
