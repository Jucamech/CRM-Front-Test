import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTengoMas45DiasComponent } from './speech-tengo-mas45-dias.component';

describe('SpeechTengoMas45DiasComponent', () => {
  let component: SpeechTengoMas45DiasComponent;
  let fixture: ComponentFixture<SpeechTengoMas45DiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechTengoMas45DiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechTengoMas45DiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
