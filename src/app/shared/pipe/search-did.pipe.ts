import { Pipe, PipeTransform } from '@angular/core';
import { Did } from 'src/app/pages/llamadas-sac/llamadas-sac.component';

@Pipe({
  name: 'searchDid'
})
export class SearchDidPipe implements PipeTransform {

  transform(val: string = '', dids: Did[] ): Did[] {

    let DidF: Did[] = [];
    if (val && dids) {
      dids.forEach(el => {
        if (el.telefono.includes(val)) {
          DidF.push(el);
        }
      });
    }

    return DidF;
  }

}
