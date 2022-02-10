import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorEstadoCallComponent } from './monitor-estado-call.component';

describe('MonitorEstadoCallComponent', () => {
  let component: MonitorEstadoCallComponent;
  let fixture: ComponentFixture<MonitorEstadoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorEstadoCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorEstadoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
