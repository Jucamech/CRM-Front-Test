import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDepositoComponent } from './speech-deposito.component';

describe('SpeechDepositoComponent', () => {
  let component: SpeechDepositoComponent;
  let fixture: ComponentFixture<SpeechDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
