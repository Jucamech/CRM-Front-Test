import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSuperComponent } from './monitor-super.component';

describe('MonitorSuperComponent', () => {
  let component: MonitorSuperComponent;
  let fixture: ComponentFixture<MonitorSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorSuperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
