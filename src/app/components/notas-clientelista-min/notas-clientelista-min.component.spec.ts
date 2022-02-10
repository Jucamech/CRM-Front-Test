import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotasClientelistaMinComponent } from './notas-clientelista-min.component';

describe('NotasClientelistaMinComponent', () => {
  let component: NotasClientelistaMinComponent;
  let fixture: ComponentFixture<NotasClientelistaMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotasClientelistaMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasClientelistaMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
