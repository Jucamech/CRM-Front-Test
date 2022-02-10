import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTengoReporteDeCreditoComponent } from './speech-tengo-reporte-de-credito.component';

describe('SpeechTengoReporteDeCreditoComponent', () => {
  let component: SpeechTengoReporteDeCreditoComponent;
  let fixture: ComponentFixture<SpeechTengoReporteDeCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTengoReporteDeCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTengoReporteDeCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
