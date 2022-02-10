import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTercerServicioAlClienteComponent } from './speech-tercer-servicio-al-cliente.component';

describe('SpeechTercerServicioAlClienteComponent', () => {
  let component: SpeechTercerServicioAlClienteComponent;
  let fixture: ComponentFixture<SpeechTercerServicioAlClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTercerServicioAlClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTercerServicioAlClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
