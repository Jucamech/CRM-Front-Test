import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechSieteProspectosComponent } from './speech-siete-prospectos.component';

describe('SpeechSieteProspectosComponent', () => {
  let component: SpeechSieteProspectosComponent;
  let fixture: ComponentFixture<SpeechSieteProspectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechSieteProspectosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechSieteProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
