import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCitasComponent } from './calendario-citas.component';

describe('CalendarioCitasComponent', () => {
  let component: CalendarioCitasComponent;
  let fixture: ComponentFixture<CalendarioCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
