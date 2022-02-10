import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMonitorAgentesComponent } from './super-monitor-agentes.component';

describe('SuperMonitorAgentesComponent', () => {
  let component: SuperMonitorAgentesComponent;
  let fixture: ComponentFixture<SuperMonitorAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperMonitorAgentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMonitorAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
