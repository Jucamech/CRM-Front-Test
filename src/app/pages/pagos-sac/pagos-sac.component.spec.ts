import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosSACComponent } from './pagos-sac.component';

describe('PagosSACComponent', () => {
  let component: PagosSACComponent;
  let fixture: ComponentFixture<PagosSACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosSACComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosSACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
