import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCalificoTarjetasComponent } from './speech-califico-tarjetas.component';

describe('SpeechCalificoTarjetasComponent', () => {
  let component: SpeechCalificoTarjetasComponent;
  let fixture: ComponentFixture<SpeechCalificoTarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCalificoTarjetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCalificoTarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
