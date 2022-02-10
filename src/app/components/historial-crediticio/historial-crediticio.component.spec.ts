import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCrediticioComponent } from './historial-crediticio.component';

describe('HistorialCrediticioComponent', () => {
  let component: HistorialCrediticioComponent;
  let fixture: ComponentFixture<HistorialCrediticioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialCrediticioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCrediticioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
