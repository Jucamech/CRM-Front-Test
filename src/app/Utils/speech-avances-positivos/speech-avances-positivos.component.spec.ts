import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechAvancesPositivosComponent } from './speech-avances-positivos.component';

describe('SpeechAvancesPositivosComponent', () => {
  let component: SpeechAvancesPositivosComponent;
  let fixture: ComponentFixture<SpeechAvancesPositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechAvancesPositivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechAvancesPositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
