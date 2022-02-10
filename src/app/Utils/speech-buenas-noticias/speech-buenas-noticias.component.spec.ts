import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechBuenasNoticiasComponent } from './speech-buenas-noticias.component';

describe('SpeechBuenasNoticiasComponent', () => {
  let component: SpeechBuenasNoticiasComponent;
  let fixture: ComponentFixture<SpeechBuenasNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechBuenasNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechBuenasNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
