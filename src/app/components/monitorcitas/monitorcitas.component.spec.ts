import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorcitasComponent } from './monitorcitas.component';

describe('MonitorcitasComponent', () => {
  let component: MonitorcitasComponent;
  let fixture: ComponentFixture<MonitorcitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorcitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorcitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
