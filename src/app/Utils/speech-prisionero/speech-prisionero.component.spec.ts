import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechPrisioneroComponent } from './speech-prisionero.component';

describe('SpeechPrisioneroComponent', () => {
  let component: SpeechPrisioneroComponent;
  let fixture: ComponentFixture<SpeechPrisioneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechPrisioneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechPrisioneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
