import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoCartasComponent } from './speech-no-cartas.component';

describe('SpeechNoCartasComponent', () => {
  let component: SpeechNoCartasComponent;
  let fixture: ComponentFixture<SpeechNoCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
