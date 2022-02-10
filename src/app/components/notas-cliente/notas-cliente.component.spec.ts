import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasClienteComponent } from './notas-cliente.component';

describe('NotasClienteComponent', () => {
  let component: NotasClienteComponent;
  let fixture: ComponentFixture<NotasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
