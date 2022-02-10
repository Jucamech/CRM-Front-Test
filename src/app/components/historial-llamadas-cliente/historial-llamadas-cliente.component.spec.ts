import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialLlamadasClienteComponent } from './historial-llamadas-cliente.component';

describe('HistorialLlamadasClienteComponent', () => {
  let component: HistorialLlamadasClienteComponent;
  let fixture: ComponentFixture<HistorialLlamadasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialLlamadasClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialLlamadasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
