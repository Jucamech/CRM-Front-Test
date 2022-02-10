import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanaLlamarComponent } from './campana-llamar.component';

describe('CampanaLlamarComponent', () => {
  let component: CampanaLlamarComponent;
  let fixture: ComponentFixture<CampanaLlamarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanaLlamarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanaLlamarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
