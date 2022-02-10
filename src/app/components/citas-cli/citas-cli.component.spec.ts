import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCliComponent } from './citas-cli.component';

describe('CitasCliComponent', () => {
  let component: CitasCliComponent;
  let fixture: ComponentFixture<CitasCliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasCliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
