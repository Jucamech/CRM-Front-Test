import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLecturaCreditoComponent } from './speech-lectura-credito.component';

describe('SpeechLecturaCreditoComponent', () => {
  let component: SpeechLecturaCreditoComponent;
  let fixture: ComponentFixture<SpeechLecturaCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechLecturaCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechLecturaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
