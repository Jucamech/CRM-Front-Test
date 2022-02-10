import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDevuelvoLaLlamadaComponent } from './speech-devuelvo-la-llamada.component';

describe('SpeechDevuelvoLaLlamadaComponent', () => {
  let component: SpeechDevuelvoLaLlamadaComponent;
  let fixture: ComponentFixture<SpeechDevuelvoLaLlamadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDevuelvoLaLlamadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDevuelvoLaLlamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
