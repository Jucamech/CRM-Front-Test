import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLlamadaVentaComponent } from './speech-llamada-venta.component';

describe('SpeechLlamadaVentaComponent', () => {
  let component: SpeechLlamadaVentaComponent;
  let fixture: ComponentFixture<SpeechLlamadaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechLlamadaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechLlamadaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
