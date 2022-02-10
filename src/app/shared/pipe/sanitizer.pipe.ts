import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";


@Injectable({
  providedIn: 'root'
})
@Pipe({ name: 'sanitizer' })

export class SanitizerSafe implements PipeTransform{

  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  transformScript(value) {
    return this.sanitizer.bypassSecurityTrustScript(value);
  }

}
