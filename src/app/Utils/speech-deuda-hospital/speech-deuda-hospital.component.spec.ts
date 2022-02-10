import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDeudaHospitalComponent } from './speech-deuda-hospital.component';

describe('SpeechDeudaHospitalComponent', () => {
  let component: SpeechDeudaHospitalComponent;
  let fixture: ComponentFixture<SpeechDeudaHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDeudaHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDeudaHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
