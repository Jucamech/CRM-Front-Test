import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCampanaComponent } from './speech-campana.component';

describe('SpeechCampanaComponent', () => {
  let component: SpeechCampanaComponent;
  let fixture: ComponentFixture<SpeechCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCampanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
