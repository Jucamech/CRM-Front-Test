import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechBancarrotaComponent } from './speech-bancarrota.component';

describe('SpeechBancarrotaComponent', () => {
  let component: SpeechBancarrotaComponent;
  let fixture: ComponentFixture<SpeechBancarrotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechBancarrotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechBancarrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
