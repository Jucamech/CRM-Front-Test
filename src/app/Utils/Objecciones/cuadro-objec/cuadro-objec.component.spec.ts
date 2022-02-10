import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroObjecComponent } from './cuadro-objec.component';

describe('CuadroObjecComponent', () => {
  let component: CuadroObjecComponent;
  let fixture: ComponentFixture<CuadroObjecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadroObjecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroObjecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
