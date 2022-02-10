import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoSpeechIninicioComponent } from './credito-speech-ininicio.component';

describe('CreditoSpeechIninicioComponent', () => {
  let component: CreditoSpeechIninicioComponent;
  let fixture: ComponentFixture<CreditoSpeechIninicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditoSpeechIninicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoSpeechIninicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
