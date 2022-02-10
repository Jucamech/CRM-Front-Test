import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAdcComponent } from './speech-adc.component';

describe('SpeechAdcComponent', () => {
  let component: SpeechAdcComponent;
  let fixture: ComponentFixture<SpeechAdcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechAdcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
