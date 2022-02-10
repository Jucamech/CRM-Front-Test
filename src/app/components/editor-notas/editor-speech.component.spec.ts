import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSpeechComponent } from './editor-notas.component';

describe('EditorSpeechComponent', () => {
  let component: EditorSpeechComponent;
  let fixture: ComponentFixture<EditorSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorSpeechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
