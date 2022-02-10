import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDoblePagoComponent } from './speech-doble-pago.component';

describe('SpeechDoblePagoComponent', () => {
  let component: SpeechDoblePagoComponent;
  let fixture: ComponentFixture<SpeechDoblePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDoblePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDoblePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
