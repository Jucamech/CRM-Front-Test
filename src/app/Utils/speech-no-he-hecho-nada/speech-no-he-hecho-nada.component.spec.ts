import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoHeHechoNadaComponent } from './speech-no-he-hecho-nada.component';

describe('SpeechNoHeHechoNadaComponent', () => {
  let component: SpeechNoHeHechoNadaComponent;
  let fixture: ComponentFixture<SpeechNoHeHechoNadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoHeHechoNadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoHeHechoNadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
