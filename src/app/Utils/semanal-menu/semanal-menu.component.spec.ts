import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanalMenuComponent } from './semanal-menu.component';

describe('SemanalMenuComponent', () => {
  let component: SemanalMenuComponent;
  let fixture: ComponentFixture<SemanalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemanalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
