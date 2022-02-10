import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTrabajaAlguienMasComponent } from './speech-trabaja-alguien-mas.component';

describe('SpeechTrabajaAlguienMasComponent', () => {
  let component: SpeechTrabajaAlguienMasComponent;
  let fixture: ComponentFixture<SpeechTrabajaAlguienMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTrabajaAlguienMasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTrabajaAlguienMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
