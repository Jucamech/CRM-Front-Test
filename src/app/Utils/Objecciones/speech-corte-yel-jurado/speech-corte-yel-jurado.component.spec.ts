import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCorteYelJuradoComponent } from './speech-corte-yel-jurado.component';

describe('SpeechCorteYelJuradoComponent', () => {
  let component: SpeechCorteYelJuradoComponent;
  let fixture: ComponentFixture<SpeechCorteYelJuradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCorteYelJuradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCorteYelJuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
