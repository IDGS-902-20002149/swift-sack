import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTarComponent } from './agregar-tar.component';

describe('AgregarTarComponent', () => {
  let component: AgregarTarComponent;
  let fixture: ComponentFixture<AgregarTarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarTarComponent]
    });
    fixture = TestBed.createComponent(AgregarTarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
