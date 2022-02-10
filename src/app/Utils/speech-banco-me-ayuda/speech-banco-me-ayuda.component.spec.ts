import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechBancoMeAyudaComponent } from './speech-banco-me-ayuda.component';

describe('SpeechBancoMeAyudaComponent', () => {
  let component: SpeechBancoMeAyudaComponent;
  let fixture: ComponentFixture<SpeechBancoMeAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechBancoMeAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechBancoMeAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
