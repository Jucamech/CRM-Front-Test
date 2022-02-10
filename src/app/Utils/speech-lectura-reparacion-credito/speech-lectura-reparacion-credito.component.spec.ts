import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLecturaReparacionCreditoComponent } from './speech-lectura-reparacion-credito.component';

describe('SpeechLecturaReparacionCreditoComponent', () => {
  let component: SpeechLecturaReparacionCreditoComponent;
  let fixture: ComponentFixture<SpeechLecturaReparacionCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechLecturaReparacionCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechLecturaReparacionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
