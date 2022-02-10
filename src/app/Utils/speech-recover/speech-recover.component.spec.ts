import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechRecoverComponent } from './speech-recover.component';

describe('SpeechRecoverComponent', () => {
  let component: SpeechRecoverComponent;
  let fixture: ComponentFixture<SpeechRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechRecoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
