import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {

  regex = /^(\d{4})-(\d{4})-(\d{4})-(\d{4})/;
  regex2 = /^(\d{4}) (\d{4}) (\d{4}) (\d{4})/;
  regex3 = /^(\d{16})/;

  constructor() { }

  editarTarjeta(tarj: string): string{
    let newT:string;
    if (tarj.match(this.regex)) {
      newT = tarj;
    } else if (tarj.match(this.regex2)) {
      let T = tarj.split(' ');
      newT = `${T[0]}-${T[1]}-${T[2]}-${T[3]}`;
    } else if (tarj.match(this.regex3)) {
      let a: string,b: string,c: string,d: string;
      a = tarj.slice(0,4);
      b = tarj.slice(4,8);
      c = tarj.slice(8,12);
      d = tarj.slice(12,16);
      newT = `${a}-${b}-${c}-${d}`;
    }
    return newT;
  }

}
