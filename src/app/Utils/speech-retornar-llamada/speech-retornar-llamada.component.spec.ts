import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRetornarLlamadaComponent } from './speech-retornar-llamada.component';

describe('SpeechRetornarLlamadaComponent', () => {
  let component: SpeechRetornarLlamadaComponent;
  let fixture: ComponentFixture<SpeechRetornarLlamadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRetornarLlamadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRetornarLlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
