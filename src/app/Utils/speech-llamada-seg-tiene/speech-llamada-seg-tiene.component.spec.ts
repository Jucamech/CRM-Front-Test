import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLlamadaSegTieneComponent } from './speech-llamada-seg-tiene.component';

describe('SpeechLlamadaSegTieneComponent', () => {
  let component: SpeechLlamadaSegTieneComponent;
  let fixture: ComponentFixture<SpeechLlamadaSegTieneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechLlamadaSegTieneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechLlamadaSegTieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
