import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAccionesComponent } from './speech-acciones.component';

describe('SpeechAccionesComponent', () => {
  let component: SpeechAccionesComponent;
  let fixture: ComponentFixture<SpeechAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechAccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
