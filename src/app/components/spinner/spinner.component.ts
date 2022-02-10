import { Component } from '@angular/core';
import { SpinnerServService } from 'src/app/shared/services/spinner-serv.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="overl">
    <div class="lds-dual-ring"></div>
  </div>
  `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent  {
  ver;
  isloading;
  constructor(private spinnerSer : SpinnerServService) {
    this.isloading = this.spinnerSer.loading;
  }

}
