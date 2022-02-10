import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechMecanicoComponent } from './speech-mecanico.component';

describe('SpeechMecanicoComponent', () => {
  let component: SpeechMecanicoComponent;
  let fixture: ComponentFixture<SpeechMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechMecanicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
