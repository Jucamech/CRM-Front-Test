import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCitaIncumplidaPorElClienteComponent } from './speech-cita-incumplida-por-el-cliente.component';

describe('SpeechCitaIncumplidaPorElClienteComponent', () => {
  let component: SpeechCitaIncumplidaPorElClienteComponent;
  let fixture: ComponentFixture<SpeechCitaIncumplidaPorElClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCitaIncumplidaPorElClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCitaIncumplidaPorElClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
