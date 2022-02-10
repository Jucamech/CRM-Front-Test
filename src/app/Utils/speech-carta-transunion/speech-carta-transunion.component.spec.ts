import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCartaTransunionComponent } from './speech-carta-transunion.component';

describe('SpeechCartaTransunionComponent', () => {
  let component: SpeechCartaTransunionComponent;
  let fixture: ComponentFixture<SpeechCartaTransunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCartaTransunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCartaTransunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
