import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/shared/models/usuario.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-speech-abogado',
  templateUrl: './speech-abogado.component.html',
  styleUrls: ['./speech-abogado.component.css']
})
export class SpeechAbogadoComponent implements OnInit, OnDestroy {
  @ViewChild('content') content: ElementRef;
  susb: any;
  cliente: Partial<ClientModel>;

  //class
  intro:string='intro';
  marshall:string='none';
  scrll: number = 0;

  //toggle
  honorarios: boolean;
  siledevuelven: boolean;

  constructor(private httpSer: AuthService) {
    this.honorarios = false;
    this.siledevuelven = false;
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.susb = this.httpSer.dataClienteE$.subscribe(r => this.cliente = r);
  }
  ngOnDestroy(): void {
    this.susb.unsubscribe();
  }

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = 0;
    } catch(err) { }
  }


  verBtns(str: string) {
    switch (str) {
    case 'cobra':
        this.honorarios = !this.honorarios;
        break;

    case 'sile':
        this.siledevuelven = !this.siledevuelven;
        break;

    }
  }

  cambiarP(str: string) {
    switch (str) {
      case 'intro':
        this.intro = 'intro';
        this.scrollToBottom();
        break;

      case 'marshall':
        this.intro = 'none';
        this.marshall = 'marshall';
        this.scrollToBottom();
        break;

    }
  }

  atrasP(str: string) {
    switch (str) {
      case 'marshall':
        this.intro = 'intro';
        this.marshall = 'none';
        this.scrollToBottom();
        break;

    }
  }

}
