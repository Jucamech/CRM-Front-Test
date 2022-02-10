import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechEvidenciaTrackingsComponent } from './speech-evidencia-trackings.component';

describe('SpeechEvidenciaTrackingsComponent', () => {
  let component: SpeechEvidenciaTrackingsComponent;
  let fixture: ComponentFixture<SpeechEvidenciaTrackingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechEvidenciaTrackingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechEvidenciaTrackingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
