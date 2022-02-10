import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListaAgentesComponent } from './modal-lista-agentes.component';

describe('ModalListaAgentesComponent', () => {
  let component: ModalListaAgentesComponent;
  let fixture: ComponentFixture<ModalListaAgentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListaAgentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListaAgentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
