import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechArronrentComponent } from './speech-arronrent.component';

describe('SpeechArronrentComponent', () => {
  let component: SpeechArronrentComponent;
  let fixture: ComponentFixture<SpeechArronrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechArronrentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechArronrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
