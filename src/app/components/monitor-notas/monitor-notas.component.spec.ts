import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorNotasComponent } from './monitor-notas.component';

describe('MonitorNotasComponent', () => {
  let component: MonitorNotasComponent;
  let fixture: ComponentFixture<MonitorNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorNotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
