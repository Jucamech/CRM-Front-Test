import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarMonSuperComponent } from './nav-bar-mon-super.component';

describe('NavBarMonSuperComponent', () => {
  let component: NavBarMonSuperComponent;
  let fixture: ComponentFixture<NavBarMonSuperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarMonSuperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarMonSuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
