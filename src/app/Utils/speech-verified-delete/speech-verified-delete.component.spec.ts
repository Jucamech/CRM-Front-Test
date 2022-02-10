import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechVerifiedDeleteComponent } from './speech-verified-delete.component';

describe('SpeechVerifiedDeleteComponent', () => {
  let component: SpeechVerifiedDeleteComponent;
  let fixture: ComponentFixture<SpeechVerifiedDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechVerifiedDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechVerifiedDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
