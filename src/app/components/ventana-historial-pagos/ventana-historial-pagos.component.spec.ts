import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaHistorialPagosComponent } from './ventana-historial-pagos.component';

describe('VentanaHistorialPagosComponent', () => {
  let component: VentanaHistorialPagosComponent;
  let fixture: ComponentFixture<VentanaHistorialPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaHistorialPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaHistorialPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
