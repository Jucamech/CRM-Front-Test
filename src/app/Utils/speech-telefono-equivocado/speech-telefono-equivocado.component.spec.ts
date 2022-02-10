import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTelefonoEquivocadoComponent } from './speech-telefono-equivocado.component';

describe('SpeechTelefonoEquivocadoComponent', () => {
  let component: SpeechTelefonoEquivocadoComponent;
  let fixture: ComponentFixture<SpeechTelefonoEquivocadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTelefonoEquivocadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTelefonoEquivocadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
