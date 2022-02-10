import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechMultaAtrazoComponent } from './speech-multa-atrazo.component';

describe('SpeechMultaAtrazoComponent', () => {
  let component: SpeechMultaAtrazoComponent;
  let fixture: ComponentFixture<SpeechMultaAtrazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechMultaAtrazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechMultaAtrazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
