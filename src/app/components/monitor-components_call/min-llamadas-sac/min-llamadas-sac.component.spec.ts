import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinLlamadasSacComponent } from './min-llamadas-sac.component';

describe('MinLlamadasSacComponent', () => {
  let component: MinLlamadasSacComponent;
  let fixture: ComponentFixture<MinLlamadasSacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinLlamadasSacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinLlamadasSacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
