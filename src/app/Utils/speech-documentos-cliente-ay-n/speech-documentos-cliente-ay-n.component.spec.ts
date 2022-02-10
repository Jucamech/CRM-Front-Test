import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDocumentosClienteAyNComponent } from './speech-documentos-cliente-ay-n.component';

describe('SpeechDocumentosClienteAyNComponent', () => {
  let component: SpeechDocumentosClienteAyNComponent;
  let fixture: ComponentFixture<SpeechDocumentosClienteAyNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechDocumentosClienteAyNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDocumentosClienteAyNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
