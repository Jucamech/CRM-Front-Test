import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deducir'
})
export class DeducirPipe implements PipeTransform {
/**
   ******
   * @param value un valor de sueldo para deducir el porcentaje
   * @returns el 25% del sueldo
   */
 transform(value:number): number {
   let v: number;
  if (value) {
    v = (Number(value) * 0.25)
  }
  return v;
}
}
