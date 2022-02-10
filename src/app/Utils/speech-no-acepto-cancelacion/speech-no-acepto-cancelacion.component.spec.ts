import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoAceptoCancelacionComponent } from './speech-no-acepto-cancelacion.component';

describe('SpeechNoAceptoCancelacionComponent', () => {
  let component: SpeechNoAceptoCancelacionComponent;
  let fixture: ComponentFixture<SpeechNoAceptoCancelacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoAceptoCancelacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoAceptoCancelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
