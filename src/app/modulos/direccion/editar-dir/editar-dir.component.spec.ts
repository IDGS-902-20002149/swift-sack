import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDirComponent } from './editar-dir.component';

describe('EditarDirComponent', () => {
  let component: EditarDirComponent;
  let fixture: ComponentFixture<EditarDirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarDirComponent]
    });
    fixture = TestBed.createComponent(EditarDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
