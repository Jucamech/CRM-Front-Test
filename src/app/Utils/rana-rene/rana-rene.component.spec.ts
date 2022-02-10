import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanaReneComponent } from './rana-rene.component';

describe('RanaReneComponent', () => {
  let component: RanaReneComponent;
  let fixture: ComponentFixture<RanaReneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RanaReneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RanaReneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
