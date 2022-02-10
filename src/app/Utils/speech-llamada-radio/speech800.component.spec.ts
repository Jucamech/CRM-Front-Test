import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Speech800Component } from './speech800.component';

describe('Speech800Component', () => {
  let component: Speech800Component;
  let fixture: ComponentFixture<Speech800Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Speech800Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Speech800Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
