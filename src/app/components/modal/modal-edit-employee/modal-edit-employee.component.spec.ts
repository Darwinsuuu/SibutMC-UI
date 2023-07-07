import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEmployeeComponent } from './modal-edit-employee.component';

describe('ModalEditEmployeeComponent', () => {
  let component: ModalEditEmployeeComponent;
  let fixture: ComponentFixture<ModalEditEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditEmployeeComponent]
    });
    fixture = TestBed.createComponent(ModalEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
