import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Speech800914Component } from './speech800914.component';

describe('Speech800914Component', () => {
  let component: Speech800914Component;
  let fixture: ComponentFixture<Speech800914Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Speech800914Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Speech800914Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
