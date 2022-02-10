import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
/* import { Observable } from 'rxjs'; */

@Injectable({
  providedIn: 'root'
})
export class SpeechGuard implements CanActivate {

  constructor( private router: Router ) {}

  canActivate():boolean{
    const x = localStorage.getItem('call')
    if (!x) {
      this.router.navigate(['login']);
      return false
    }
    return true
  }

}
