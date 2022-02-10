import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCierreVentaComponent } from './speech-cierre-venta.component';

describe('SpeechCierreVentaComponent', () => {
  let component: SpeechCierreVentaComponent;
  let fixture: ComponentFixture<SpeechCierreVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCierreVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCierreVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
