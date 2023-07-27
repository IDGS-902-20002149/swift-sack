import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDirComponent } from './agregar-dir.component';

describe('AgregarDirComponent', () => {
  let component: AgregarDirComponent;
  let fixture: ComponentFixture<AgregarDirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDirComponent]
    });
    fixture = TestBed.createComponent(AgregarDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
