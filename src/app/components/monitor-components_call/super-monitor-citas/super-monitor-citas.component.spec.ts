import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMonitorCitasComponent } from './super-monitor-citas.component';

describe('SuperMonitorCitasComponent', () => {
  let component: SuperMonitorCitasComponent;
  let fixture: ComponentFixture<SuperMonitorCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperMonitorCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMonitorCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
