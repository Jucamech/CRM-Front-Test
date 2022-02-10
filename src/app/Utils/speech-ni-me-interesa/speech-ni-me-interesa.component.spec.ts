import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNiMeInteresaComponent } from './speech-ni-me-interesa.component';

describe('SpeechNiMeInteresaComponent', () => {
  let component: SpeechNiMeInteresaComponent;
  let fixture: ComponentFixture<SpeechNiMeInteresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNiMeInteresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNiMeInteresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
