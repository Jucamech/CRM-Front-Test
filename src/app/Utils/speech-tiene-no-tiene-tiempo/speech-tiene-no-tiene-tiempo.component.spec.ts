import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTieneNoTieneTiempoComponent } from './speech-tiene-no-tiene-tiempo.component';

describe('SpeechTieneNoTieneTiempoComponent', () => {
  let component: SpeechTieneNoTieneTiempoComponent;
  let fixture: ComponentFixture<SpeechTieneNoTieneTiempoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTieneNoTieneTiempoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTieneNoTieneTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
