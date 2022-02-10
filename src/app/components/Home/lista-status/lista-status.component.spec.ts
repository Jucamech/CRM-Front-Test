import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaStatusComponent } from './lista-status.component';

describe('ListaStatusComponent', () => {
  let component: ListaStatusComponent;
  let fixture: ComponentFixture<ListaStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
