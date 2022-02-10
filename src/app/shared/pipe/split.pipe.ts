import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, spliter:string, p : number ): string {
    let splits: string[] = []
    if (value) {
      splits = value.split(spliter);
      return splits[p]
    } else {
      return null;
    }
  }

}
