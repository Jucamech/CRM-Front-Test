import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoPagoAbogadoComponent } from './speech-no-pago-abogado.component';

describe('SpeechNoPagoAbogadoComponent', () => {
  let component: SpeechNoPagoAbogadoComponent;
  let fixture: ComponentFixture<SpeechNoPagoAbogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoPagoAbogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoPagoAbogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
