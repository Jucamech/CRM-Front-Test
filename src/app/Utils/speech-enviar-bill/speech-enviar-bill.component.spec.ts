import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechEnviarBillComponent } from './speech-enviar-bill.component';

describe('SpeechEnviarBillComponent', () => {
  let component: SpeechEnviarBillComponent;
  let fixture: ComponentFixture<SpeechEnviarBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechEnviarBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechEnviarBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
