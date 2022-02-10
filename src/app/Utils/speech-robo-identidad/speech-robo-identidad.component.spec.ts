import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRoboIdentidadComponent } from './speech-robo-identidad.component';

describe('SpeechRoboIdentidadComponent', () => {
  let component: SpeechRoboIdentidadComponent;
  let fixture: ComponentFixture<SpeechRoboIdentidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRoboIdentidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRoboIdentidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
