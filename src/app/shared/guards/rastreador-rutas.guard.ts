import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { FuncionesComunesService } from '../services/funciones-comunes.service';

export interface Stalker {
  refresh: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RastreadorRutasGuard implements CanDeactivate<Stalker>, CanActivate {

  constructor(private funcSer: FuncionesComunesService) { }

  canDeactivate( component: Stalker ): boolean  {
    return component.refresh() ;
  }

  canActivate(){
   // this.funcSer.log('Gauards entrando', true );
    return true;
  }

}
