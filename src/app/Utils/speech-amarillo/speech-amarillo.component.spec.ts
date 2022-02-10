import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAmarilloComponent } from './speech-amarillo.component';

describe('SpeechAmarilloComponent', () => {
  let component: SpeechAmarilloComponent;
  let fixture: ComponentFixture<SpeechAmarilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechAmarilloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAmarilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
