import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoHanHechoNadaComponent } from './speech-no-han-hecho-nada.component';

describe('SpeechNoHanHechoNadaComponent', () => {
  let component: SpeechNoHanHechoNadaComponent;
  let fixture: ComponentFixture<SpeechNoHanHechoNadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoHanHechoNadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoHanHechoNadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
