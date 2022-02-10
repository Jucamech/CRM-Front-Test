import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeTest'
})
export class SafeTestPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
    case 'htmlMod': return this.editarHtml(value)
    case 'htmlEdi': return this.editHtml(value)
    case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
    case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
    case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
    case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
    case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
  private editarHtml(val: any){
    let edi = String(val);
    edi = edi.replace('SafeValue must use [property]=binding:', '');
    edi = edi.replace('(see https://g.co/ng/security#xss)', '');
    edi = edi.replace('http://', '');
    edi = edi.replace(/<style([\s\S]*?)<\/style>/gi, ' ')
    .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
    .replace(/(<(?:.|\n)*?>)/gm, ' ')
    .replace(/\s+/gm, ' ');
    return edi
  }

  private editHtml(val: any){
    let edi = String(val);
    edi = edi.replace('SafeValue must use [property]=binding:', '');
    edi = edi.replace('(see https://g.co/ng/security#xss)', '');
    return edi
  }

}
