import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRapidosComponent } from './speech-rapidos.component';

describe('SpeechRapidosComponent', () => {
  let component: SpeechRapidosComponent;
  let fixture: ComponentFixture<SpeechRapidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRapidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRapidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
