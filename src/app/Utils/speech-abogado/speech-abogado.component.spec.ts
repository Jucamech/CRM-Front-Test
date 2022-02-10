import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAbogadoComponent } from './speech-abogado.component';

describe('SpeechAbogadoComponent', () => {
  let component: SpeechAbogadoComponent;
  let fixture: ComponentFixture<SpeechAbogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechAbogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAbogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
