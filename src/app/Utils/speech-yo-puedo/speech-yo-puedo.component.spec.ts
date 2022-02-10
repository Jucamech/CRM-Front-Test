import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechYoPuedoComponent } from './speech-yo-puedo.component';

describe('SpeechYoPuedoComponent', () => {
  let component: SpeechYoPuedoComponent;
  let fixture: ComponentFixture<SpeechYoPuedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechYoPuedoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechYoPuedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
