import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPuedeSerReferidoComponent } from './speech-puede-ser-referido.component';

describe('SpeechPuedeSerReferidoComponent', () => {
  let component: SpeechPuedeSerReferidoComponent;
  let fixture: ComponentFixture<SpeechPuedeSerReferidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechPuedeSerReferidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechPuedeSerReferidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
