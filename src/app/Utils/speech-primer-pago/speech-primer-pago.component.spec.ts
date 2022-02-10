import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPrimerPagoComponent } from './speech-primer-pago.component';

describe('SpeechPrimerPagoComponent', () => {
  let component: SpeechPrimerPagoComponent;
  let fixture: ComponentFixture<SpeechPrimerPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechPrimerPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechPrimerPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
