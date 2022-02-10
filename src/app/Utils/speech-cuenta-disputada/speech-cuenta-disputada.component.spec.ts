import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechCuentaDisputadaComponent } from './speech-cuenta-disputada.component';

describe('SpeechCuentaDisputadaComponent', () => {
  let component: SpeechCuentaDisputadaComponent;
  let fixture: ComponentFixture<SpeechCuentaDisputadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechCuentaDisputadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechCuentaDisputadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
