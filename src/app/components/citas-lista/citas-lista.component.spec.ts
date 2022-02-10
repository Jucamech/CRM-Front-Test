import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasListaComponent } from './citas-lista.component';

describe('CitasListaComponent', () => {
  let component: CitasListaComponent;
  let fixture: ComponentFixture<CitasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
