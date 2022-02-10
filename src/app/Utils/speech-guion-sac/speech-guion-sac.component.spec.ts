import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechGuionSACComponent } from './speech-guion-sac.component';

describe('SpeechGuionSACComponent', () => {
  let component: SpeechGuionSACComponent;
  let fixture: ComponentFixture<SpeechGuionSACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechGuionSACComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechGuionSACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
