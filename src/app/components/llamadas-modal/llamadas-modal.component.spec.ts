import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadasModalComponent } from './llamadas-modal.component';

describe('LlamadasModalComponent', () => {
  let component: LlamadasModalComponent;
  let fixture: ComponentFixture<LlamadasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LlamadasModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
