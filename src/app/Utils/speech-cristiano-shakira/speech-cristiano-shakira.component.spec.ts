import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCristianoShakiraComponent } from './speech-cristiano-shakira.component';

describe('SpeechCristianoShakiraComponent', () => {
  let component: SpeechCristianoShakiraComponent;
  let fixture: ComponentFixture<SpeechCristianoShakiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCristianoShakiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCristianoShakiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
