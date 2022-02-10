import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpConfirmacionComponent } from './pop-up-confirmacion.component';

describe('PopUpConfirmacionComponent', () => {
  let component: PopUpConfirmacionComponent;
  let fixture: ComponentFixture<PopUpConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
