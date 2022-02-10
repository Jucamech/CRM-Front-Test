import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCampanaComponent } from './super-campana.component';

describe('SuperCampanaComponent', () => {
  let component: SuperCampanaComponent;
  let fixture: ComponentFixture<SuperCampanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperCampanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCampanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
