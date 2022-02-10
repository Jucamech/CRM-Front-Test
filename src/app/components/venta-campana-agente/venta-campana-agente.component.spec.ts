import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaCampanaAgenteComponent } from './venta-campana-agente.component';

describe('VentaCampanaAgenteComponent', () => {
  let component: VentaCampanaAgenteComponent;
  let fixture: ComponentFixture<VentaCampanaAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaCampanaAgenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaCampanaAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
