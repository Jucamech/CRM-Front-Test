import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdicionalComponent } from './info-adicional.component';

describe('InfoAdicionalComponent', () => {
  let component: InfoAdicionalComponent;
  let fixture: ComponentFixture<InfoAdicionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAdicionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
