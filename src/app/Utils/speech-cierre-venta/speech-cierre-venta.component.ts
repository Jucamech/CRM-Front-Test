import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-cierre-venta',
  templateUrl: './speech-cierre-venta.component.html',
  styleUrls: ['./speech-cierre-venta.component.css']
})
export class SpeechCierreVentaComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  cliente: Partial<ClientModel>;
  susb: Subscription;

  // toggle
  intro: string = 'intro';
  muy_bn: string = 'none';
  cierre: string = 'none';
  gana4mil: boolean = false;


  hoy = new Date()
  pro: number;

  constructor(private httpSer: AuthService,
              private title: Title) {
    this.pro = (this.hoy.getFullYear() + 7);
    title.setTitle('CIERRE VENTA');
  }

  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  ngOnInit(): void {
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }

  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        this.scrollToBottom();
        break;

      case 'bien':
        this.intro = 'none';
        this.muy_bn = 'muy_bn';
        this.scrollToBottom();
        break;

      case 'cierre':
        this.muy_bn = 'none';
        this.cierre = 'cierre';
        this.scrollToBottom();
        break;

    }
  }

  regresarP(str: string) {
    switch (str) {
      case 'bien':
        this.muy_bn = 'none';
        this.intro = 'intro';
        this.scrollToBottom();
        break;

      case 'cierre':
        this.muy_bn = 'muy_bn';
        this.cierre = 'none';
        this.scrollToBottom();
        break;

    }
  }

}
