import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listaStatus2'
})
export class ListaStatus2Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
