import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rana-rene',
  templateUrl: './rana-rene.component.html',
  styleUrls: ['./rana-rene.component.css']
})
export class RanaReneComponent implements OnInit {

  tel: string;

  constructor(private title: Title) {
    title.setTitle('RANA RENE')
    this.tel = '1234567890'

  }

  ngOnInit(): void {
  }

}
