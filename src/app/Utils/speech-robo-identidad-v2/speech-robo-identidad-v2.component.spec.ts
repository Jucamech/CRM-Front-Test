import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRoboIdentidadV2Component } from './speech-robo-identidad-v2.component';

describe('SpeechRoboIdentidadV2Component', () => {
  let component: SpeechRoboIdentidadV2Component;
  let fixture: ComponentFixture<SpeechRoboIdentidadV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRoboIdentidadV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRoboIdentidadV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
