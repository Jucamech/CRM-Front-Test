import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechJamasComponent } from './speech-jamas.component';

describe('SpeechJamasComponent', () => {
  let component: SpeechJamasComponent;
  let fixture: ComponentFixture<SpeechJamasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechJamasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechJamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
