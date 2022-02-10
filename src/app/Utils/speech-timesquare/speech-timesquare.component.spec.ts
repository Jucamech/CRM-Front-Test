import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTimesquareComponent } from './speech-timesquare.component';

describe('SpeechTimesquareComponent', () => {
  let component: SpeechTimesquareComponent;
  let fixture: ComponentFixture<SpeechTimesquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTimesquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTimesquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
