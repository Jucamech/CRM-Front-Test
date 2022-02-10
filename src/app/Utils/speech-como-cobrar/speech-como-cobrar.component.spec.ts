import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechComoCobrarComponent } from './speech-como-cobrar.component';

describe('SpeechComoCobrarComponent', () => {
  let component: SpeechComoCobrarComponent;
  let fixture: ComponentFixture<SpeechComoCobrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechComoCobrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechComoCobrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
