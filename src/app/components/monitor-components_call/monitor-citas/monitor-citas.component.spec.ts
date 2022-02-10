import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCitasComponent } from './monitor-citas.component';

describe('MonitorCitasComponent', () => {
  let component: MonitorCitasComponent;
  let fixture: ComponentFixture<MonitorCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
