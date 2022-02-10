import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPrePaidCcComponent } from './speech-pre-paid-cc.component';

describe('SpeechPrePaidCcComponent', () => {
  let component: SpeechPrePaidCcComponent;
  let fixture: ComponentFixture<SpeechPrePaidCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechPrePaidCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechPrePaidCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
