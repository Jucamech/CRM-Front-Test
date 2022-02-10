
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SpinnerServService } from './spinner-serv.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {
  token: string;
  constructor(private httpInt: HttpClient,
    private router: Router,
    private httpServ: AuthService,
    private spinnerSer: SpinnerServService) {
    this.token = localStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let reqClone;
    let i = 0;

    let user = localStorage.getItem('nombre');

    if (user) {
      this.httpServ.userLogin = true;
      this.spinnerSer.visible();
      this.token = localStorage.getItem('token');
      reqClone = req.clone({
        setHeaders: {
          Authorization: this.token
        }
      })
      return next.handle(reqClone);
    };

    if (!this.httpServ.userLogin) {
      this.router.navigateByUrl('/login');
    }

    return next.handle(req);

  }

}
