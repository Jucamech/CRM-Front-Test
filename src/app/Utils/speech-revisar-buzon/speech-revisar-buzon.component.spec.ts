import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRevisarBuzonComponent } from './speech-revisar-buzon.component';

describe('SpeechRevisarBuzonComponent', () => {
  let component: SpeechRevisarBuzonComponent;
  let fixture: ComponentFixture<SpeechRevisarBuzonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRevisarBuzonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRevisarBuzonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
