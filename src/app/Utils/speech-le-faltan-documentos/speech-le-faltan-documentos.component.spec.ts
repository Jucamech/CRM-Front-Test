import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechLeFaltanDocumentosComponent } from './speech-le-faltan-documentos.component';

describe('SpeechLeFaltanDocumentosComponent', () => {
  let component: SpeechLeFaltanDocumentosComponent;
  let fixture: ComponentFixture<SpeechLeFaltanDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechLeFaltanDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechLeFaltanDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
