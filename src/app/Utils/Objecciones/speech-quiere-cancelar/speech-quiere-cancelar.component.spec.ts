import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechQuiereCancelarComponent } from './speech-quiere-cancelar.component';

describe('SpeechQuiereCancelarComponent', () => {
  let component: SpeechQuiereCancelarComponent;
  let fixture: ComponentFixture<SpeechQuiereCancelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechQuiereCancelarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechQuiereCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
