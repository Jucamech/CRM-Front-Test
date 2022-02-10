import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechsComponent } from './speechs.component';

describe('SpeechsComponent', () => {
  let component: SpeechsComponent;
  let fixture: ComponentFixture<SpeechsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
