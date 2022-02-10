import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioClienteComponent } from './calendario-cliente.component';

describe('CalendarioClienteComponent', () => {
  let component: CalendarioClienteComponent;
  let fixture: ComponentFixture<CalendarioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
