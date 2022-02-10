import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorAgentesComponent } from './monitor-agentes.component';

describe('MonitorAgentesComponent', () => {
  let component: MonitorAgentesComponent;
  let fixture: ComponentFixture<MonitorAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorAgentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
