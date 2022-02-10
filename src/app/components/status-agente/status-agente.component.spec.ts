import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAgenteComponent } from './status-agente.component';

describe('StatusAgenteComponent', () => {
  let component: StatusAgenteComponent;
  let fixture: ComponentFixture<StatusAgenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusAgenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
