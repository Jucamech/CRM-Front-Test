import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechFirmarcontratoComponent } from './speech-firmarcontrato.component';

describe('SpeechFirmarcontratoComponent', () => {
  let component: SpeechFirmarcontratoComponent;
  let fixture: ComponentFixture<SpeechFirmarcontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechFirmarcontratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechFirmarcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
