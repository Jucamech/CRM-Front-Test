import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadasSacComponent } from './llamadas-sac.component';

describe('LlamadasSacComponent', () => {
  let component: LlamadasSacComponent;
  let fixture: ComponentFixture<LlamadasSacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlamadasSacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadasSacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
