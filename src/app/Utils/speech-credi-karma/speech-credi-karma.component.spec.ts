import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCrediKarmaComponent } from './speech-credi-karma.component';

describe('SpeechCrediKarmaComponent', () => {
  let component: SpeechCrediKarmaComponent;
  let fixture: ComponentFixture<SpeechCrediKarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCrediKarmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCrediKarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
