import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestacionesComponent } from './contestaciones.component';

describe('ContestacionesComponent', () => {
  let component: ContestacionesComponent;
  let fixture: ComponentFixture<ContestacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
