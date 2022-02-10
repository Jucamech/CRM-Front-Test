import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechVerifiedComponent } from './speech-verified.component';

describe('SpeechVerifiedComponent', () => {
  let component: SpeechVerifiedComponent;
  let fixture: ComponentFixture<SpeechVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
