import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCreeQuePagaAcredorOriginalComponent } from './speech-cree-que-paga-acredor-original.component';

describe('SpeechCreeQuePagaAcredorOriginalComponent', () => {
  let component: SpeechCreeQuePagaAcredorOriginalComponent;
  let fixture: ComponentFixture<SpeechCreeQuePagaAcredorOriginalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCreeQuePagaAcredorOriginalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCreeQuePagaAcredorOriginalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
