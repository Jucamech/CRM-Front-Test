import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCashappComponent } from './speech-cashapp.component';

describe('SpeechCashappComponent', () => {
  let component: SpeechCashappComponent;
  let fixture: ComponentFixture<SpeechCashappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCashappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCashappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
