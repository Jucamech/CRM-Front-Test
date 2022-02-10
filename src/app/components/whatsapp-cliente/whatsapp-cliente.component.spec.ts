import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappClienteComponent } from './whatsapp-cliente.component';

describe('WhatsappClienteComponent', () => {
  let component: WhatsappClienteComponent;
  let fixture: ComponentFixture<WhatsappClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
