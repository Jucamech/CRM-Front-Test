import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerAlCliNewPageComponent } from './ser-al-cli-new-page.component';

describe('SerAlCliNewPageComponent', () => {
  let component: SerAlCliNewPageComponent;
  let fixture: ComponentFixture<SerAlCliNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerAlCliNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerAlCliNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
