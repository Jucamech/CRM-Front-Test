import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoPagoComponent } from './speech-no-pago.component';

describe('SpeechNoPagoComponent', () => {
  let component: SpeechNoPagoComponent;
  let fixture: ComponentFixture<SpeechNoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
