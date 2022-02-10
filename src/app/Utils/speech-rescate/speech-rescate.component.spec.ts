import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRescateComponent } from './speech-rescate.component';

describe('SpeechRescateComponent', () => {
  let component: SpeechRescateComponent;
  let fixture: ComponentFixture<SpeechRescateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRescateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRescateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
