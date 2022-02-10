import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLecturaReporteComponent } from './speech-lectura-reporte.component';

describe('SpeechLecturaReporteComponent', () => {
  let component: SpeechLecturaReporteComponent;
  let fixture: ComponentFixture<SpeechLecturaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechLecturaReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechLecturaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
