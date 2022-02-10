import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRecibioDepositoComponent } from './speech-recibio-deposito.component';

describe('SpeechRecibioDepositoComponent', () => {
  let component: SpeechRecibioDepositoComponent;
  let fixture: ComponentFixture<SpeechRecibioDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRecibioDepositoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRecibioDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
