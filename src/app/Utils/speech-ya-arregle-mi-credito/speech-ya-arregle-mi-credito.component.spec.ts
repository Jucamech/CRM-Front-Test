import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechYaArregleMiCreditoComponent } from './speech-ya-arregle-mi-credito.component';

describe('SpeechYaArregleMiCreditoComponent', () => {
  let component: SpeechYaArregleMiCreditoComponent;
  let fixture: ComponentFixture<SpeechYaArregleMiCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechYaArregleMiCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechYaArregleMiCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
