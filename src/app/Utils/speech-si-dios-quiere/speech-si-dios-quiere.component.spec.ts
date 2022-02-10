import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechSiDiosQuiereComponent } from './speech-si-dios-quiere.component';

describe('SpeechSiDiosQuiereComponent', () => {
  let component: SpeechSiDiosQuiereComponent;
  let fixture: ComponentFixture<SpeechSiDiosQuiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechSiDiosQuiereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechSiDiosQuiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
