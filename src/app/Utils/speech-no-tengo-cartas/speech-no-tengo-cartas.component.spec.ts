import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechNoTengoCartasComponent } from './speech-no-tengo-cartas.component';

describe('SpeechNoTengoCartasComponent', () => {
  let component: SpeechNoTengoCartasComponent;
  let fixture: ComponentFixture<SpeechNoTengoCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechNoTengoCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechNoTengoCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
