import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechBorradoCuentasComponent } from './speech-borrado-cuentas.component';

describe('SpeechBorradoCuentasComponent', () => {
  let component: SpeechBorradoCuentasComponent;
  let fixture: ComponentFixture<SpeechBorradoCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechBorradoCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechBorradoCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
