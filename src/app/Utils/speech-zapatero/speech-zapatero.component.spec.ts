import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechZapateroComponent } from './speech-zapatero.component';

describe('SpeechZapateroComponent', () => {
  let component: SpeechZapateroComponent;
  let fixture: ComponentFixture<SpeechZapateroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechZapateroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechZapateroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
