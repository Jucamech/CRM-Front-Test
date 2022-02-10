import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDijoEnviabanRapidoComponent } from './speech-dijo-enviaban-rapido.component';

describe('SpeechDijoEnviabanRapidoComponent', () => {
  let component: SpeechDijoEnviabanRapidoComponent;
  let fixture: ComponentFixture<SpeechDijoEnviabanRapidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDijoEnviabanRapidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDijoEnviabanRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
