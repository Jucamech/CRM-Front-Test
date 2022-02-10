import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Speech50PuntosComponent } from './speech50-puntos.component';

describe('Speech50PuntosComponent', () => {
  let component: Speech50PuntosComponent;
  let fixture: ComponentFixture<Speech50PuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Speech50PuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Speech50PuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
