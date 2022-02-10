import { Pipe, PipeTransform } from '@angular/core';
import { AllChatsWht } from '../models/whatsapp.model';

@Pipe({
  name: 'listChatsWht'
})
export class ListChatsWhtPipe implements PipeTransform {

  transform(value: AllChatsWht[], pag = 0, search: string = '' ): AllChatsWht[] {
    // let val:AllChatsWht []= [];
    value = value.slice()

    const val = search? value.filter(chat => chat.name.toLowerCase().includes( search.toLowerCase() ) ): value;

    return val ? val.slice( 0, pag + 15 ): value;
  }

}
