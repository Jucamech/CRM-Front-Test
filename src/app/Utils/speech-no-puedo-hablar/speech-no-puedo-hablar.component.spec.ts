import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoPuedoHablarComponent } from './speech-no-puedo-hablar.component';

describe('SpeechNoPuedoHablarComponent', () => {
  let component: SpeechNoPuedoHablarComponent;
  let fixture: ComponentFixture<SpeechNoPuedoHablarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoPuedoHablarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoPuedoHablarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
