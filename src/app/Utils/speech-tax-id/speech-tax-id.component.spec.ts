import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTaxIdComponent } from './speech-tax-id.component';

describe('SpeechTaxIdComponent', () => {
  let component: SpeechTaxIdComponent;
  let fixture: ComponentFixture<SpeechTaxIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTaxIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTaxIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
