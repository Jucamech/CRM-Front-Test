import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechComprasComponent } from './speech-compras.component';

describe('SpeechComprasComponent', () => {
  let component: SpeechComprasComponent;
  let fixture: ComponentFixture<SpeechComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
