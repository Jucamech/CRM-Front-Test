import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCobroComponent } from './speech-cobro.component';

describe('SpeechCobroComponent', () => {
  let component: SpeechCobroComponent;
  let fixture: ComponentFixture<SpeechCobroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCobroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
