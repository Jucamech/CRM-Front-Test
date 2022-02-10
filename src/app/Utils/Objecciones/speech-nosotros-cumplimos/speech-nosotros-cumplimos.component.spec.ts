import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNosotrosCumplimosComponent } from './speech-nosotros-cumplimos.component';

describe('SpeechNosotrosCumplimosComponent', () => {
  let component: SpeechNosotrosCumplimosComponent;
  let fixture: ComponentFixture<SpeechNosotrosCumplimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNosotrosCumplimosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNosotrosCumplimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
