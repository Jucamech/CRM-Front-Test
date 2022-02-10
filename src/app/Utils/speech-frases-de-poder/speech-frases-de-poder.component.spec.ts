import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechFrasesDePoderComponent } from './speech-frases-de-poder.component';

describe('SpeechFrasesDePoderComponent', () => {
  let component: SpeechFrasesDePoderComponent;
  let fixture: ComponentFixture<SpeechFrasesDePoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechFrasesDePoderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechFrasesDePoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
