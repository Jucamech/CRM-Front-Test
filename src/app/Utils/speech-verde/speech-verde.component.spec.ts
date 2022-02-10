import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechVerdeComponent } from './speech-verde.component';

describe('SpeechVerdeComponent', () => {
  let component: SpeechVerdeComponent;
  let fixture: ComponentFixture<SpeechVerdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechVerdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechVerdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
