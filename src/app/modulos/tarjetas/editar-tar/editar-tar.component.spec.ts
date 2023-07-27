import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTarComponent } from './editar-tar.component';

describe('EditarTarComponent', () => {
  let component: EditarTarComponent;
  let fixture: ComponentFixture<EditarTarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarTarComponent]
    });
    fixture = TestBed.createComponent(EditarTarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
