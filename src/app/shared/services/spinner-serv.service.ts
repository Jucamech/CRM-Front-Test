import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServService {

  // NO LO ESTOY USANDO

  loading = new Subject<boolean>();

  visible():void {
    this.loading.next(true);
  }
  novisible():void {
    this.loading.next(false);
  }

}
