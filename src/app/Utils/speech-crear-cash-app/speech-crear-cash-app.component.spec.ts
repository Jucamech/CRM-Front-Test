import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCrearCashAppComponent } from './speech-crear-cash-app.component';

describe('SpeechCrearCashAppComponent', () => {
  let component: SpeechCrearCashAppComponent;
  let fixture: ComponentFixture<SpeechCrearCashAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCrearCashAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCrearCashAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
