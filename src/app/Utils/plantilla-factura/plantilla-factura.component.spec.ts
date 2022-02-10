import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFacturaComponent } from './plantilla-factura.component';

describe('PlantillaFacturaComponent', () => {
  let component: PlantillaFacturaComponent;
  let fixture: ComponentFixture<PlantillaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
