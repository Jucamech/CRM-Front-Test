import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechReferidoComponent } from './speech-referido.component';

describe('SpeechReferidoComponent', () => {
  let component: SpeechReferidoComponent;
  let fixture: ComponentFixture<SpeechReferidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechReferidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechReferidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
