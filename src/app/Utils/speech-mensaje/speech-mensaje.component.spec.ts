import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechMensajeComponent } from './speech-mensaje.component';

describe('SpeechMensajeComponent', () => {
  let component: SpeechMensajeComponent;
  let fixture: ComponentFixture<SpeechMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechMensajeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
