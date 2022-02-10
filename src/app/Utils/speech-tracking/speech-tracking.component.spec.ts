import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTrackingComponent } from './speech-tracking.component';

describe('SpeechTrackingComponent', () => {
  let component: SpeechTrackingComponent;
  let fixture: ComponentFixture<SpeechTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
