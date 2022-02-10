import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioServicioComponent } from './inicio-servicio.component';

describe('InicioServicioComponent', () => {
  let component: InicioServicioComponent;
  let fixture: ComponentFixture<InicioServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
