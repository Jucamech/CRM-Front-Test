import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDivisionCreditoComponent } from './speech-division-credito.component';

describe('SpeechDivisionCreditoComponent', () => {
  let component: SpeechDivisionCreditoComponent;
  let fixture: ComponentFixture<SpeechDivisionCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDivisionCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDivisionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
