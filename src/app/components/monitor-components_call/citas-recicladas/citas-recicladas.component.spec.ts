import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasRecicladasComponent } from './citas-recicladas.component';

describe('CitasRecicladasComponent', () => {
  let component: CitasRecicladasComponent;
  let fixture: ComponentFixture<CitasRecicladasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasRecicladasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasRecicladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
