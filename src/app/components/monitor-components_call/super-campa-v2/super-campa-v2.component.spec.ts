import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCampaV2Component } from './super-campa-v2.component';

describe('SuperCampaV2Component', () => {
  let component: SuperCampaV2Component;
  let fixture: ComponentFixture<SuperCampaV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperCampaV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperCampaV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
